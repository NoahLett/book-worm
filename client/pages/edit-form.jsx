import React from 'react';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: '',
      isbn: '',
      comments: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInputChange = this.fileInputChange.bind(this);
  }

  componentDidMount() {
    const urlArray = window.location.href.split('/');
    const postId = urlArray[5];
    const type = urlArray[4];
    if (type === 'sale') {
      fetch(`/api/auth/edit/sale/${postId}`)
        .then(res => res.json())
        .then(post => {
          this.setState({ image: post.salePhotoFile });
          this.setState({ title: post.saleTitle });
          this.setState({ isbn: post.isbn });
          this.setState({ comments: post.saleContent });
        });
    } else if (type === 'want') {
      fetch(`/api/auth/edit/want/${postId}`)
        .then(res => res.json())
        .then(post => {
          this.setState({ image: post.wantPhotoFile });
          this.setState({ title: post.wantTitle });
          this.setState({ isbn: post.isbn });
          this.setState({ comments: post.wantContent });
        });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  fileInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: event.target.result });
    };
    reader.readAsDataURL(file);
  }

  handleSubmit(event) {

  }

  render() {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-center my-5'>Edit your Post!</h1>
        <div className='d-flex justify-content-around align-items-center bg-light rounded-3 w-50'>
          <div className='col-3 mx-4'>
            <img className='post-image border border-secondary rounded-3' src={this.state.image} alt="post-image" />
          </div>
          <div className='col-6 my-3'>
            <form className='post-form m-4' onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <label htmlFor="title" className='form-label mt-2'>Title</label>
                  <input
                    required
                    value={this.state.title}
                    autoFocus
                    id='title'
                    name='title'
                    type="text"
                    onChange={this.handleChange}
                    className="form-control w-75" />
                </div>
                <div>
                  <label htmlFor="isbn" className='form-label mt-2'>ISBN (i.e.: xxx-x-xx-xxxxxx-x)</label>
                  <input
                    required
                    value={this.state.isbn}
                    type="text"
                    name="isbn"
                    id="isbn"
                    onChange={this.handleChange}
                    className="form-control w-75" />
                </div>
                <div>
                  <label htmlFor="comments" className='form-label mt-2'>Comments</label>
                  <textarea
                    required
                    value={this.state.comments}
                    name="comments"
                    id="comments"
                    maxLength="225"
                    onChange={this.handleChange}
                    className="form-control w-100" />
                </div>
                <div>
                  <div className='mt-3'>
                    <label htmlFor="image-upload" className='form-label'>Image Upload</label>
                  </div>
                  <input
                    required
                    type="file"
                    name='image'
                    ref={this.fileInputRef}
                    onChange={this.fileInputChanges}
                    accept=".png, .jpg, .jpeg" />
                </div>
                <div className='d-flex justify-content-end w-100'>
                  <button type='submit' className='btn btn-outline-info'>Update Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
