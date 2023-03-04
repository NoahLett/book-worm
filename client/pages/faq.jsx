import React from 'react';
import topics from '../lib/data';

const styles = {
  faq: {
    marginTop: '6rem'
  },
  faqHeader: {
    marginTop: '4rem',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold'
  },
  accordion: {
    marginTop: '4rem',
    width: '50rem',
    borderRadius: '20px'
  },
  accContainer: {
    width: '100%'
  },
  accHeaderBox: {
    border: '1px solid lightgray',
    borderRadius: '20px',
    margin: '1rem',
    cursor: 'pointer',
    backgroundColor: '#f1f3f5'
  },
  accTextBox: {
    border: '1px solid #0096c7',
    borderRadius: '20px'
  }
};

export default class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewIndex: null
    };
    this.setOpenTopic = this.setOpenTopic.bind(this);
  }

  setOpenTopic(index) {
    if (this.state.viewIndex !== index) {
      this.setState({ viewIndex: index });
    } else if (this.state.viewIndex === index) {
      this.setState({ viewIndex: null });
    }
  }

  render() {
    return (
      <div className='container' style={styles.faq}>
        <h1 className='text-center' style={styles.faqHeader}>Frequently Asked Questions</h1>
        <hr />
        <div className='d-flex justify-content-center'>
          <div className='mx-1' style={styles.accordion}>
            {topics.map((topic, index) => {
              const handleClick = () => {
                this.setOpenTopic(index);
              };
              if (this.state.viewIndex === index) {
                return (
                  <div className='acc-container p-0' style={styles.accContainer} key={index}>
                    <div className='acc-item'>
                      <div className='acc-header-box d-flex align-items-center justify-content-between my-2 mx-0 shadow-lg' style={styles.accHeaderBox} onClick={handleClick}>
                        <h2 className='acc-header fs-4 my-3 mx-4'>{topic.title}</h2>
                        <i className="fa-solid fa-chevron-down pe-4" />
                      </div>
                      <div className='acc-text-box d-flex justify-content-center' style={styles.accTextBox}>
                        <p className='acc-text fs-5 my-2 mx-4'>{topic.text}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className='acc-container p-0' style={styles.accContainer} key={index}>
                    <div className='acc-item'>
                      <div className='acc-header-box d-flex align-items-center justify-content-between my-2 mx-0 shadow-lg' style={styles.accHeaderBox} onClick={handleClick}>
                        <h2 className='acc-header fs-4 my-3 mx-4'>{topic.title}</h2>
                        <i className="fa-solid fa-chevron-up pe-4" />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
