import { Router } from "express";
import leetcodeController from "../controller/leetcodeController";

const router = Router();

router.route("/user-details").get(leetcodeController.userDetails);

export default router;
