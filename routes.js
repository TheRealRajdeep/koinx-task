import express from "express";
import axios from "axios";
import coinModel from "./coinModel.js";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
const getInfo = router.get("/", async (_req, res) => {
  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cpolygon-ecosystem-token%2Cethereum`,
      {
        headers: {
          Authorization: `Bearer ${process.env.APIKEY}`,
        },
      }
    );
    console.log(result.data);
    result.data.forEach(async (coin) => {
      const coinData = {
        coinName: coin.name,
        coinMarketCap: coin.market_cap,
        coinPriceChange: coin.price_change_24h,
      };
      const newCoin = new coinModel(coinData);
      await newCoin.save();
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

router.get("/stats", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cpolygon-ecosystem-token%2Cethereum`,
      {
        headers: {
          Authorization: `Bearer ${APIKEY}`,
        },
      }
    );
    const coinName = req.query.name;
    const getCoin = result.data.find((coin) => coin.name === coinName);
    if (getCoin) {
      return res.status(200).json({ coin: getCoin });
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});
export default router;
