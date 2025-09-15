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
};
