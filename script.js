'use strict';
const loc = document.querySelector('.location');
const temp = document.querySelector('.temperature');
const humid = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const precipi = document.querySelector('.prec');
const statusImg = document.querySelector('.status-img');
const status = document.querySelector('.status');
const timeStatus = document.querySelector('.as-of');
const weatherContainer = document.querySelector('.weather-container');

// Getting cuttent position
const getCurrentPosition = () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function (position) {
               const {latitude : lat, longitude : lng } = position.coords;
               getWeatherDetails(lat,lng);
            },
            function () {
                alert('Could not get your position');
            }
        );
    }
        
}
// Initialize get function
getCurrentPosition();

// Render the data
const loadWeatherData = data =>{
    weatherContainer.classList.remove('hide');
    loc.innerText = data.location.name;
    temp.innerText = data.current.temp_c;
    humid.innerText = data.current.humidity;
    wind.innerText = data.current.wind_kph;
    precipi.innerText = data.current.precip_mm;
    status.innerText = data.current.condition.text;
    statusImg.src = `${data.current.condition.icon}`;
    timeStatus.innerText = data.current.last_updated;
};

// API call 
const getWeatherDetails = async (lat,lng) =>{
    try{
        const req = await fetch(`https://api.weatherapi.com/v1/current.json?key=a3338513d0294710acf180535230104 &q=${lat},${lng}&aqi=yes`);
        const data = await req.json();
        loadWeatherData(data);
    }catch(err){
        console.error(`Error: ${err}`);
    }
}
