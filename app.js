const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes");
const app = express();
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { log } = require("winston");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/mydd_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

console.log("Aleksandr");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
