import React from 'react';
import AppContext from '../lib/app-context';
import { Audio } from 'react-loader-spinner';

const styles = {
  sales: {
    marginTop: '5rem'
  },
  image: {
    height: '280px',
    objectFit: 'contain'
  },
  textBox: {
    backgroundColor: '#0096c7',
    borderRadius: '10px'
  },
  icons: {
    cursor: 'pointer',
    color: 'black'
  }
};

export default class ForSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      loading: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('/api/auth/sales')
        .then(res => res.json())
        .then(sales => {
          this.setState({ sales });
          this.setState({ loading: false });
        });
    }, 500);
  }

  handleClick(event) {
    const { transferSaleId } = this.context;
    if (event.target.className === 'fa-solid fa-trash fs-5 mx-2') {
      fetch(`/api/auth/delete/sales/${event.target.id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(window.location.reload(false));
    } else if (event.target.className === 'fa-solid fa-pencil fs-5 mx-2') {
      transferSaleId(event.target.id);
    }
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
          <Audio height="100" width="100" color='#0096C7' ariaLabel='audio-loading' wrapperStyle={{}} wrapperClass="wrapper-class" visible={true} />
        </div>
      );
    } else {
      return (
        <div className='container py-4' style={styles.sales}>
          <h1>Books for Sale and Trade</h1>
          <hr/>
          <div className='container bg-light p-4 rounded-3 shadow-lg'>
            <div className='row'>
              {
            this.state.sales.map(sale => (
              <div key={sale.saleId} className="col-12 col-md-6 col-lg-4">
                <Sale id={this.id} onClick={this.handleClick} sale={sale}/>
              </div>
            ))
          }
            </div>
          </div>
        </div>
      );
    }
  }
}
ForSale.contextType = AppContext;

class Sale extends React.Component {

  render() {
    const { user } = this.context;
    const { userId, saleId, saleTitle, salePhotoFile, saleContent, isbn, city, state } = this.props.sale;
    if (!user) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={salePhotoFile} alt={saleTitle} style={styles.image}/>
          <div className='card-body'>
            <h5 className='card-title'>{saleTitle}</h5>
            <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
            <div style={styles.textBox}>
              <p className='text-white p-3'>{saleContent}</p>
            </div>
            <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
          </div>
        </div>
      );
    } else if (user.userId !== userId) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={salePhotoFile} alt={saleTitle} style={styles.image} />
          <div className='card-body'>
            <h5 className='card-title'>{saleTitle}</h5>
            <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
            <div style={styles.textBox}>
              <p className='text-white p-3'>{saleContent}</p>
            </div>
            <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
          </div>
        </div>
      );
    } else if (user.userId === userId) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={salePhotoFile} alt={saleTitle} style={styles.image} />
          <div className='card-body'>
            <div className='d-flex justify-content-end'>
              <i className="fa-solid fa-pencil fs-5 mx-2" onClick={this.props.onClick} id={saleId} style={styles.icons} />
              <i className="fa-solid fa-trash fs-5 mx-2" onClick={this.props.onClick} style={styles.icons} id={saleId} />
            </div>
            <h5 className='card-title'>{saleTitle}</h5>
            <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
            <div style={styles.textBox}>
              <p className='text-white p-3'>{saleContent}</p>
            </div>
            <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
          </div>
        </div>
      );
    }
  }
}
Sale.contextType = AppContext;
