import express, { Application } from "express";

// Initialize
const app: Application = express();

// Middleware
app.use(express.json());

// 404 handler
export default app;
