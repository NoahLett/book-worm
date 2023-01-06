import React from 'react';

const styles = {
  image: {
    height: '280px',
    objectFit: 'contain'
  },
  textBox: {
    backgroundColor: '#0096c7',
    borderRadius: '10px'
  }
};

export default class Wanted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wants: []
    };
  }

  componentDidMount() {
    fetch('/api/auth/wants')
      .then(res => res.json())
      .then(wants => this.setState({ wants }));
  }

  render() {
    return (
      <div className='container py-4'>
        <h1>Wanted Books</h1>
        <hr />
        <div className='container bg-light p-4 rounded-3'>
          <div className='row'>
            {
            this.state.wants.map(want => (
              <div key={want.wantId} className="col-12 col-md-6 col-lg-4">
                <Want want={want}/>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    );
  }
}

function Want(props) {
  const { wantTitle, wantPhotoFile, wantContent, isbn, city, state } = props.want;
  return (
    <div className='card mb-4 shadow-sm'>
      <img className='card-img-top py-3 bg-secondary' src={wantPhotoFile} alt={wantTitle} style={styles.image}/>
      <div className='card-body'>
        <h5 className='card-title'>{wantTitle}</h5>
        <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
        <div style={styles.textBox}>
          <p className='text-white p-3'>{wantContent}</p>
        </div>
        <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
      </div>
    </div>
  );
}
