const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError");
const routes = require("./routes/v1");
const { errorHandler } = require("./middleware/error");
const captureDateMiddleware = require("./middleware/middleware");
const config = require("./config/config");
const app = express();

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (app) {
    app.close();
  }
});


// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use(captureDateMiddleware);

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

mongoose.set('strictQuery',true);
mongoose.connect(config.mongoose.url).then(()=>{
  console.log("Connected to MongoDB");

  // Start the Node server
  app.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
  });
});
