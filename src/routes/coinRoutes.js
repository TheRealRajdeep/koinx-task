import express from "express";
import { getAllCoins } from "../controllers/coinController.js";

const router = express.Router();

const fetchCoins = async () => {
  try {
    await getAllCoins();
  } catch (error) {
    console.error("Error fetching coins:", error);
  }
};
setInterval(fetchCoins, 60000);
export default router;
