import React from 'react';
import './home.css';
import '../components/Button.css';
import { FaHandshake } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';

const styles = {
  home: {
    marginTop: '7rem'
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
          <a href="#sign-up"><button className="button-dark" style={styles.button}>Get Started</button></a>
        </div>
        <div className="parallelogram">
          <GiTakeMyMoney className='money'/>
          <h4 className="sub-header">Trying to save this year?</h4>
          <a href="#for-sale"><button className="button-dark" style={styles.button}>Search Deals</button></a>
        </div>
      </div>
    </div>
  );
}
