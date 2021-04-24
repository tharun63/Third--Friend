const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 9000;
// const url = "mongodb://localhost/ThirdFriendDB"; // offline database

const app = express();

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // to connect mongoose to database and avoid unwanted warning
  console.log("DB connected..!");
}

app.use(express.json()); //to read json file when we post
app.use(bodyParser.json());
app.use(cors());

const signinRoute = require("./routes/signin");
app.use("/", signinRoute);

const postData = require("./routes/data");
app.use("/", postData);

app.listen(PORT, function () {
  // listen server on port 9000
  console.log(`server Started on port: ${PORT}`);
});

connectDB();
