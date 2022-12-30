import React from 'react';
import topics from '../lib/data';

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
      <div>
        <h1 className='faq-header text-center'>Frequently Asked Questions</h1>
        <div className='d-flex justify-content-center'>
          <div className='accordion'>
            {topics.map((topic, index) => {
              const handleClick = () => {
                this.setOpenTopic(index);
              };
              if (this.state.viewIndex === index) {
                return (
                  <div className='acc-container p-0' key={index}>
                    <div className='acc-item'>
                      <div className='acc-header-box d-flex align-items-center justify-content-between my-2 mx-0' onClick={handleClick}>
                        <h2 className='acc-header fs-4 my-3 mx-4'>{topic.title}</h2>
                        <i className="fa-solid fa-chevron-down pe-4" />
                      </div>
                      <div className='acc-text-box d-flex justify-content-center'>
                        <p className='acc-text fs-5 my-2 mx-4'>{topic.text}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className='acc-container p-0' key={index}>
                    <div className='acc-item'>
                      <div className='acc-header-box d-flex align-items-center justify-content-between my-2 mx-0' onClick={handleClick}>
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
