import axios from "axios";
import coinModel from "../models/coinModel.js";
import env from "dotenv";

env.config();

export const getAllCoins = async (_req, res) => {
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
    await Promise.all(
      result.data.map(async (coin) => {
        const coinData = {
          Name: coin.name,
          Price: coin.current_price,
          MarketCap: coin.market_cap,
          PriceChange: coin.price_change_24h,
        };
        const newCoin = new coinModel(coinData);
        await newCoin.save();
      })
    );
    return res.status(200).json({ message: "Coins saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
