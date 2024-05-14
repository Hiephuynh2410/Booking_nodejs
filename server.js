require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use("/api/v1", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
