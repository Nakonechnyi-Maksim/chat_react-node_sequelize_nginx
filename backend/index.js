require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./routes/route");
const app = express();
const PORT = process.env.SEQ_PORT;

app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("К бд подруб имеется");
    app.listen(PORT, () => console.log(`Сервер на этом порте: ${PORT}`));
  } catch (e) {
    console.log("Ашибочка", e);
  }
};

start();
