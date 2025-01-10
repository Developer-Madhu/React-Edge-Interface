import React, { useEffect, useState } from 'react'
import './Stock.css'
import cloud from '../assets/cloud.png'

const Stock = () => {

  const [data, setData] = useState('');
  const [data2, setData2] = useState('');

  useEffect(() => {
    const fetchData = async () => {
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

        const timeSeries = result_2["Time Series (Daily)"]

        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));

        const latestDate = dates[0];
        const latestData = timeSeries[latestDate];

        setData({
          marketRegion: result.markets[8].region,
          exch: result.markets[8].primary_exchanges,
          marketreg2: result.markets[0].region,
          marketType: result.markets[8].market_type,
          marketStatus: result.markets[8].current_status,
          marketStatus2: result.markets[0].current_status,
          primaryExchange: result.markets[0].primary_exchanges,
          marketDate: latestDate,
          symbol: result_3.Symbol,
          high: result_3['52WeekHigh'],
          low: result_3['52WeekLow'],
          country: result_3.Country,
          currency: result_3.Currency,
          exchange: result_3.Exchange,
          pe:result_3.PERatio,
          cname:result_3.Name,
          sector:result_3.Sector,
          outshares:result_3.SharesOutstanding
        })
        setData2({
          presentTime: result_2["Time Series (Daily)"]
        })

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
          <h3>{data.exch}</h3>
        </div>
      </div>

      <div className='div2'>

        <div className="one">
          <div>
            <h2>{data.symbol}</h2>
            <h3>{data.high}</h3>
            <h3>{data.low}</h3>
          </div>
          <div>
            <h2>{data.country}</h2>
            <h3>{data.currency}</h3>
            <h3>{data.exchange}</h3>
          </div>
        </div>

        <div className="one">
          <div>
            <h2 id='cname'>{data.cname}</h2>  
          </div>
          <div class='dets'>
            <h2>{data.pe}</h2>
            <h3>{data.sector}</h3>
            <h3>{data.outshares}</h3>
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