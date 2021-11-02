const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./config');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// db connection
mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Successfully connect to MongoDB.");
  }).catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  
// add sendformat method to res
app.use(function(req, res, next) {
  res.sendformat = (data, code = 200) => {
    if (typeof data === "object")
      return res.status(code).send({ code, ...data });
    else return res.status(code).send({ code, data: data });
  };
  next();
});

app.use(require("./routes"));
app.get('/', (req, res) => res.send("this is the response from app hosted on vm"));

// set port, listen for requests
const PORT = config.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
