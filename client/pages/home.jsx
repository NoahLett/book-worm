import React from 'react';

export default function Home(props) {
  return (
    <div>
      <div className='d-flex'>
        <div className='home-header-box d-flex justify-content-start align-items-center'>
          <h1 className='home-header'>Tired of buring your cash on overpriced textbooks?</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <h1>show</h1>
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
