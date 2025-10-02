const express = require("express");
const router = express.Router();
const User = require("../model/users");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");


router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.id != req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await User.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
