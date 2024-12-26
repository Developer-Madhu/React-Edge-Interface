import React, { useEffect, useState } from 'react'
import './Stock.css'
import cloud from '../assets/cloud.png'

const Stock = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (c) => {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${import.meta.env.VITE_MARKETID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // var marketRegion = result.markets[8].region
        // var marketType = result.market[8].market_type
        // var marketStatus = result.market[8].current_status
        console.log(result)
        // console.log(marketRegion, marketType, marketStatus)
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='stockdivs'>
      <div className='div1'>
        <h1>{ }</h1>
      </div>
      <div className='div2'>
        <div className="one">
          <div>
            <img src={cloud} alt="" />
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
      <div className='div3'></div>
    </div>
  )
}

export default Stock