import { NextFunction, Request, Response } from "express";
import httpResponse from "../util/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../util/httpError";
import config from "../config/config";
import axios from "axios";
import {
  userFullProfile,
  userBadges,
  userSubmissionStats,
  userCalendar,
  tabLeet,
} from "../query/userDetails";
import motivationalQuotes from "../constant/quotes";

const LEETCODE_API_URL = config.LEETCODE_API || "https://leetcode.com/graphql";
const levels = [
  "bg-gray-200", // count = 0
  "bg-green-200", // count < 3
  "bg-green-400", // count < 6
  "bg-green-600", // count < 9
  "bg-green-800", // count >= 9
];

export default {
  userDetails: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
      const response = await axios.post(
        LEETCODE_API_URL,
        {
          query: userFullProfile,
          variables: {
            username: username,
            limit: "",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
          },
        }
      );

      const rawData = response.data;
      if (rawData.errors && rawData.errors.length > 0) {
        return httpResponse(req, res, 400, rawData.errors[0].message);
      }
      return httpResponse(req, res, 200, responseMessage.SUCCESS, rawData.data);
    } catch (err) {
      console.log(err);
      httpError(next, err, req, 500);
    }
  },

  userBadges: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
      const response = await axios.post(
        LEETCODE_API_URL,
        {
          query: userBadges,
          variables: {
            username: username,
            limit: "",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
          },
        }
      );

      const rawData = response.data;
      if (rawData.errors && rawData.errors.length > 0) {
        return httpResponse(req, res, 400, rawData.errors[0].message);
      }
      console.log(rawData);
      return httpResponse(req, res, 200, responseMessage.SUCCESS, rawData.data);
    } catch (err) {
      console.log(err);
      httpError(next, err, req, 500);
    }
  },

  userSubmissionStats: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.params;
    try {
      const response = await axios.post(
        LEETCODE_API_URL,
        {
          query: userSubmissionStats,
          variables: {
            username: username,
            limit: "",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
          },
        }
      );

      const rawData = response.data;
      if (rawData.errors && rawData.errors.length > 0) {
        return httpResponse(req, res, 400, rawData.errors[0].message);
      }
      console.log(rawData);
      return httpResponse(req, res, 200, responseMessage.SUCCESS, rawData.data);
    } catch (err) {
      console.log(err);
      httpError(next, err, req, 500);
    }
  },

  userCalendar: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
      const response = await axios.post(
        LEETCODE_API_URL,
        {
          query: userCalendar,
          variables: {
            username: username,
            limit: "",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
          },
        }
      );

      const rawData = response.data;
      if (rawData.errors && rawData.errors.length > 0) {
        return httpResponse(req, res, 400, rawData.errors[0].message);
      }

      const parsed = JSON.parse(rawData.data.matchedUser.submissionCalendar);

      const today = new Date();
      const startDate = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 2, 1)
      );

      // Normalize helper (force UTC midnight)
      const normalizeUTC = (d: Date) =>
        new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

      const raw = Object.entries(parsed).map(([ts, count]) => {
        const d = new Date(Number(ts) * 1000);
        return { date: normalizeUTC(d), count };
      });

      // ✅ Filter only last 3 months
      const filteredRaw = raw.filter(
        (d) => d.date >= startDate && d.date <= today
      );

      // Build full range (day by day, UTC-safe)
      const days: Date[] = [];
      for (
        let d = new Date(startDate);
        d <= today;
        d.setUTCDate(d.getUTCDate() + 1)
      ) {
        days.push(new Date(d));
      }

      const map = new Map(
        filteredRaw.map((d) => [d.date.toISOString().split("T")[0], d.count])
      );

      const activity = days.map((d) => ({
        date: d.toISOString().split("T")[0], // YYYY-MM-DD
        count: map.get(d.toISOString().split("T")[0]) ?? 0,
      }));

      return httpResponse(req, res, 200, responseMessage.SUCCESS, activity);
    } catch (err) {
      console.log(err);
      httpError(next, err, req, 500);
    }
  },

  tabLeet: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    try {
      const response = await axios.post(
        LEETCODE_API_URL,
        {
          query: tabLeet,
          variables: {
            username: username,
            limit: "",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
          },
        }
      );

      const rawData = response.data;
      if (rawData.errors && rawData.errors.length > 0) {
        return httpResponse(req, res, 400, rawData.errors[0].message);
      }
      console.log(rawData);
      return httpResponse(req, res, 200, responseMessage.SUCCESS, rawData.data);
    } catch (err) {
      console.log(err);
      httpError(next, err, req, 500);
    }
  },

  userCalendarMonth: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.params;
    try {
      // Fetch data from LeetCode API
      const response = await axios.post(
        LEETCODE_API_URL,
        {
          query: userCalendar,
          variables: { username },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
          },
        }
      );

      const rawData = response.data;
      if (rawData.errors && rawData.errors.length > 0) {
        return httpResponse(req, res, 400, rawData.errors[0].message);
      }

      const parsed = JSON.parse(rawData.data.matchedUser.submissionCalendar);

      // Define date range (UTC)
      const today = new Date();
      const startDate = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 2, 1)
      );
      const endDate = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0)
      );

      // Normalize to UTC midnight
      const normalizeUTC = (d: Date) =>
        new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

      // Convert raw data to date-count pairs
      const raw = Object.entries(parsed).map(([ts, count]) => {
        const d = new Date(Number(ts) * 1000);
        return { date: normalizeUTC(d), count: Number(count) };
      });

      // Filter for the last 3 months
      const filteredRaw = raw.filter(
        (d) => d.date >= startDate && d.date <= endDate
      );

      // Create a map for quick lookup
      const map = new Map(
        filteredRaw.map((d) => [d.date.toISOString().split("T")[0], d.count])
      );

      // Generate all days in the range
      const days: { date: string; count: number | null }[] = [];
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setUTCDate(d.getUTCDate() + 1)
      ) {
        const dateStr = d.toISOString().split("T")[0];
        days.push({
          date: dateStr!,
          count: d <= today ? map.get(dateStr) ?? 0 : null, // null for future dates
        });
      }

      // Assign color level
      const getLevel = (count: number | null): string => {
        if (count === null) return "bg-transparent border border-gray-700";
        if (count === 0) return levels[0]!;
        if (count < 3) return levels[1]!;
        if (count < 6) return levels[2]!;
        if (count < 9) return levels[3]!;
        return levels[4]!;
      };

      // Group days by month
      const months: {
        name: string;
        weeks: { day: string; count: number | null; level: string }[][];
      }[] = [];
      let currentMonth: string | null = null;
      let currentMonthDays: {
        day: string;
        count: number | null;
        level: string;
      }[] = [];

      days.forEach((day) => {
        const monthKey = new Date(day.date).toLocaleString("default", {
          year: "numeric",
          month: "short",
        });
        if (monthKey !== currentMonth) {
          if (currentMonth !== null) {
            // Process the previous month
            const firstDay = new Date(currentMonthDays[0]!.day);
            const startDayOfWeek = firstDay.getDay();
            const paddedDays = [
              ...Array(startDayOfWeek)
                .fill(null)
                .map(() => ({ day: "", count: null, level: "bg-transparent" })),
              ...currentMonthDays,
            ];
            const weeks: {
              day: string;
              count: number | null;
              level: string;
            }[][] = [];
            for (let i = 0; i < paddedDays.length; i += 7) {
              weeks.push(paddedDays.slice(i, i + 7));
            }
            months.push({ name: currentMonth, weeks });
          }
          currentMonth = monthKey;
          currentMonthDays = [];
        }
        currentMonthDays.push({
          day: day.date,
          count: day.count,
          level: getLevel(day.count),
        });
      });

      // Push the last month
      if (currentMonthDays.length > 0) {
        const firstDay = new Date(currentMonthDays[0]!.day);
        const startDayOfWeek = firstDay.getDay();
        const paddedDays = [
          ...Array(startDayOfWeek)
            .fill(null)
            .map(() => ({ day: "", count: null, level: "bg-transparent" })),
          ...currentMonthDays,
        ];
        const weeks: { day: string; count: number | null; level: string }[][] =
          [];
        for (let i = 0; i < paddedDays.length; i += 7) {
          weeks.push(paddedDays.slice(i, i + 7));
        }
        months.push({ name: currentMonth!, weeks });
      }

      return httpResponse(req, res, 200, responseMessage.SUCCESS, { months });
    } catch (err) {
      console.error(err);
      httpError(next, err, req, 500);
    }
  },

  randomQuotes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      const quote = motivationalQuotes[randomIndex]
      console.log("helloooooooooooo😀😀😀")

      return httpResponse(req, res, 200, responseMessage.SUCCESS, { quote });
    } catch (err) {
      console.log(err);
      httpError(next, err, req, 500);
    }
  },

};
