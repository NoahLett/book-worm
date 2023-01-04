import React from 'react';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg',
      title: '',
      isbn: '',
      comments: '',
      postType: 'sale'
    };
    this.fileInputRef = React.createRef();
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1 className='text-center my-5'>Create or Edit your Post!</h1>
        <div className='d-flex justify-content-center align-items-center my-5'>
          <div className='col-3 mx-5'>
            <img className='w-100 h-100' src={this.state.image} alt="post-image" />
          </div>
          <div className='col-5 bg-light my-5'>
            <form className='post-form' onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <label htmlFor="title" className='form-label'>Title</label>
                  <input
                required
                autoFocus
                id='title'
                name='title'
                type="text"
                onChange={this.handleChange}
                className="form-control w-50" />
                </div>
                <div>
                  <label htmlFor="isbn" className='form-label'>ISBN</label>
                  <input
                  required
                  type="text"
                  name="isbn"
                  id="isbn"
                  onChange={this.handleChange}
                  className="form-control w-50" />
                </div>
                <div>
                  <label htmlFor="comments" className='form-label'>Comments</label>
                  <textarea
                  required
                  name="comments"
                  id="comments"
                  maxLength="225"
                  onChange={this.handleChange}
                  className="form-control w-75" />
                </div>
                <div className='input-group d-flex justify-content-around w-50'>
                  <div>
                    <label htmlFor="sale" className='form-label'>For Sale</label>
                    <input
                  defaultChecked
                  value='sale'
                  name='postType'
                  id='postType'
                  onChange={this.handleChange}
                  type="radio"
                  className='form-check-input' />
                  </div>
                  <div>
                    <label htmlFor="want" className='form-label'>Wanted</label>
                    <input
                    value='want'
                    name="postType"
                    id="postType"
                    onChange={this.handleChange}
                    type="radio"
                    className='form-check-input' />
                  </div>
                </div>
                <div>
                  <label htmlFor="image-upload" className='form-label'>Image Upload</label>
                  <input
                  required
                  type="file"
                  name='image'
                  ref={this.fileInputRef}
                  accept=".png, .jpg, .jpeg" />
                </div>
                <div className='d-flex justify-content-end m-3'>
                  <button type='submit' className='btn btn-outline-info'>Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
