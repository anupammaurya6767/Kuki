// eshint esversion:6

const express = require("express");
var createError = require('http-errors');
const https = require("https");
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/Frontend'));

app.get("/" , function(req,res){
  res.sendFile(path.join(__dirname,'/Frontend/index.html'));
  
})

app.get("/login",function(req,res){
  res.sendFile(path.join(__dirname,'/Frontend/Pages/log.html'));
})




app.listen(3000 , function(){
  console.log("Server started at port 3000");
})

module.exports = app;
