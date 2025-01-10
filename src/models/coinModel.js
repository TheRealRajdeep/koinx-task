import mongoose from "mongoose";

const coinSchema = mongoose.Schema(
  {
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    MarketCap: { type: Number, required: true },
    PriceChange: { type: Number, required: true },
  },
  { timestamps: true }
);

const coinModel = mongoose.model("coin", coinSchema);

export default coinModel;
