import React from 'react';
import AppContext from '../lib/app-context';
import UserModal from '../components/user-modal';
import Home from './home';

const styles = {
  postImage: {
    width: '20rem',
    height: '20rem',
    objectFit: 'cover'
  },
  postBox: {
    borderRadius: '0.75rem',
    border: '1px solid lightgray',
    backgroundColor: '#f1f3f5'
  },
  header: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold'
  }
};

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg',
      title: '',
      isbn: '',
      comments: '',
      postType: 'sale'
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInputChange = this.fileInputChange.bind(this);
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
    if (this.state.postType === 'want') {
      event.preventDefault();
      const { user } = this.context;
      const formData = new FormData();
      formData.append('image', this.fileInputRef.current.files[0]);
      formData.append('title', this.state.title);
      formData.append('isbn', this.state.isbn);
      formData.append('comments', this.state.comments);
      formData.append('userId', user.userId);
      formData.append('city', user.city);
      formData.append('state', user.state);
      fetch('/api/auth/wanted-post', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ title: '' });
          this.setState({ isbn: '' });
          this.setState({ comments: '' });
          this.setState({ postType: 'sale' });
        })
        .catch(err => console.error(err))
        .then(window.location.hash = '#wanted');
    } else if (this.state.postType === 'sale') {
      event.preventDefault();
      const { user } = this.context;
      const formData = new FormData();
      formData.append('image', this.fileInputRef.current.files[0]);
      formData.append('title', this.state.title);
      formData.append('isbn', this.state.isbn);
      formData.append('comments', this.state.comments);
      formData.append('userId', user.userId);
      formData.append('city', user.city);
      formData.append('state', user.state);
      fetch('/api/auth/sale-post', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ title: '' });
          this.setState({ isbn: '' });
          this.setState({ comments: '' });
          this.setState({ postType: 'sale' });
        })
        .catch(err => console.error(err))
        .then(window.location.hash = '#for-sale');
    }
  }

  render() {
    const { user } = this.context;
    if (!user) {
      return (
        <div>
          <Home/>
          <UserModal/>
        </div>
      );
    }
    return (
      <div className='container d-flex flex-column justify-content-center align-items-center'>
        <div className='w-100'>
          <h1 className='text-center mt-5' style={styles.header}>Create your Post!</h1>
          <hr />
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center m-1 shadow-lg' style={styles.postBox}>
          <div className='m-4'>
            <img className='border border-secondary rounded-3' src={this.state.image} alt="post-image" style={styles.postImage} />
          </div>
          <div>
            <form className='post-form m-4' onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <label htmlFor="title" className='form-label mt-2'>Title</label>
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
                  <label htmlFor="isbn" className='form-label mt-2'>ISBN (i.e.: xxx-x-xx-xxxxxx-x)</label>
                  <input
                  required
                  type="text"
                  name="isbn"
                  id="isbn"
                  onChange={this.handleChange}
                  className="form-control" />
                </div>
                <div>
                  <label htmlFor="comments" className='form-label mt-2'>Comments</label>
                  <textarea
                  required
                  name="comments"
                  id="comments"
                  maxLength="225"
                  onChange={this.handleChange}
                  className="form-control" />
                </div>
                <div className='input-group d-flex justify-content-around my-4'>
                  <div>
                    <label htmlFor="sale" className='form-label me-2'>For Sale</label>
                    <input
                  value='sale'
                  name='postType'
                  id='postType'
                  onChange={this.handleChange}
                  type="radio"
                  className='form-check-input' />
                  </div>
                  <div>
                    <label htmlFor="want" className='form-label me-2'>Wanted</label>
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
                  <div>
                    <label htmlFor="image-upload" className='form-label'>Image Upload</label>
                  </div>
                  <input
                  required
                  type="file"
                  name='image'
                  ref={this.fileInputRef}
                  onChange={this.fileInputChange}
                  accept=".png, .jpg, .jpeg" />
                </div>
                <div className='d-flex justify-content-end mt-3'>
                  <button type='submit' className='btn btn-outline-info'>Submit Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
PostForm.contextType = AppContext;
