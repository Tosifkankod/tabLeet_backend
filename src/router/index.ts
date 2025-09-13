import express from "express";
import selfRoutes from "./apiRouter";

const router = express.Router();

router.use("/self", selfRoutes);

export default router;
