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

const LEETCODE_API_URL = config.LEETCODE_API || "https://leetcode.com/graphql";

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
};
