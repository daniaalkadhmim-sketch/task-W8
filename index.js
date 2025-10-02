const express = require("express");
const app = express();
const sequelize = require("./config/database");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Test DB connection and start server
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB error:", err));
