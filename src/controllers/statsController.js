import coinModel from "../models/coinModel.js";

export const getCoinStats = async (req, res) => {
  try {
    const coinName = req.query.name;

    if (!coinName) {
      return res.status(404).json({ error: "Coin name is required" });
    }

    const coinData = await coinModel.findOne({ Name: coinName });
    console.log(coinData);

    if (!coinData || coinData.length === 0) {
      return res.status(404).json({ error: "Coin not found" });
    }

    const stats = {
      price: coinData.Price,
      marketCap: coinData.MarketCap,
      "24hChange": coinData.PriceChange,
    };

    console.log(stats);

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching coin stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCoinDeviation = async (req, res) => {
  try {
    const coinName = req.query.name;

    const records = await coinModel
      .find({ Name: coinName })
      .sort({ createdAt: -1 })
      .limit(100);
    console.log(records);
    if (!records.length) {
      return res.status(404).json({ error: "No records found" });
    }

    // Extract price values
    const prices = records.map((record) => record.Price);
    console.log(prices);
    // Calculate mean
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    console.log(mean);
    // Calculate variance
    const variance =
      prices.reduce((sum, price) => {
        const diff = price - mean;
        return sum + diff * diff;
      }, 0) / prices.length;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);
    // console.log(standardDeviation);
    return res.status(200).json({
      deviation: standardDeviation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
