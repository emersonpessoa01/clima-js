//API= d0b0e263748d76e177f14c61c484fd74

/* OPEN WAETHER MAP*/
// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d0b0e263748d76e177f14c61c484fd74

/* Country  Flags Icons */
// https://countryflagicons.com/

//https://www.countryflags.com/
//https://www.countryflagsapi.com/
// https://api.openweathermap.org/data/2.5/weather?q=belem&units=metric&appid=d0b0e263748d76e177f14c61c484fd74&lang=pt_br

/* Variável e seleção de elementos */
import WEATHER_API_KEY from "./test.js";

const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const errorEmptyContainer = document.querySelector("#error-empty");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

const update = document.querySelector("#update");

// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}&lang=pt_br`;
  console.log(apiWeatherURL);

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};
const showErrorEmpty = () => {
  errorEmptyContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", `${apiCountryURL}${data.sys.country}.png`);
  umidityElement.innerText = `${data.main.humidity} %`;
  windElement.innerText = `${data.wind.speed} km/h`;

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center top";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  weatherContainer.classList.remove("hide");
  update.classList.remove("update");
  errorEmptyContainer.classList.add("hide");
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let city = cityInput.value;
  cityInput.value = "";
  if (city === "") {
    showErrorEmpty();
    hideInformation();
    return;
  }
  // alert(city);
  showWeatherData(city);
});
update.addEventListener("click", async (e) => {
  e.preventDefault();
  location.reload();

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

    /* if (e.code === "Enter") {
    let city = e.target.value;
    cityInput.value = "";
    showWeatherData(city); */
  }
});
// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");
    showWeatherData(city);
  });
});
