import express from "express";
import selfRoutes from "./apiRouter";
import leetcodeRoutes from "./leetCodeRouter";

const router = express.Router();

router.use("/self", selfRoutes);
router.use("/leetcode", leetcodeRoutes);

export default router;
