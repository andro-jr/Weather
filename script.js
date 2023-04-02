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
const countryInput = document.querySelector('#country-name');
const countryForm = document.querySelector('.country-form');

// Getting cuttent position
const getCurrentPosition = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const { latitude: lat, longitude: lng } = position.coords;
                getWeatherDetails(lat, lng);
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
const loadWeatherData = (data,capital) => {
    weatherContainer.classList.remove('hide');
    console.log(capital);
    if(!capital){
        loc.innerText = data.location.name;
    }else{
        const res = capital.charAt(0).toUpperCase() + capital.slice(1).toLowerCase();
        loc.innerText = res;
    }
    temp.innerText = data.current.temp_c;
    humid.innerText = data.current.humidity;
    wind.innerText = data.current.wind_kph;
    precipi.innerText = data.current.precip_mm;
    status.innerText = data.current.condition.text;
    statusImg.src = `${data.current.condition.icon}`;
    timeStatus.innerText = data.current.last_updated;
};

// API call 
const getWeatherDetails = async (lat, lng, capital) => {
    try {
        const req = await fetch(`https://api.weatherapi.com/v1/current.json?key=a3338513d0294710acf180535230104 &q=${lat},${lng}&aqi=yes`);
        const data = await req.json();
        if(capital){
            loadWeatherData(data,capital);
        }else{
            loadWeatherData(data,'');
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}


const getCityData = async (capital) => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
        const cityData = await res.json();
        console.log(cityData);
        getWeatherDetails(...(cityData[0].latlng),capital);
        countryInput.value = '';
    } catch (err) {
        alert(`Error: COuld not get the city please try again`);
    }
}

// Country Form
countryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = countryInput.value;
    getCityData(data);
});
