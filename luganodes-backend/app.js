var express = require('express');
var cors = require("cors")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dataFetcher = require("./controllers/cryptoDataFetcher")

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST"],
  
  }

var app = express();
app.use(logger('dev'));
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/getcurrency",dataFetcher.fetchLiveRates);
app.get("/getweek",dataFetcher.fetchWeekRates);
app.get("/getmonth",dataFetcher.fetchMonthRates);



module.exports = app;
