import React from 'react';
// import Carousel from '../components/carousel';
import './home.css';
import '../components/Button.css';
import { FaHandshake } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';

const styles = {
  home: {
    marginTop: '6rem'
  },
  button: {
    marginTop: '1rem'
  }
};

export default function Home(props) {
  return (
    <div style={styles.home}>
      <h1 className='header'>Welcome to BookWorm</h1>
      <div className="parallelogram-container">
        <div className="parallelogram">
          <FaHandshake className='handshake'/>
          <h4 className="sub-header">Have a textbook to sell?</h4>
          <button className="button-dark" href='#sign-up' style={styles.button}>Get Started</button>
        </div>
        <div className="parallelogram">
          <GiTakeMyMoney className='money'/>
          <h4 className="sub-header">Trying to save this year?</h4>
          <button className="button-dark" href='#for-sale' style={styles.button}>Search Deals</button>
        </div>
      </div>
    </div>
  );
}
