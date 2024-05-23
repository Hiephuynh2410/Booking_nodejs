require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/api/v1", indexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
