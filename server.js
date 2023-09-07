require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const cors = require("cors");

const transactionsRoutes = require("./routes/transactionsRoutes");
const connectDB = require("./config/db");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(
    `Server running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
