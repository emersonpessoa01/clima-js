const express = require("express");
const app = express();

app.get("/api",(req, res)=>{
  const getWeatherData = async (city) => {
  
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    console.log(apiWeatherURL);
  
       res = await fetch(apiWeatherURL);
    const data = await res.json();
  
    toggleLoader();
  
    return data;
  };

})
app.listen(5500);
