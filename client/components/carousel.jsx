import React from 'react';
import dataSets from '../lib/carousel-data';

const styles = {
  carouselBox: {
    maxWidth: '40rem',
    border: '2px solid darkgray',
    borderRadius: '10px'
  },
  carouselImage: {
    width: '100%',
    height: '15rem',
    objectFit: 'cover',
    border: '1px solid darkgray',
    borderRadius: '10px'
  },
  clicker: {
    cursor: 'pointer',
    color: 'darkslategray'
  }
};

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewIndex: 0
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.viewJump = this.viewJump.bind(this);
    this.infiniteScroll = this.infiniteScroll.bind(this);
    this.automatedSwap = this.automatedSwap.bind(this);
  }

  componentDidMount() {
    this.swapper = setInterval(this.infiniteScroll, 5000);
  }

  handleLeft() {
    for (let i = 0; i < dataSets.length; i++) {
      if (this.state.viewIndex === 0) {
        this.setState({ viewIndex: dataSets.length - 1 });
      } else {
        this.setState({ viewIndex: this.state.viewIndex - 1 });
      }
    }
    clearInterval(this.swapper);
    this.automatedSwap();
  }

  handleRight() {
    for (let i = 0; i < dataSets.length; i++) {
      if (this.state.viewIndex === dataSets.length - 1) {
        this.setState({ viewIndex: 0 });
      } else {
        this.setState({ viewIndex: this.state.viewIndex + 1 });
      }
    }
    clearInterval(this.swapper);
    this.automatedSwap();
  }

  viewJump(event) {
    this.setState({ viewIndex: Number(event.target.id) });
    clearInterval(this.swapper);
    this.automatedSwap();
  }

  infiniteScroll() {
    if (this.state.viewIndex === dataSets.length - 1) {
      this.setState({ viewIndex: 0 });
    } else {
      this.setState({ viewIndex: this.state.viewIndex + 1 });
    }
  }

  automatedSwap() {
    this.swapper = setInterval(this.infiniteScroll, 5000);
  }

  render() {
    return (
      <div className='container' style={styles.carouselBox}>
        <div className='d-flex justify-content-center'>
          <div className='col-sm-1 d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-chevron-left fs-1" onClick={this.handleLeft} style={styles.clicker} />
          </div>
          <div>
            <div className='p-3 d-flex justify-content-center'>
              <img style={styles.carouselImage} src={dataSets[this.state.viewIndex].imageUrl} alt="Carousel Image" />
            </div>
            <div className='container d-flex justify-content-center'>
              <h6 className=' text-center py-3'>{dataSets[this.state.viewIndex].text}</h6>
            </div>
          </div>
          <div className='col-sm-1 d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-chevron-right fs-1" onClick={this.handleRight} style={styles.clicker} />
          </div>
        </div>
        <div className='container d-flex justify-content-center mb-2'>
          <span className='circles' style={styles.clicker}>
            <i id='0' key={0} className={this.state.viewIndex === 0 ? 'fa-solid fa-circle px-1 fs-5' : 'fa-regular fa-circle px-1 fs-5'} onClick={this.viewJump} />
            <i id='1' key={1} className={this.state.viewIndex === 1 ? 'fa-solid fa-circle px-1 fs-5' : 'fa-regular fa-circle px-1 fs-5'} onClick={this.viewJump} />
            <i id='2' key={2} className={this.state.viewIndex === 2 ? 'fa-solid fa-circle px-1 fs-5' : 'fa-regular fa-circle px-1 fs-5'} onClick={this.viewJump} />
          </span>
        </div>
      </div>
    );
  }

}
