import { useState } from 'react'

import searchIcon from '../pngs/search.png'
import clearIcon from '../pngs/clear.png'
import cloudIcon from '../pngs/cloud.png'
import drizzleIcon from '../pngs/drizzle.png'
import rainIcon from '../pngs/rain.png'
import snowIcon from '../pngs/snow.png'
import windIcon from '../pngs/wind.png'
import humidityIcon from '../pngs/humidity.png'



import './WeatherApp.css'
const WeatherApp = ()=>{
    
    const [wicon,seticon] = useState("")

    let api_key = "847c50ce76faa39c92195aa151a59730"

    const search = async ()=>{
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "")
        {
            return 0 ;
        }
        else{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        
        let response = await fetch(url)
        let data = await response.json()
        
        const  humidity = document.getElementsByClassName("humidity_percent")
        const  wind = document.getElementsByClassName("wind_speed")
        const  temprature = document.getElementsByClassName("weather_temp")
        const  location = document.getElementsByClassName("weather_location")

        humidity[0].innerHTML = data.main.humidity+" %"
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h"
        temprature[0].innerHTML = Math.floor(data.main.temp)+" °C"
        location[0].innerHTML = data.name

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            seticon(clearIcon)
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            seticon(cloudIcon)
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            seticon(drizzleIcon)
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            seticon(rainIcon)
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            seticon(rainIcon)
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            seticon(snowIcon)
        }
        else {
            seticon(clearIcon)
        }

    }
    
    }


    return(
        <div  className='container'>
            <div className='topBar'>
                <input type='text'  className='cityInput' placeholder='Search'/>
                <div className='search_icon' onClick={()=>{search()}}>
                   <img src={searchIcon} alt='searchIcon' />
                </div>
                <div className='weather_icon'>
                    { <img src= {wicon} alt=''/>     }         
                </div>
                <div className='weather_temp'>0*C</div>
                <div className='weather_location'>location</div>
                


                <div className='data_container'>
                    <div className='element'>
                        <img src={humidityIcon} className='icon'alt='humidityIcon'/>
                        <div className='data'>
                            <div className='humidity_percent'>0%</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src={windIcon} className='icon' alt=''/>
                        <div className='data'>
                            <div className='wind_speed'>0 km/h</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>


                </div>




            </div>

        </div>
        )
}


export default WeatherApp






