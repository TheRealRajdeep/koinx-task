import express from "express";
import connectDB from "./config/mongoconfig.js";
import coinRoutes from "./routes/coinRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const app = express();
connectDB();
app.use("/", coinRoutes);
app.use("/", statsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

export default app;
