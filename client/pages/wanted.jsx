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
    cursor: 'pointer'
  }
};

export default class Wanted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wants: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/auth/wants')
      .then(res => res.json())
      .then(wants => this.setState({ wants }));
  }

  handleClick(event) {
    const { transferWantId } = this.context;
    if (event.target.className === 'fa-solid fa-trash fs-5 mx-2') {
      fetch(`/api/auth/delete/wants/${event.target.id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(window.location.reload(false));
    } else if (event.target.className === 'fa-solid fa-pencil fs-5 mx-2') {
      transferWantId(event.target.id);
    }
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
                <Want id={this.id} onClick={this.handleClick} want={want}/>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    );
  }
}
Wanted.contextType = AppContext;

class Want extends React.Component {

  render() {
    const { user } = this.context;
    const { userId, wantId, wantTitle, wantPhotoFile, wantContent, isbn, city, state } = this.props.want;
    if (!user) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={wantPhotoFile} alt={wantTitle} style={styles.image} />
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
    } else if (user.userId !== userId) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={wantPhotoFile} alt={wantTitle} style={styles.image} />
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
    } else if (user.userId === userId) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={wantPhotoFile} alt={wantTitle} style={styles.image} />
          <div className='card-body'>
            <div className='d-flex justify-content-end my-1'>
              <i className="fa-solid fa-pencil fs-5 mx-2" onClick={this.props.onClick} id={wantId} style={styles.icons} />
              <i className='fa-solid fa-trash fs-5 mx-2' onClick={this.props.onClick} style={styles.icons} id={wantId}/>
            </div>
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
  }
}
Want.contextType = AppContext;
