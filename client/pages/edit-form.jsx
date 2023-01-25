import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  editBox: {
    borderRadius: '0.75rem'
  },
  postImage: {
    width: '20rem',
    height: '20rem',
    objectFit: 'cover'
  },
  header: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold'
  }
};

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
    const urlArray = window.location.href.split('/');
    const postId = urlArray[5];
    const type = urlArray[4];
    if (type === 'sale') {
      event.preventDefault();
      const formData = new FormData();
      formData.append('image', this.fileInputRef.current.files[0]);
      formData.append('title', this.state.title);
      formData.append('isbn', this.state.isbn);
      formData.append('comments', this.state.comments);
      fetch(`/api/auth/update-sale-post/${postId}`, {
        method: 'PUT',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ title: '' });
          this.setState({ isbn: '' });
          this.setState({ comments: '' });
        })
        .catch(err => console.error(err));
      window.location.hash = '#for-sale';
    } else if (type === 'want') {
      event.preventDefault();
      const formData = new FormData();
      formData.append('image', this.fileInputRef.current.files[0]);
      formData.append('title', this.state.title);
      formData.append('isbn', this.state.isbn);
      formData.append('comments', this.state.comments);
      fetch(`/api/auth/update-wanted-post/${postId}`, {
        method: 'PUT',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ title: '' });
          this.setState({ isbn: '' });
          this.setState({ comments: '' });
        })
        .catch(err => console.error(err));
      window.location.hash = '#wanted';
    }
    window.location.reload();
  }

  render() {
    return (
      <div className='container d-flex flex-column justify-content-center align-items-center'>
        <div className='w-100'>
          <h1 className='text-center mt-5' style={styles.header}>Edit your Post!</h1>
          <hr />
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center bg-secondary m-1 shadow-lg' style={styles.editBox}>
          <div className='m-4'>
            <img className='post-image border border-secondary rounded-3' src={this.state.image} alt="post-image" style={styles.postImage} />
          </div>
          <div>
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
                    className="form-control" />
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
                    className="form-control" />
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
                    className="form-control" />
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
                    onChange={this.fileInputChange}
                    accept=".png, .jpg, .jpeg" />
                </div>
                <div className='d-flex justify-content-end mt-3'>
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
EditForm.contextType = AppContext;
