import { Request, Response } from "express";
import { THttpResponse } from "../types/types";

export default (
  req: Request,
  res: Response,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null
): void => {
  const response: THttpResponse = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message: responseMessage,
    data: data,
  };

  // Log
  console.log(`CONTROLLER_RESPONSE`, {
    meta: response,
  });

  // Production`
  res.status(responseStatusCode).json(response);
};
