// eshint usingesversion:6
const express = require("express");
const https = require("https"); 
// const ipapi = require("ipapi.co");
const config = require("./Frontend/Pages/aqi.json");
const fs = require("fs");
const axios = require('axios');




let loc = "";
let lat="";
let long = "";
let aqi_curr = "";
let foraqi = "";
let weather_curr = "";
let forweather="";
let health = "";
let jsi = "";
let meter = "";
let colo = "";
let categi = "";
let filters="";
const options = {
  path: '/json/',
  host: 'ipapi.co',
  port: 443,
  headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
};

 

const app = express();
app.use(express.static("Frontend"));
app.set('view engine','ejs');

const bodyParser = require("body-parser");

https.get(options, function(resp){
  var body = ''
  resp.on('data', function(data){
      body += data;
  });

  resp.on('end', function(){
      loc = JSON.parse(body);
      lat=loc.latitude;
      long=loc.longitude;
      let url2= "https://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+long+"&key=21fa957a55304cc4990c095735ed4ce2&include=minutely";
      let url3 = "https://api.weatherbit.io/v2.0/forecast/airquality?lat="+lat+"&lon="+long+"&key=da4da38f6737463fb323e3dfcf2f83ba";
      let url = `https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${long}&key=21fa957a55304cc4990c095735ed4ce2`;
      //let url2= "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=0cb3e3e792ee55fd357573ed60bdc83a";
      // let url3 = "https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat="+lat+"&lon="+long+"&appid=0cb3e3e792ee55fd357573ed60bdc83a";
      let url4="https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"&lon="+long+"&key=21fa957a55304cc4990c095735ed4ce2";
       let url5 ="https://api.breezometer.com/air-quality/v2/current-conditions?lat="+lat+"&lon="+long+"&key=502ae1517d1c4558b73b83c082987b3c&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information";

      https.get(url,function(response){
        response.on('data',function(data){
            const dataFromAPI = JSON.parse(data);
           aqi_curr = dataFromAPI;
           fs.readFile("./Frontend/Pages/aqi.json", "utf8", (err, jsonString) => {
            if (err) {
               console.log("File read failed:", err);
               return;
             }
              jsi = JSON.parse(jsonString);
             if(aqi_curr.data[0].aqi>=0 && aqi_curr.data[0].aqi<=50)
             {
                 meter = 95;
                 colo = jsi.C_1.Color;
                 categi = jsi.C_1.category;
             }
             else if(aqi_curr.data[0].aqi>=51 && aqi_curr.data[0].aqi<=100)
             {
              meter = 85;
              colo = jsi.C_2.Color;
              categi = jsi.C_2.category;
             }
             else if(aqi_curr.data[0].aqi>=101 && aqi_curr.data[0].aqi<=150)
             { 
              meter = 65;
              colo = jsi.C_3.Color;
              categi = jsi.C_3.category;
    
             }
             else if(aqi_curr.data[0].aqi>=151 && aqi_curr.data[0].aqi<=200)
             { 
              meter = 45;
              colo = jsi.C_4.Color;
              categi = jsi.C_4.category;
    
             }
             else if(aqi_curr.data[0].aqi>=201 && aqi_curr.data[0].aqi<=300)
             { 
              meter = 25;
              colo = jsi.C_5.Color;
              categi = jsi.C_5.category;
    
             }
             else if(aqi_curr.data[0].aqi>=301 && aqi_curr.data[0].aqi<=500)
             { 
              meter = 5;
              colo = jsi.C_6.Color;
              categi = jsi.C_6.category;
    
             }
           });
    
           
        })
        });

        // https.get(url2,function(response){
        //   response.on('data',function(data){
        //       const weather = JSON.parse(data);
        //      weather_curr = weather;
        
        //      //res.render('index2');
             
        //   })
        //   });

          (async () => {
          try {
            const response = await axios.get(url2)
            weather_curr = response.data;
            //console.log(weather_curr.data[0]);
          } catch (error) {
            console.log(error.response.body);
          }
        })();


         // aqi forecast
          https.get(url3,function(response){
        // //   // response.on('data',function(data){
        // //   //     const for_aqi = JSON.parse(data);
        // //   //    // aqi_for = JSON.parse(foraqi);
        // //   //    foraqi=for_aqi;
        // //   //    console.log(for_aqi.list[0].components.co);
        // //      //res.render('index2');
             let chunks = [];
             response.on('data', function(data) {
              chunks.push(data);
            }).on('end', function() {
              let data   = Buffer.concat(chunks);
              let schema = JSON.parse(data);
              // console.log(schema.data[0]);
              foraqi=schema;
             // console.log(foraqi);
            });
          })
         // });
      


          //weather forecast
          https.get(url4,function(response){
            // //   // response.on('data',function(data){
            // //   //     const for_aqi = JSON.parse(data);
            // //   //    // aqi_for = JSON.parse(foraqi);
            // //   //    foraqi=for_aqi;
            // //   //    console.log(for_aqi.list[0].components.co);
            // //      //res.render('index2');
                 let chunks = [];
                 response.on('data', function(data) {
                  chunks.push(data);
                }).on('end', function() {
                  let data   = Buffer.concat(chunks);
                  let schema = JSON.parse(data);
                  // console.log(schema.data[0]);
                  forweather=schema;
                 // console.log(foraqi);
                });
              })

   
            // health suggestions

           https.get(url5,function(response){
              response.on('data',function(data){
                  const sugg = JSON.parse(data);
                 health = sugg;
               //  console.log(health);
            
                 //res.render('index2');
                 
              })
              });

       
              
   });
});






app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.render('index2',{aqi_curr:aqi_curr.data[0].aqi,pm25_curr:aqi_curr.data[0].pm25,pm10_curr:aqi_curr.data[0].pm10,o3_curr:aqi_curr.data[0].o3,no2_curr:aqi_curr.data[0].no2,so2_curr:aqi_curr.data[0].so2,co_curr:aqi_curr.data[0].co,
  descript_curr:weather_curr.data[0].weather.description,humid_curr:weather_curr.data[0].rh,tempmin_curr:weather_curr.data[0].temp,press_curr:weather_curr.data[0].pres,speed_curr:weather_curr.data[0].wind_spd,solar_curr:weather_curr.data[0].solar_rad,visi_curr:weather_curr.data[0].vis,ic_curr:weather_curr.data[0].weather.icon,source_curr:weather_curr.data[0].station,
aqi_for:foraqi.data[0].aqi,pm25_for:foraqi.data[0].pm25,pm10_for:foraqi.data[0].pm10,o3_for:foraqi.data[0].o3,no2_for:foraqi.data[0].no2,so2_for:foraqi.data[0].so2,co_for:foraqi.data[0].co,
 descript_for:forweather.data[0].weather.description,humid_for:forweather.data[0].rh,tempmin_for:forweather.data[0].temp,press_for:forweather.data[0].pres,speed_for:forweather.data[0].wind_spd,solar_for:forweather.data[0].solar_rad,visi_for:forweather.data[0].vis,ic_for:forweather.data[0].weather.icon,source_for:forweather.data[0].station,
// general_curr:health.data.health_recommendations.general_population,elder_curr:health.data.health_recommendations.elderly,lung_curr:health.data.health_recommendations.lung_diseases,heart_curr:health.data.health_recommendations.heart_diseases,pregnant_curr:health.data.health_recommendations.pregnant_women,child_curr:health.data.health_recommendations.children,
// so2_src:health.datapollutants.so2.sources_and_effects.sources,so2_eff:health.datapollutants.so2.sources_and_effects.effects,co_src:health.datapollutants.co.sources_and_effects.sources,co_eff:health.datapollutants.co.sources_and_effects.effects,no2_src:health.datapollutants.no2.sources_and_effects.sources,no2_eff:health.datapollutants.no2.sources_and_effects.effects,o3_src:health.datapollutants.o3.sources_and_effects.sources,o3_eff:health.datapollutants.o3.sources_and_effects.effects,pm10_src:health.datapollutants.pm10.sources_and_effects.sources,pm10_eff:health.datapollutants.pm10.sources_and_effects.effects,pm25_src:health.datapollutants.pm25.sources_and_effects.sources,pm25_eff:health.datapollutants.pm25.sources_and_effects.effects,
meter:meter,colo:colo,categi:categi});
   //res.send(loc)
  

});
 






app.get("/location",function(req,res){
     
});

// get the element
app.post("/location",function(req,res){
   
   res.redirect("/location") // gives you data also add " .name attribute value of input "
});

app.listen(3000,function(){
console.log("Server started on port 3000");
});