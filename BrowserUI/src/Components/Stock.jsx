import React, { useEffect, useState } from 'react'
import './Stock.css'
import cloud from '../assets/cloud.png'

const Stock = () => {

  const [data, setData] = useState('');
  const [data2, setData2] = useState('');
  const [] = useState('')

  useEffect(() => {
    const fetchData = async (c) => {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${import.meta.env.VITE_MARKETID}`);
        const dailyresponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=${import.meta.env.VITE_MARKETID}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const result_2 = await dailyresponse.json();
        console.log(result_2)

        const timeSeries = result_2["Time Series (Daily)"]

        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));

        // Get the latest date
        const latestDate = dates[0];
        const latestData = timeSeries[latestDate];

        console.log("Latest Date:", latestDate);
        console.log("Latest Data:", latestData);

        // console.log(result) 

        setData({
          marketRegion: result.markets[8].region,
          marketType: result.markets[8].market_type,
          marketStatus: result.markets[8].current_status,
          marketDate: latestDate,
          open: latestData["1. open"]
        })

        setData2({
          presentTime: result_2["Time Series (Daily)"]
        })
        console.log(data2)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, []);

  return (
    <div className='stockdivs'>

      <div className='div1'>
        <h1>{data.marketRegion}</h1>
        <div className="txt">
          <h3>{data.marketType} - {data.marketStatus}</h3>
          <p>{data.marketDate}</p>
        </div>
        <div className="txt">
          <h3>Open - {data.open}</h3>
          <h3>Close - {data.close}</h3>
        </div>
      </div>

      <div className='div2'>

        <div className="one">
          <div>
            <img src={cloud} alt="" />
            <h2>Cname</h2>
            <h3>High</h3>
            <h3>Low</h3>
          </div>
          <div>
            <img src={cloud} alt="" />
          </div>
        </div>

        <div className="two">
          <div>
            <img src={cloud} alt="" />
          </div>
          <div>
            <img src={cloud} alt="" />
          </div>
        </div>

      </div>

      <div className='div1'>
        <h1>{data.marketRegion}</h1>
        <div className="txt">
          <h3>{data.marketType} - {data.marketStatus}</h3>
          <p>{data.marketDate}</p>
        </div>
        <div className="txt">
          <h3>Open - {data.open}</h3>
          <h3>Close - {data.close}</h3>
        </div>
      </div>
    </div>
  )
}

export default Stock