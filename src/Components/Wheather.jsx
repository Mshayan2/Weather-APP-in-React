import React, { useState } from 'react';
import './Wheather.css';
import axios from 'axios';

const Wheather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
   
    
    const fetchWeatherData = async (city) => {
        try {
            const apiKey = 'd09a4089f86f6e4c28282d211cbc2a8b';
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            setWeatherData(response.data);
        } catch (error) {
            alert('City Not Found');
            setWeatherData(null);
        }
    };

    const searchCity = () => {
        if (city === '') {
            alert('Please enter a city name');
            return;
        }
        fetchWeatherData(city);
    };


    

    return (
        <>
            <h1>MS Weather App</h1>
            <div className="inputSearch">
                <input
                    type="text"
                    placeholder="Enter City Name"
                    className="input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn" onClick={searchCity}>
                    Search <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <div className="container">
                {weatherData ? (
                    <div className="info">
                        <h2 className="location">
                            <i className="fas fa-street-view"></i> {weatherData.name}
                        </h2>
                        <h1 className="temp">
                            Temp Is: {Math.round(weatherData.main.temp - 273.15)}°C
                        </h1>
                        <h3 className="tempmin_max">
                            M Min Temp: {(weatherData.main.temp_min - 273.15).toFixed(2)}°C / Max Temp: {(weatherData.main.temp_max - 273.15).toFixed(2)}°C
                        </h3>
                      
                        <p>{weatherData.weather[0].description }</p>
                        
                    
                    </div>
                ) : (
                    <h3>No weather data available. Please search for a city.</h3>
                )}
            </div>
        </>
    );
};

export default Wheather;
