require('dotenv').config()
let express = require('express');
let app = express();

app.use('/',function middleware(req, res, next){
    var logger = req.method + " " + req.path + " - " + req.ip;
    console.log(logger);
    next();
});

app.get("/",function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/public',express.static(__dirname + '/public'));

app.get('/json',function(req,res){
    console.log(process.env.MESSAGE_STYLE);
    var response;
    if(process.env.MESSAGE_STYLE === "uppercase"){    
        response = "Hello json".toUpperCase();
    }
    else{
        response = "Hello json";
    }
    res.json({message: response});
});

app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.send({time: req.time});
});















 module.exports = app;
