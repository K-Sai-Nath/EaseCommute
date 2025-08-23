const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server Started");
});
