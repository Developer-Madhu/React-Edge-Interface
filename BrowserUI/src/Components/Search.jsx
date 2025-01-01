import React, { useEffect, useState } from 'react'
import './Search.css'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import google from '../assets/google.png'
import notion from '../assets/notion.png'
import indmoney from '../assets/indmoney.jpg'
import groww from '../assets/groww.png'
import netflix from '../assets/netflix.png'
import irctc from '../assets/irctc.png'
import tablogo from '../assets/tablogo.png'
import replit from '../assets/replit.png'
import drive from '../assets/drive.png'
import youtube from '../assets/youtube.png'
import chatgpt from '../assets/chatgpt.jpg'
import gemini from '../assets/gemini.jpeg'
import udemy from '../assets/udemy.jpeg'
import gmail from '../assets/gmail.png'
import github from '../assets/github.png'
import meet from '../assets/meet.png'
import gamma from '../assets/gamma.png'
import w3 from '../assets/w3.png'
import linkedin from '../assets/linkedin.png'
import google2 from '../assets/google2.png'
import spotify from '../assets/spotify.png'

const Search = () => {

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear, "01n": clear,
    "02d": cloud, "02n": cloud,
    "03d": cloud, "03n": cloud,
    "04d": drizzle, "04n": drizzle,
    "09d": rain, "09n": rain,
    "10d": rain, "10n": rain,
    "13d": snow, "13n": snow
  }

  const search = async (city) => {
    if (city === "") {
      alert("Enter a valid city name")
    } else {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const repsonse = await fetch(url)
        const data = await repsonse.json();
        const icon = allIcons[data.weather[0].icon] || clear;
        setWeatherData({
          mainwth: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          desc: data.weather[0].description,
          temps: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        })
      } catch (error) {
        console.log("--")
      }
    }
  }
  useEffect(() => {
    search('Vijayawada')
  })

  const timeNow = new Date();
  var hours = timeNow.getHours()
  hours = hours % 12 || 12;
  const mins = timeNow.getMinutes()
  const secs = timeNow.getSeconds()
  const formattedTime = `${hours.toString().padStart(2, '0')} : ${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')} `;
  return (
    <div className='search'>

      <div className="cont">
        <img aria-label='Madhusudhan' className='imglogo' src={tablogo} alt="" />
        <div className="searchbox">
          <img src={google} alt="" />
          <form target='_blank' method='get' action="https://www.google.com/search">
            <input type="text" name='q' placeholder='Search Google' />
          </form>
        </div>

        <div className="displaytime">
          <h1>{formattedTime}</h1>
        </div>

        <div className="three">
          <div className='minione'>
            <div id='u1'>
              <a href='https://www.indmoney.com/dashboard' target='blank'><img id='i4' src={indmoney} alt="" /></a>
              <a href="https://groww.in/"><img id='i3' src={groww} alt="" /></a>
            </div>
            <div id='u2'>
              <a href="https://www.linkedin.com/feed/" target='blank'><img id='i4' src={linkedin} alt="" /></a>
              <a href="https://www.udemy.com/course/web-dev-master/" target='blank'><img id='i1' src={udemy} alt="" /></a>
            </div>
          </div>
          <div className='minione'>
            <div id='u1'>
              <a href="https://www.google.com/" target='blank'><img id='i4' src={google} alt="" /></a>
              <a href="https://mail.google.com/mail/u/0/#inbox" target='blank'><img id='i3' src={gmail} alt="" /></a>
            </div>
            <div id='u2'>
              <a href="https://meet.google.com" target='blank'><img id='i2' src={meet} alt="" /></a>
              <a href="https://drive.google.com/drive/home" target='blank'><img id='i1' src={drive} alt="" /></a>
            </div>
          </div>
          <div className='minione'>
            <div id='u1'>
              <a href="https://chatgpt.com" target='blank'><img id='i4' src={chatgpt} alt="" /></a>
              <a href="https:/gemini.google.com" target='blank'><img id='i4' src={gemini} alt="" /></a>
            </div>
            <div id='u2'>
              <a href="https://www.notion.com/" target='blank'><img src={notion} alt="" /></a>
              <a href="https://gamma.app/"><img src={gamma} alt="" /></a>
            </div>
          </div>
        </div>

      </div>

      <div className="links">
        <br />
        <div className="weather">
          <div className="icon-status">
            <img className='weather-icon' src={weatherData.icon} alt="" />
          </div>
          <div className="details">
            <h1>{weatherData.location}</h1>
            <br />
            <p><span>Today</span> : {weatherData.mainwth}</p>
            <p><span>Temperature</span> : {weatherData.temps}°C</p>
            <p><span>Wind Speed</span> : {weatherData.windSpeed}</p>
            <p><span>Info</span> : {weatherData.desc}</p>
          </div>
        </div>

        <br />

        <div className="sublinks">

          <div className='cont1'>
            <div>
              <img src={google2} alt="" />
            </div>
            <div>
              <img src={irctc} alt="" />
            </div>
            <div>
              <img src={youtube} alt="" />
            </div>
            <div>
              <img src={netflix} alt="" />
            </div>
          </div>

          <div className='cont1'>
            <div>
              <img src={github} alt="" />
            </div>
            <div>
              <img src={spotify} alt="" />
            </div>
            <div>
              <img src={replit} alt="" />
            </div>
            <div>
              <img src={w3} alt="" />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Search