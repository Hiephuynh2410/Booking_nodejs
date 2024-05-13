require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const app = express();
app.use(express.json());
app.use(logger("dev"));

const indexRouter = require("./routes/index");
app.use("/api/v1", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
