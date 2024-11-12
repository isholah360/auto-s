const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./server/config/db");
const authRoutes = require("./server/router/authRoutes");
const customerRoute = require("./server/router/customerRoute");

const cookieParser = require("cookie-parser");
const next = require("next");
const path = require("path");


dotenv.config();
connectDB();

const app = express();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({
  dev,
  dir: path.join(__dirname, "client"),
});
// app.use(express.static(path.join(__dirname, "client", "public")));
const handle = nextApp.getRequestHandler();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoute);

app.all("*", (req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  nextApp.prepare().then(() => {
    console.log(`Server running on port ${PORT}`);
  });

});
