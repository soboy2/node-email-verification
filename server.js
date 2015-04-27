//http://codeforgeek.com/2014/07/node-email-verification-script/
var path = require('path');
var express = require('express');


var app = express();


require('./routes/apis')(app, __dirname);

app.listen(3000, function() {
  console.log("Express Started on Port 3000");
});
