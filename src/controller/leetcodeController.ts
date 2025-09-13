import { NextFunction, Request, Response } from "express";
import httpResponse from "../util/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../util/httpError";
import config from "../config/config";
import axios from "axios";

const LEETCODE_API_URL = config.LEETCODE_API || "https://leetcode.com/graphql";

const query = `#graphql
query getUserProfile($username: String!) {s
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    githubUrl
    twitterUrl
    linkedinUrl
    contributions {
      points
      questionCount
      testcaseCount
    }
    profile {
      realName
      userAvatar
      birthday
      ranking
      reputation
      websites
      countryName
      company
      school
      skillTags
      aboutMe
      starRating
    }
  }
}`;

export default {
  userDetails: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let response = await axios.post(
        LEETCODE_API_URL,
        {
          query,
          variables: {
            username: "tosifkankod",
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

      const data = response.data;

      httpResponse(req, res, 200, responseMessage.SUCCESS, data);
    } catch (err) {
      httpError(next, err, req, 500);
    }
  },
};
