const express = require("express");
const app = express();
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
require("dotenv").config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.log("DB error:", err));

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});

