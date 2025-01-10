import express from "express";
import connectDB from "./mongoconfig.js";
import router from "./routes.js";

const app = express();
connectDB();
const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

app.use("/", router);
