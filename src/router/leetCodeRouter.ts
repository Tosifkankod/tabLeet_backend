import { Router } from "express";
import leetcodeController from "../controller/leetcodeController";

const router = Router();

router.route("/:username").get(leetcodeController.userDetails);
router.route("/badges/:username").get(leetcodeController.userBadges);
router
  .route("/submission-stats/:username")
  .get(leetcodeController.userSubmissionStats);

export default router;
