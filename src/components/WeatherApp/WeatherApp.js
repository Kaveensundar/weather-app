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
  const apiKey = '847c50ce76faa39c92195aa151a59730'; // move to env for production

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
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">🌤️ Weather App</h3>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={fetchWeather}>
            <img src={searchIcon} alt="search" style={{ width: '20px' }} />
          </button>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {weather && (
          <>
            <div className="text-center">
              <img
                src={iconMap[weather.weather[0].icon] || clearIcon}
                alt="Weather Icon"
                style={{ width: '100px' }}
              />
              <h2 className="display-4">{Math.round(weather.main.temp)}°C</h2>
              <h5 className="text-muted">{weather.name}</h5>
              <p className="text-capitalize">
                {weather.weather[0].description}
              </p>
            </div>

            <hr />

            <div className="row text-center">
              <div className="col-6 d-flex align-items-center justify-content-center gap-2">
                <img src={humidityIcon} alt="Humidity" style={{ width: '30px' }} />
                <div>
                  <div className="fw-bold">{weather.main.humidity}%</div>
                  <small className="text-muted">Humidity</small>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-center gap-2">
                <img src={windIcon} alt="Wind" style={{ width: '30px' }} />
                <div>
                  <div className="fw-bold">{Math.round(weather.wind.speed)} km/h</div>
                  <small className="text-muted">Wind Speed</small>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
