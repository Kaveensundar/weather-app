import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import searchIcon from '../pngs/search.png';
import clearIcon from '../pngs/clear.png';
import cloudIcon from '../pngs/cloud.png';
import drizzleIcon from '../pngs/drizzle.png';
import rainIcon from '../pngs/rain.png';
import snowIcon from '../pngs/snow.png';
import windIcon from '../pngs/wind.png';
import humidityIcon from '../pngs/humidity.png';

const iconMap = {
  '01d': clearIcon,
  '01n': clearIcon,
  '02d': cloudIcon,
  '02n': cloudIcon,
  '03d': drizzleIcon,
  '03n': drizzleIcon,
  '09d': rainIcon,
  '09n': rainIcon,
  '10d': rainIcon,
  '10n': rainIcon,
  '13d': snowIcon,
  '13n': snowIcon,
};

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '847c50ce76faa39c92195aa151a59730'; // Move to env in prod

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4 text-primary">🌤 Weather Forecast</h3>

        {/* Input Section */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-outline-primary" onClick={fetchWeather}>
            <img src={searchIcon} alt="search" style={{ width: '20px' }} />
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Weather Display */}
        {weather && (
          <div className="text-center">
            <img
              src={iconMap[weather.weather[0].icon] || clearIcon}
              alt="weather icon"
              style={{ width: '100px' }}
            />
            <h2 className="display-4 fw-bold">{Math.round(weather.main.temp)}°C</h2>
            <h5 className="text-muted">{weather.name}</h5>
            <p className="text-capitalize">{weather.weather[0].description}</p>

            <hr />

            <div className="row">
              <div className="col-6 text-center">
                <img src={humidityIcon} alt="humidity" style={{ width: '30px' }} />
                <div className="fw-bold">{weather.main.humidity}%</div>
                <small className="text-muted">Humidity</small>
              </div>
              <div className="col-6 text-center">
                <img src={windIcon} alt="wind" style={{ width: '30px' }} />
                <div className="fw-bold">{Math.round(weather.wind.speed)} km/h</div>
                <small className="text-muted">Wind Speed</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
