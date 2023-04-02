'use strict';
const loc = document.querySelector('.location');
const temp = document.querySelector('.temperature');
const humid = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const precipi = document.querySelector('.prec');
const statusImg = document.querySelector('.status-img');
const status = document.querySelector('.status');
const timeStatus = document.querySelector('.as-of');


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

getCurrentPosition();

const loadWeatherData = data =>{
    loc.innerText = data.location.name;
    temp.innerText = data.current.temp_c;
    humid.innerText = data.current.humidity;
    wind.innerText = data.current.wind_kph;
    precipi.innerText = data.current.precip_mm;
    status.innerText = data.current.condition.text;
    statusImg.src = `${data.current.condition.icon}`;
    timeStatus.innerText = data.current.last_updated;
};

const getWeatherDetails = async (lat,lng) =>{
    try{
        const req = await fetch(`http://api.weatherapi.com/v1/current.json?key=a3338513d0294710acf180535230104 &q=${lat},${lng}&aqi=yes`);
        const data = await req.json();
        loadWeatherData(data);
    }catch(err){
        console.error(`Error: ${err}`);
    }
}





// 
// let a = 3;
// if(a%2==0)
//     alert('number is even')
// else
//     alert('number is odd');
