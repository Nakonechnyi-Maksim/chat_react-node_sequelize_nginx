require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./routes/route");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.SEQ_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://176.100.124.148:3000",
    credentials: true,
  })
);
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate(); //
    await sequelize.sync(); // всегда пишем, если есть sequelize
    console.log("К бд подруб имеется");
    app.listen(PORT, () => console.log(`Сервер на этом порте: ${PORT}`));
  } catch (e) {
    console.log("Ашибочка", e);
  }
};

start();
