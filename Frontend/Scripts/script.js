document.getElementById("btn").style.display="none";
document.getElementById("btn2").style.display="block";
document.getElementById("btn3").style.display="none";
let output="";
let weather ="";
let descript="";
let forecast="";
let forecast_weather="";
let description="";
const getPosition = () => {
    return new Promise((resolve, reject) => {
        const onSuccess = (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            pos = [lat,lng];

            resolve(pos)
        }

        const onError = () => {
            console.log('Can\'t get location info');
            reject();
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    })
}

document.getElementById("btn2").addEventListener('click',loading);

// use it anywhere
function loading(e){
  document.getElementById("card").style.display="none";
  document.getElementById("preloader").style.display="block";
  document.getElementById("collapse").style.display="block";
  $( "#container" ).fadeOut( 10 ).delay( 3500 ).fadeIn( 20 );
  $("#footer").fadeOut(10).delay(3500).fadeIn(20);
  $( "#preloader" ).fadeIn( 100 ).delay( 3000 ).fadeOut( 200 );
  $( ".credit" ).fadeIn( 100 ).delay( 3000 ).fadeOut( 200 );
  //  document.getElementById("preloader").style.display="none";
  document.getElementById("btn2").style.display="block";
document.getElementById("btn").style.display="block";
getPosition().then((position) => {
  
    let lat= position[0];
    let long = position[1];
    let meter="";
    //let url6="https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude="+lat+"&longitude="+long+"&distance=25&API_KEY=14D8E698-9531-4A96-B306-B29C7AC6E6E5";
    let url5 ="https://api.breezometer.com/air-quality/v2/current-conditions?lat="+lat+"&lon="+long+"&key=502ae1517d1c4558b73b83c082987b3c&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information";
    let url4="https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"&lon="+long+"&key=da4da38f6737463fb323e3dfcf2f83ba";
    let url3 = "https://api.weatherbit.io/v2.0/forecast/airquality?lat="+lat+"&lon="+long+"&key=da4da38f6737463fb323e3dfcf2f83ba";
    let url2= "https://api.weatherbit.io/v2.0/current?lat="+lat+"&lon="+long+"&key=21fa957a55304cc4990c095735ed4ce2&include=minutely";
    let url = "https://api.weatherbit.io/v2.0/current/airquality?lat="+lat+"&lon="+long+"&key=21fa957a55304cc4990c095735ed4ce2";

    // AQI VALUIES
fetch(url)
.then(res => {
    return res.json();
})
.then( function(data) {
    output = ` <div class="shadowbox">
    <h3>AQI Value (US - EPA standard): ${data.data[0].aqi}</h3>
  </div>
  <div class="shadowbox">
    <h3>PM 2.5 Value: ${data.data[0].pm25} µg/m³</h3>
  </div>
  <div class="shadowbox">
    <h3>PM 10 Value: ${data.data[0].pm10} µg/m³</h3>
  </div>
  <div class="shadowbox">
    <h3>O3 Value: ${data.data[0].o3} µg/m³</h3>
  </div>
  <div class="shadowbox">
    <h3>NO2 Value: ${data.data[0].no2} µg/m³</h3>
  </div>
  <div class="shadowbox">
    <h3>SO2 Value: ${data.data[0].so2} µg/m³</h3>
  </div>
  <div class="shadowbox">
    <h3>CO Value: ${data.data[0].co} µg/m³</h3>
  </div>`;
  document.getElementById("api").innerHTML = output;

  if(data.data[0].aqi>=0&&data.data[0].aqi<=50)
  {
    fetch('./Pages/aqi.json')
    .then(res => {
        return res.json();
    })
    .then( function(data) {
      meter=95;
      document.getElementById("meter").innerHTML=`<div class="ui-widgets" style="border: 1.2rem solid ${data.C_1.Color}; border-left-color: ${data.C_1.Color}; border-top-color:${data.C_1.Color} ;border-right-color: ${data.C_1.Color};border-bottom-color: white ;">`;
  document.getElementById("health-range").innerHTML=`<h2 style="color:${data.C_1. Color};">${data.C_1.category}</h2>`;
  document.getElementById("meter").innerHTML=`<div role="progressbar" aria-valuenow=${meter} aria-valuemin="0" aria-valuemax="100" style="--value:${meter};--fg: ${data.C_1.Color};"></div>`;
  
  })
  .catch(err => console.log(err));
}
else if( data.data[0].aqi>=51&& data.data[0].aqi<=100)
{
  fetch('./Pages/aqi.json')
  .then(res => {
      return res.json();
  })
  .then( function(data) {
    meter=85;
    document.getElementById("meter").innerHTML=`<div class="ui-widgets" style="border: 1.2rem solid ${data.C_2.Color}; border-left-color: ${data.C_2.Color}; border-top-color:${data.C_2.Color} ;border-right-color: ${data.C_2.Color};border-bottom-color: white ;">`;
document.getElementById("health-range").innerHTML=`<h2 style="color:${data.C_2.Color};">${data.C_2.category}</h2>`;
document.getElementById("meter").innerHTML=`<div role="progressbar" aria-valuenow=${meter} aria-valuemin="0" aria-valuemax="100" style="--value:${meter};--fg: ${data.C_2.Color};"></div>`;

  })
  .catch(err => console.log(err));
}

else if ( data.data[0].aqi>=101&& data.data[0].aqi<=150)
{
  fetch('./Pages/aqi.json')
  .then(res => {
      return res.json();
  })
  .then( function(data) {
    meter=65;
    document.getElementById("meter").innerHTML=`<div class="ui-widgets" style="border: 1.2rem solid ${data.C_3.Color}; border-left-color: ${data.C_3.Color}; border-top-color:${data.C_3.Color} ;border-right-color: ${data.C_3.Color};border-bottom-color: white ;">`;
    document.getElementById("health-range").innerHTML=`<h2 style="color:${data.C_3.Color};">${data.C_3.category}</h2>`;
    document.getElementById("meter").innerHTML=`<div role="progressbar" aria-valuenow=${meter} aria-valuemin="0" aria-valuemax="100" style="--value:${meter};--fg: ${data.C_3.Color};"></div>`;
  
  })
  .catch(err => console.log(err));
}
else if( data.data[0].aqi>=151&& data.data[0].aqi<=200)
{
  fetch('./Pages/aqi.json')
  .then(res => {
      return res.json();
  })
  .then( function(data) {
    meter=45;
    document.getElementById("meter").innerHTML=`<div class="ui-widgets" style="border: 1.2rem solid ${data.C_4.Color}; border-left-color: ${data.C_4.Color}; border-top-color:${data.C_4.Color} ;border-right-color: ${data.C_4.Color};border-bottom-color: white ;">`;
    document.getElementById("health-range").innerHTML=`<h2 style="color:${data.C_4.Color};">${data.C_4.category}</h2>`;
    document.getElementById("meter").innerHTML=`<div role="progressbar" aria-valuenow=${meter} aria-valuemin="0" aria-valuemax="100" style="--value:${meter};--fg: ${data.C_4.Color};"></div>`;

  })
  .catch(err => console.log(err));

}
else if (data.data[0].aqi>=201&& data.data[0].aqi<=300)
{
  fetch('./Pages/aqi.json')
  .then(res => {
      return res.json();
  })
  .then( function(data) {
     
    meter=25;
    document.getElementById("meter").innerHTML=`<div class="ui-widgets" style="border: 1.2rem solid ${data.C_5.Color}; border-left-color: ${data.C_5.Color}; border-top-color:${data.C_5.Color} ;border-right-color: ${data.C_5.Color};border-bottom-color: white ;">`;
     document.getElementById("health-range").innerHTML=`<h2 style="color:${data.C_5.Color};">${data.C_5.category}</h2>`;
     document.getElementById("meter").innerHTML=`<div role="progressbar" aria-valuenow=${meter} aria-valuemin="0" aria-valuemax="100" style="--value:${meter};--fg: ${data.C_5.Color};"></div>`;

  
  })
  .catch(err => console.log(err));


}

else if (data.data[0].aqi>=301&& data.data[0].aqi<=500)
{
  fetch('./Pages/aqi.json')
  .then(res => {
      return res.json();
  })
  .then( function(data) {
     
  meter=5;
  document.getElementById("meter").innerHTML=`<div class="ui-widgets" style="border: 1.2rem solid ${data.C_6.Color}; border-left-color: ${data.C_6.Color}; border-top-color:${data.C_6.Color} ;border-right-color: ${data.C_6.Color};border-bottom-color: white ;">`;
   document.getElementById("health-range").innerHTML=`<h2 style="color:${data.C_6.Color};">${data.C_6.category}</h2>`;
   document.getElementById("meter").innerHTML=`<div role="progressbar" aria-valuenow=${meter} aria-valuemin="0" aria-valuemax="100" style="--value:${meter};--fg: ${data.C_6.Color};"></div>`;

  })
  .catch(err => console.log(err));
}

})

.catch(err => console.log(err));

// WEATHER VALUES
fetch(url2)
.then(resp =>{
    return resp.json();
})
.then(function(data){
    weather=`<div class="shadowbox">
    <h3>Relative Humidity: ${data.data[0].rh} %</h3>
  </div>
  <div class="shadowbox">
    <h3>Temperature (in Celsius): ${data.data[0].temp}</h3>
  </div>
  <div class="shadowbox">
    <h3>Atmospheric Pressure: ${data.data[0].pres} mb</h3>
  </div>
  <div class="shadowbox">
    <h3>    Wind Speed: ${data.data[0].wind_spd} m/s</h3>
  </div>
  <div class="shadowbox">
    <h3>    UV Index: ${data.data[0].uv}</h3>
  </div>
  <div class="shadowbox">
    <h3>    Estimated Solar Radiation: ${data.data[0].solar_rad} W/m^2 </h3>
  </div>
  <div class="shadowbox">
  <h3>    Clouds Coverage: ${data.data[0].clouds} %</h3>
</div>
<div class="shadowbox">
    <h3>   Source Station Id: ${data.data[0].station} </h3>
  </div>`;
  
  descript = data.data[0].weather.description;
  document.getElementById("temp").innerHTML = weather;
  document.getElementById("icon").innerHTML=`<img src="https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png">`;
  document.getElementById("descript").innerHTML=`<span><p>${descript}</p></span>`
 
  
})
.catch(e => console.log(e));

// AQI FORECAST VALUES


fetch(url3)
.then(res => {
  return res.json();
})
.then( function(data){
   forecast = `<div class="shadowbox">
   <h3>AQI Value: ${data.data[0].aqi}</h3>
 </div>
 <div class="shadowbox">
   <h3>PM 2.5 Value: ${data.data[0].pm25} µg/m³</h3>
 </div>
 <div class="shadowbox">
   <h3>PM 10 Value: ${data.data[0].pm10} µg/m³</h3>
 </div>
 <div class="shadowbox">
   <h3>O3 Value: ${data.data[0].o3} µg/m³</h3>
 </div>
 <div class="shadowbox">
   <h3>NO2 Value: ${data.data[0].no2} µg/m³</h3>
 </div>
 <div class="shadowbox">
   <h3>SO2 Value: ${data.data[0].so2} µg/m³</h3>
 </div>
 <div class="shadowbox">
    <h3>CO Value: ${data.data[0].co} µg/m³</h3>
  </div>`;
  document.getElementById("forecast").innerHTML = forecast;
})
.catch(e => console.log(e));


  // WEATHER FORECAST VALUES


  fetch(url4)
  .then(resp =>{
      return resp.json();
  })
  .then(function(data){
      forecast_weather=`<div class="shadowbox">
      <h3>Relative Humidity: ${data.data[0].rh} %</h3>
    </div>
    <div class="shadowbox">
      <h3>Temperature (in Celsius): ${data.data[0].temp}</h3>
    </div>
    <div class="shadowbox">
      <h3>Atmospheric Pressure: ${data.data[0].pres} mb</h3>
    </div>
    <div class="shadowbox">
      <h3>    Wind Speed: ${data.data[0].wind_spd} m/s</h3>
    </div>
    <div class="shadowbox">
      <h3>    UV Index: ${data.data[0].uv}</h3>
    </div>
    <div class="shadowbox">
      <h3>    Visibility: ${data.data[0].vis} km </h3>
    </div>
    <div class="shadowbox">
    <h3>    Clouds Coverage: ${data.data[0].clouds} %</h3>
  </div>
  <div class="shadowbox">
      <h3>   Maximum Temperature (in Celsius): ${data.data[0].max_temp} </h3>
    </div>`;
    
    description = data.data[0].weather.description;
    document.getElementById("icon-weather").innerHTML=`<img src="https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png">`;
    document.getElementById("description").innerHTML=`<span><p>${description}</p></span>`
    document.getElementById("forecast-weather").innerHTML = forecast_weather;
  })
  .catch(e => console.log(e));




  fetch(url5)
    .then(res=>{
      return res.json();
    })
    .then(function (data){
      console.log(data);
      let source_co="";
      source_co=data.data.pollutants.co.sources_and_effects.sources;
       document.getElementById("health-suggestions").innerHTML=`<div>
       <div id="box">
       <div id="health-suggest">
         <h4><b>General Population</b> : ${data.data.health_recommendations.general_population}</h4>
       </div>
       </div>
      <div id="box">
      <div id="health-suggest">
      <h4><b>Elderly</b> : ${data.data.health_recommendations.elderly}</h4>
    </div>
      </div>

       <div id="box">
       <div id="health-suggest">
         <h4><b>Lung Diseases</b> : ${data.data.health_recommendations.lung_diseases}</h4>
       </div>
       </div>

       <div id="box">
       <div id="health-suggest">
         <h4><b>Heart Diseases</b> : ${data.data.health_recommendations.heart_diseases}</h4>
       </div>
       </div>
       <div id="box">
       <div id="health-suggest">
         <h4><b>Pregnant Women</b> : ${data.data.health_recommendations.pregnant_women}</h4>
       </div>
       </div>
       <div id="box">
       <div id="health-suggest">
         <h4><b>Children</b> : ${data.data.health_recommendations.children}</h4>
       </div>
       </div>


     </div>`;
    //  document.getElementById("poll").innerHTML=`
    //  <div>
    //             <div id="poll-name">
    //               <div id="box">
    //               <h4><b>SO2</b></h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.so2.sources_and_effects.sources}</h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.so2.sources_and_effects.effects}</h4>
    //               </div>
    //             </div>
    //             <div id="poll-name">
    //               <div id="box">
    //               <h4><b>CO</b> : </h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.co.sources_and_effects.sources}</h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.co.sources_and_effects.effects}</h4>
    //               </div>
    //             </div>
    //             <div id="poll-name">
    //               <div id="box">
    //               <h4><b>NO2</b> : </h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.no2.sources_and_effects.sources}</h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.no2.sources_and_effects.effects}</h4>
    //               </div>
    //             </div>
    //             <div id="poll-name">
    //               <div id="box">
    //               <h4><b>O3</b> : </h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.o3.sources_and_effects.sources}</h4>
    //               <h4><b>Source</b> : ${data.data.pollutants.o3.sources_and_effects.effects}</h4>
    //               </div>
    //             </div>
    //             <div id="poll-name">
    //             <div id="box">
    //             <h4><b>NO</b> : </h4>
    //             <h4><b>Source</b> : ${data.data.pollutants.no.sources_and_effects.sources}</h4>
    //             <h4><b>Source</b> : ${data.data.pollutants.no.sources_and_effects.effects}</h4>
    //             </div>
    //           </div>
    
    //           </div>`;
    
    })
    .catch(e => console.log(e));

  


});
e.preventDefault();


}
