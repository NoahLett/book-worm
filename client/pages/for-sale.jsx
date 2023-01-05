import React from 'react';

export default class ForSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };
  }

  componentDidMount() {
    fetch('/api/auth/sales')
      .then(res => res.json())
      .then(sales => this.setState({ sales }));
  }

  render() {
    return (
      <div className='container'>
        <h1>Books for Sale and Trade</h1>
        <hr/>
        <div className='row'>
          {
            this.state.sales.map(sale => (
              <div key={sale.saleId} className="col-12 col-md-6 col-lg-4">
                <Sale sale={sale}/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function Sale(props) {
  const { saleTitle, salePhotoFile, saleContent, isbn, city, state } = props.sale;
  return (
    <div className='card mb-4 shadow-sm'>
      <img src={salePhotoFile} alt={saleTitle} />
      <div className='card-body'>
        <h5 className='card-title'>{saleTitle}</h5>
        <h6 className='card-text text-secondary'>{isbn}</h6>
        <div className='content-box'>
          <p className='content-text'>{saleContent}</p>
        </div>
        <p className='card-text text-secondary'>{`${city}, ${state}`}</p>
      </div>
    </div>
  );
}
