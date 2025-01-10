import express from "express";
import {
  getCoinStats,
  getCoinDeviation,
} from "../controllers/statsController.js";

const router = express.Router();
router.get("/stats", getCoinStats);
router.get("/deviation", getCoinDeviation);
export default router;
