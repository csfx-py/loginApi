require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const authRoute = require("./routes/auth");
const postRoute = require("./routes/page");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return(console.error(err));
    console.log("Connected to DB");
  }
);

app.use("/user", authRoute);
app.use("/posts", postRoute);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
