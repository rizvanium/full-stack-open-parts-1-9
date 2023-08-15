import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const BASE_GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';

const getGeoData = (countryCode) => {
  return axios
    .get(`${BASE_GEO_URL}?q=${countryCode}&limit=5&appid=${api_key}`)
    .then(response => response.data);
}

const getWeatherInfo = async ({ capitalGeo, code }) => {
  let { lat, lon } = capitalGeo;

    if (lat == null || lon == null) {
      const geoData = await getGeoData(code);
      lat = geoData[0].lat;
      lon = geoData[0].lon;
    }

  return axios
    .get(`${BASE_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => response.data);
}

export default {
  getWeatherInfo
};