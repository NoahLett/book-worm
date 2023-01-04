import React from 'react';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: '',
      isbn: '',
      comments: '',
      postType: 'sale',
      trading: 'false'
    };
    // this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div>
          <form className='post-form' onSubmit={this.handleSubmit}>
            <div className='col-3'>
              <div>
                <img src={this.state.image} alt="post-image" />
              </div>
            </div>
            <div className='col-6'>
              <div>
                <label htmlFor="title" className='form-label'>Title</label>
                <input
                required
                autoFocus
                id='title'
                name='title'
                type="text"
                onChange={this.handleChange}
                className="form-control" />
              </div>
              <div>
                <label htmlFor="isbn" className='form-label'>ISBN</label>
                <input
                  required
                  type="text"
                  name="isbn"
                  id="isbn"
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div>
                <label htmlFor="comments" className='form-label'>Comments</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
