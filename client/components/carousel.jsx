import React from 'react';
import dataSets from '../lib/carousel-data';

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
    // this.automatedSwap = this.automatedSwap.bind(this);
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
    // this.automatedSwap();
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
    // this.automatedSwap();
  }

  viewJump(event) {
    this.setState({ viewIndex: Number(event.target.id) });
    clearInterval(this.swapper);
    // this.automatedSwap();
  }

  infiniteScroll() {
    if (this.state.viewIndex === dataSets.length - 1) {
      this.setState({ viewIndex: 0 });
    } else {
      this.setState({ viewIndex: this.state.viewIndex + 1 });
    }
  }

  // automatedSwap() {
  //   this.swapper = setInterval(this.infiniteScroll, 3000);
  // }

  render() {
    return (
      <div className='carousel-box w-75 pt-5 pb-3 w-100'>
        <div className='row d-flex flex-wrap justify-content-center'>
          <div className='col-md-3 d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-chevron-left fs-1" onClick={this.handleLeft} />
          </div>
          <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <img className='carousel-image' src={dataSets[this.state.viewIndex].imageUrl} alt="Carousel Image" />
            <h6 className='py-3'>{dataSets[this.state.viewIndex].text}</h6>
          </div>
          <div className='col-md-3 d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-chevron-right fs-1" onClick={this.handleRight} />
          </div>
          <div className='d-flex flex-wrap justify-content-center'>
            <span className='circles'>
              <i id='0' key={0} className={this.state.viewIndex === 0 ? 'fa-solid fa-circle px-1 fs-5' : 'fa-regular fa-circle px-1 fs-5'} onClick={this.viewJump}/>
              <i id='1' key={1} className={this.state.viewIndex === 1 ? 'fa-solid fa-circle px-1 fs-5' : 'fa-regular fa-circle px-1 fs-5'} onClick={this.viewJump} />
              <i id='2' key={2} className={this.state.viewIndex === 2 ? 'fa-solid fa-circle px-1 fs-5' : 'fa-regular fa-circle px-1 fs-5'} onClick={this.viewJump} />
            </span>
          </div>
        </div>
      </div>
    );
  }

}
