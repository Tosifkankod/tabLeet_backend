import { Router } from "express";
import leetcodeController from "../controller/leetcodeController";

const router = Router();

router.route('/quote').get(leetcodeController.randomQuotes);
router.route("/tableet/:username").get(leetcodeController.tabLeet);
router.route("/:username").get(leetcodeController.userDetails);
router.route("/badges/:username").get(leetcodeController.userBadges);
router
  .route("/submission-stats/:username")
  .get(leetcodeController.userSubmissionStats);
router.route("/calendar/:username").get(leetcodeController.userCalendar);
router
  .route("/calendarMonth/:username")
  .get(leetcodeController.userCalendarMonth);

export default router;
