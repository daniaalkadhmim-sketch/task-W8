const express = require("express");
const router = express.Router();
const User = require("../model/users");
const authMiddleware = require("../middleware/auth");

// Get all users (admin only)
router.get("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user by id (admin or owner)
router.get("/:id", authMiddleware(), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    if (req.user.role !== "admin" && req.user.id !== user.id)
      return res.status(403).json({ message: "Forbidden" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user (admin or owner)
router.put("/:id", authMiddleware(), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role !== "admin" && req.user.id !== user.id)
      return res.status(403).json({ message: "Forbidden" });

    await user.update(req.body);
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user (admin only)
router.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
