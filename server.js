const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require('./config');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const mode = process.env.MODE;
var mongoURL;
if(mode === "production"){
  mongoURL = process.env.PROD_DB
}
else{
  mongoURL = process.env.DEV_DB
}
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

mongoose.set("debug", true)


// db connection
mongoose.connect(mongoURL, {
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
app.get('/', (req, res) => res.send("working"));

// set port, listen for requests
const PORT =  8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
