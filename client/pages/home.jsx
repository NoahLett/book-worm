import React from 'react';
import Carousel from '../components/carousel';

export default function Home(props) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='d-flex w-75'>
        <div className='home-header-box d-flex justify-content-start align-items-center col'>
          <h1 className='home-header'>Tired of burning your cash on overpriced textbooks?</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center col w-100'>
          <Carousel />
        </div>
      </div>
      <div className='quote w-100'>
        <div className='d-flex justify-content-center'>
          <h2><q>We need the best education system in the United States. The best system, not the most expensive.</q></h2>
        </div>
        <div className='d-flex justify-content-center'>
          <h2>-Bruce Brown</h2>
        </div>
      </div>
    </div>
  );
}
