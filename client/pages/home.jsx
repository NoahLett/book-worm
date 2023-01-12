import React from 'react';
import Carousel from '../components/carousel';

const styles = {
  welcome: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '4rem',
    color: '#0096c7'
  },
  homeHeader: {
    color: 'darkslategray',
    fontSize: '2rem',
    fontFamily: 'Roboto, sans-serif'
  },
  quote: {
    fontFamily: 'Roboto, sans-serif',
    color: 'darkslategray'
  }
};

export default function Home(props) {
  return (
    <div className='container-fluid'>
      <h1 className='welcome mt-5 mb-4 text-center' style={styles.welcome}>Welcome to BookWorm!</h1>
      <div className='container'>
        <h1 className='home-header text-center mb-4' style={styles.homeHeader}>Tired of burning your cash on overpriced textbooks?</h1>
        <div className='container mb-5'>
          <Carousel/>
        </div>
      </div>
      <div style={styles.quote}>
        <div className='container'>
          <h3 className='text-center'><q>We need the best education system in the United States. The best system, not the most expensive.</q></h3>
        </div>
        <div className='container'>
          <h4 className='text-end me-4'>-Bruce Brown</h4>
        </div>
      </div>
    </div>
  );
}
