const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const app = express();
const cors = require("cors");
const User = require("./models/User");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Connected");
});
app.post("/google", async (req, res) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: "Email and username required" });
    }
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ message: "Login successful", user, firstTime: false });
    } else {
      return res.status(200).json({
        message: "First time login, phone number required",
        firstTime: true,
        email,
        username,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
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
