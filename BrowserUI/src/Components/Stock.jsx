import React, { useEffect, useState } from 'react'
import './Stock.css'
import cloud from '../assets/cloud.png'

const Stock = () => {

  const [data, setData] = useState('');
  const [data2, setData2] = useState('');
  const [us, setUs] = useState('')

  useEffect(() => {
    const fetchData = async (c) => {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${import.meta.env.VITE_MARKETID}`);
        const dailyresponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=${import.meta.env.VITE_MARKETID}`)
        const overview = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${import.meta.env.VITE_MARKETID}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const result_2 = await dailyresponse.json();
        const result_3 = await overview.json();
        // console.log(result_3)
        // console.log(result_2)

        const timeSeries = result_2["Time Series (Daily)"]

        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));

        const latestDate = dates[0];
        const latestData = timeSeries[latestDate];
        const openval = latestData["1. open"]
        const closeval = latestData["4. close"]

        console.log(result)

        setData({
          marketRegion: result.markets[8].region,
          marketreg2: result.markets[0].region,
          marketType: result.markets[8].market_type,
          marketStatus: result.markets[8].current_status,
          marketStatus2: result.markets[0].current_status,
          primaryExchange: result.markets[0].primary_exchanges,
          marketDate: latestDate,
          open: Math.round(openval),
          close: Math.round(closeval)
        })
        setData2({
          presentTime: result_2["Time Series (Daily)"]
        })
        // console.log(data2)

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
          <h3><span id='type'>{data.marketType}</span> - {data.marketStatus}</h3>
          <p id='date'>{data.marketDate}</p>
        </div>
        <div className="txt">
          <h3><span>Open</span> - {data.open}</h3>
          <h3><span>Close</span> - {data.close}</h3>
        </div>
      </div>

      <div className='div2'>

        <div className="one">
          <div>
            <h2>Cname</h2>
            <h3>High</h3>
            <h3>Low</h3>
          </div>
          <div>
          <h2>Cname</h2>
            <h3>High</h3>
            <h3>Low</h3>
          </div>
        </div>

        <div className="one">
          <div>
          <h2>Cname</h2>
            <h3>High</h3>
            <h3>Low</h3>
          </div>
          <div>
          <h2>Cname</h2>
            <h3>High</h3>
            <h3>Low</h3>
          </div>
        </div>

      </div>

      <div className='div1'>
        <h1>{data.marketreg2}</h1>
        <div className="txt">
          <h3><span id='type'>{data.marketType}</span> - {data.marketStatus2}</h3>
          <p id='date'>{data.marketDate}</p>
        </div>
        <div className="txt">
          <h3><span>{data.primaryExchange}</span></h3>
        </div>
      </div>
    </div>
  )
}

export default Stock