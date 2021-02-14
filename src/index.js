require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/user", authRoute);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
