const express = require("express");

const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.get("/", function(req,res)
{
    
    res.sendFile(__dirname + "/index.html");

});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=1d770164684542a44ad129547f9eaf1c&units=metric";
     
    https.get(url, function(response){
        
        response.on("data", function(data)
        {
            const  weatherData = JSON.parse(data);
            const des = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+ "@2x.png";
            const cityName = weatherData.name;
            
            res.write("<p>The current weather description in "+ cityName + " is  " + des+ ".</p>");

            res.write("<h1>The current weather temprature in "+ cityName + " is " + temp + " degree celcius.</h1>");

            res.write("<img src =" + imageUrl + ">");
            
        });


    });
});




app.listen(3000, function(req,res)
{
    console.log("Server started on port 3000");
});