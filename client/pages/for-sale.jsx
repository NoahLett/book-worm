import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
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
      sales: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/auth/sales')
      .then(res => res.json())
      .then(sales => this.setState({ sales }));
  }

  handleClick(event) {
    fetch(`/api/auth/delete/sales/${event.target.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(window.location.reload(false));
  }

  render() {
    return (
      <div className='container py-4'>
        <h1>Books for Sale and Trade</h1>
        <hr/>
        <div className='container bg-light p-4 rounded-3'>
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
              <a href='#edit-form'><i className="fa-solid fa-pencil fs-5 mx-2" style={styles.icons} /></a>
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
