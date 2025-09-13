import { Router } from "express";
import apiController from "../controller/apiController";

const router = Router();

router.route("/").get(apiController.self);

export default router;
