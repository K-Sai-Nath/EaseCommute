const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Reset_Password = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "error with token" });
    }
    const hashed = await bcrypt.hash(password, 10);
    try {
      const updateUser = await User.findByIdAndUpdate(
        id,
        { password: hashed },
        { new: true }
      );
      res.json({ message: "Successfully Changed" });
    } catch (err) {
      console.log("Password Update Failed", err);
    }
  });
};
module.exports = Reset_Password;
