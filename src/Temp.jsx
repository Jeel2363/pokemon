import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css'; 
import './img/Untitled design (2).png';


const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateBg, setAnimateBg] = useState(false); 
  const [LeavesVisible, setLeavesVisible] = useState(false);  
  const [DropsVisible, setDropsVisible] = useState(false);  
  const [SnowVisible, setSnowVisible] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b918ec168e077c448c4f480aaa1a9715`);
      setWeatherData(response.data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError("Error fetching the weather data");
      setIsLoading(false);
      console.error("Error fetching the weather data", error);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate());
    return today.toDateString();
  };

  // const handleSearch = async () => {
  //   setWeatherData(null); 
  //   setError(null); 
  //   setIsLoading(true); 
  //   setAnimateBg(prevAnimateBg => !prevAnimateBg);
  //   try {
  //     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b918ec168e077c448c4f480aaa1a9715`);
  //     setWeatherData(response.data);
  //     setIsLoading(false);
  //     setError(null);
  //     const weatherCondition = response.data.weather[0].main.toLowerCase();
  //     setLeavesVisible(weatherCondition === 'clear' || weatherCondition === 'clouds');
  //     setDropsVisible(weatherCondition === 'rain' || weatherCondition === 'drizzle');
  //     setSnowVisible(weatherCondition === 'snow' || weatherCondition === 'mist');
  //   } catch (error) {
  //     setError("Error fetching the weather data");
  //     setIsLoading(false);
  //     console.error("Error fetching the weather data", error);
  //   }
  //   fetchData();
  // };
  

  const handleSearch = async () => {
    setWeatherData(null);
    setError(null);
    setIsLoading(true);
    setAnimateBg(prevAnimateBg => !prevAnimateBg);
    
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b918ec168e077c448c4f480aaa1a9715`);
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      setWeatherData(response.data);
      setIsLoading(false);
      setError(null);
  
      // Set the visibility states based on weather condition
      switch (weatherCondition) {
        case 'snow':
          setLeavesVisible(false);
          setDropsVisible(false);
          setSnowVisible(true);
          break;
        case 'rain':
          setLeavesVisible(false);
          setDropsVisible(true);
          setSnowVisible(false);
          break;
        default:
          setLeavesVisible(true);
          setDropsVisible(false);
          setSnowVisible(false);
          break;
      }
    } catch (error) {
      setError("Error fetching the weather data");
      setIsLoading(false);
      console.error("Error fetching the weather data", error);
    }
    fetchData();
  };
  

  const generateRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const generateRandomSnow = () => {
    const numSnow = 20;
    const snow = [];

    for (let i = 0; i < numSnow; i++) {
      const style = {
        left: `${generateRandomNumber(10, 1000)}vw`,
        animationDuration: `${generateRandomNumber(8, 150)}s`, 
        animationDelay: `${generateRandomNumber(0, 3)}s`,
        transform: `rotate(${generateRandomNumber(-30, 30)}deg)`, 
        opacity: generateRandomNumber(0.3, 0.8), 
      };
      snow.push(<i key={i} style={style}></i>);
    }

    return snow;
  };

  const generateRandomDrop = () => {
    const numDrops = 20;
    const drops = [];

    for (let i = 0; i < numDrops; i++) {
      const style = {
        left: `${generateRandomNumber(10, 1000)}vw`,
        animationDuration: `${generateRandomNumber(8, 150)}s`, 
        animationDelay: `${generateRandomNumber(0, 3)}s`,
        transform: `rotate(${generateRandomNumber(-30, 30)}deg)`, 
        opacity: generateRandomNumber(0.3, 0.8), 
      };
      drops.push(<i key={i} style={style}></i>);
    }

    return drops;
  };
  const generateRandomLeaves = () => {
    const numLeaves = 20;
    const leaves = [];
  
    for (let i = 0; i < numLeaves; i++) {
      const style = {
        left: `${generateRandomNumber(10, 1000)}vw`,
        animationDuration: `${generateRandomNumber(8, 150)}s`, 
        animationDelay: `${generateRandomNumber(0, 3)}s`,
        transform: `rotate(${generateRandomNumber(-30, 30)}deg)`, 
        opacity: generateRandomNumber(0.3, 0.8), 
      };
      leaves.push(<i key={i} style={style}></i>);
    }
  
    return leaves;
  };
  

  return (
    <div className={`container-fluid p-0 position-relative ${animateBg ? 'animate-bg' : ''}`}>
      <div className="wave-bg"></div>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className={`card p-4 animate__animated ${!isLoading && 'animate__fadeIn'}`}>
          <div id="season">
            {LeavesVisible ? (
              <div id="leaves">
                {generateRandomLeaves(20)}
              </div>
            ) : DropsVisible ? (
              <div id="drops">
                {generateRandomDrop()}
              </div>
            ) : SnowVisible ? (
              <div id="snow">
                {generateRandomSnow()}
              </div>
            ) : null}
          </div>
          <div className="card-content">
            <h1> </h1>
            </div>
          <div className="card-body">
            <h1 className="card-title text-center mb-4"> </h1>
            <div className="input-group mb-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="form-control mt-3"
              />
              <div className="input-group-append">
                <button className="btn btn-primary mt-3" type="button" onClick={handleSearch}>Search</button>
              </div>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : weatherData ? (
              <div>
                <h2 className="mb-4">In {weatherData.name}</h2>
                <p className="mb-1">Temperature: {weatherData.main.temp}K</p>
                <p className="mb-1">Min Temperature: {weatherData.main.temp_min}K</p>
                <p className="mb-1">Max Temperature: {weatherData.main.temp_max}K</p>
                <p className="mb-1">Weather: {weatherData.weather[0].description}</p>
                <p className="mb-1">Today's Date: {getTodayDate()}</p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default WeatherApp;
