//API= d0b0e263748d76e177f14c61c484fd74

/* OPEN WAETHER MAP*/
// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d0b0e263748d76e177f14c61c484fd74

/* Country  Flags Icons */
// https://countryflagicons.com/

//https://www.countryflags.com/
//https://www.countryflagsapi.com/
// https://api.openweathermap.org/data/2.5/weather?q=belem&units=metric&appid=d0b0e263748d76e177f14c61c484fd74&lang=pt_br

/* Variável e seleção de elementos */
let apikey = "d0b0e263748d76e177f14c61c484fd74";
let apiCountry = "https://www.countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const temperatureElement = document.querySelector("#temperature span");
const tempElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

/* Funções */
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&appid=${apikey}`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  console.log(data);
};

/* Mostra dos dados inseridos no input */
function showWeatherData(city) {
  // console.log(city);
  getWeatherData(city);
}

/* Eventos */
/* Captura o valor do input */
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let city = cityInput.value;
  cityInput.value = "";
  // alert(city);
  showWeatherData(city);
});

cityInput.addEventListener("keydown", (e) => {
  // Verifique se a tecla pressionada foi a tecla "Enter" (código 13)
  if (e.keyCode === 13) {
    let city = cityInput.value;
    // console.log(city);
    // Defina o valor do campo de entrada como vazio ("")
    cityInput.value = "";
    showWeatherData(city);
  }
});
