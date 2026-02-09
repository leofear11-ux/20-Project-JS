// JavaScript code for the weather app

// 1 -Variables and constantes


// a - Manage the days of the week

// a.1 - Days of the week array
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// a.1.1 Background with weather
const stateWeather = {
  rain: "linear-gradient(to bottom, #dbe2ef, #a5b4c9)",
  thunder: "linear-gradient(to bottom, #616161, #9bc5c3)",
};

//a.2 Describe the day now
let today = new Date();

//a.3 - Options for formatting the day
let options = { weekday: 'long' };

//a.4 - Get the current day name
let dayNo = today.toLocaleDateString('en-US', options);

// - Assignment part
//Get the first letter of day name and change to uppercase after slice()
dayNo = dayNo.charAt(0).toUpperCase() + dayNo.slice(1)

//a.5 - Create a new array starting from current day to the end of the week, then from the start of the week to current day
let arrDayOrder = daysOfWeek.slice(daysOfWeek.indexOf(dayNo)).concat(daysOfWeek.slice(0, daysOfWeek.indexOf(dayNo)));


//a.6 - All DOM necessary elements
let domElements = {
  day: document.querySelector('.container .result'),
  temperature: document.querySelector('.container .temperature_weather'),
  state: document.querySelector('.container .state_weather'),
  location: document.querySelector('.container .location_weather'),
  hourName: document.querySelectorAll('.container .h_name_prev'),
  hourValue: document.querySelectorAll('.container .h_value_prev'),
  dayName: document.querySelectorAll('.container .d_name_prev'),
  dayValue: document.querySelectorAll('.container .d_value_prev'),
  icoWeather: document.querySelector('.container .block_logo img'),
};

//a.y - Display in console
console.log(arrDayOrder);
console.log(dayNo);
console.log(domElements);

//a.x - Display the current day in the HTML
domElements.day.textContent = dayNo;

// b.1 API key for OpenWeatherMap
const apiKey = '2a51c0d63154b9d973ce1bc584da80f9';

// b.2 - Variable for API result
let resultAPi;

// 2 - Functions and tests
// a - Function to call the API
function CallAPi(lat, lon){
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=temperature_2m_min,weathercode&timezone=auto`)
  .then(response => response.json())
  .then(data => {
    resultAPi = data;
    console.log(resultAPi);
    domElements.temperature.textContent = `${Math.round(parseInt(resultAPi.hourly.temperature_2m))}°C`;
    domElements.state.textContent = getWeatherText(resultAPi.hourly.weathercode[1]);
    domElements.location.textContent = `${resultAPi.timezone}`;
    if(domElements.state.textContent.includes('Mauvais temps')){
        domElements.icoWeather.src = "rainy-2.svg";
        document.querySelector('body').style.background = stateWeather.rain
    }
    
    let currentHour = new Date().getHours();
  
    for(let i = 0; i < domElements.hourName.length; i++){
      let incrHour = currentHour + i*3;
      if(incrHour > 24){
        domElements.hourName[i].textContent = `${incrHour - 24 } h`;
      }else if(incrHour == 24){
        domElements.hourName[i].textContent = `00 h`;
      }else{
        domElements.hourName[i].textContent = `${incrHour} h`;
      }
    }

    for(j = 0; j < domElements.hourValue.length; j++){
      let indexHour = currentHour + j*3;
      console.log(indexHour);
      domElements.hourValue[j].textContent = `${Math.round(parseInt(resultAPi.hourly.temperature_2m[indexHour]))}°C`;
    }
    
    for(k = 0; k < domElements.dayName.length; k++){
      domElements.dayName[k].textContent = arrDayOrder[k].slice(0,3);
    }
    
    for(m = 0; m < domElements.dayValue.length; m++){
      domElements.dayValue[m].textContent = `${Math.round(parseInt(resultAPi.daily.temperature_2m_min[m]))}°C`
    }
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
}
function getWeatherText(code) {
  switch (code) {
    case 0: return "Ciel dégagé";
    case 1: return "Peu nuageux";
    case 2: return "Partiellement nuageux";
    case 3: return "Couvert";
    default: return "Mauvais temps";
  }
}
// b - Chech the geolocation of user
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    CallAPi(lat, lon);
  }), error => { console.error('Error obtaining location:', error) }
}