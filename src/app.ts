import express, { Application } from "express";
import responseMessage from "./constant/responseMessage";
import httpError from "./util/httpError";
import { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import router from "./router";

// Initialize
const app: Application = express();

// Middleware
app.use(express.json());

app.use("/api/v1", router);

// 404 handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND("route"));
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

app.use(globalErrorHandler);

export default app;
