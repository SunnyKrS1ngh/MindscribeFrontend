import React, { useState } from 'react';
import '../styles/AddPost.css'; // Make sure to create this CSS file for styling
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const {user} = useParams();

  const hist = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      body,
      private: isPrivate,
    };

    fetch('/add_post', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
  }).then(res => {
      console.log('Response status:', res.status); // Log status code
      if (!res.ok) {
          return res.json().then(err => {
              console.log('Error:', err.message); // Log the error message
          });
      } else {
          return res.json().then(data => {
              console.log('Post added');
              hist.push(`/dashboard/${user}`); // Redirect to dashboard
          });
      }
  }).catch(e => {
      console.error('Post error:', e);
  });

    // Add your fetch logic to send postData to the server here
    console.log('Post data submitted:', postData);
    // Reset form
    setTitle('');
    setBody('');
    setIsPrivate(false);
  };

  return (
    <div className="add-post-container">
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="form-group privacy-toggle">
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            Make this post private
          </label>
          {isPrivate&&<p>private</p>}
          {!isPrivate&&<p>Not Private</p>}
        </div>
        <button type="submit" className="submit-button">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
