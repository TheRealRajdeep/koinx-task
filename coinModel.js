import mongoose from "mongoose";

const coinSchema = mongoose.Schema(
  {
    coinName: { type: String, required: true },
    coinMarketCap: { type: Number, required: true },
    coinPriceChange: { type: Number, required: true },
  },
  { timestamps: true }
);

const coinModel = mongoose.models.coin || mongoose.model("coin", coinSchema);

export default coinModel;
