import React, { useState } from 'react';
import '../styles/AddPost.css';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch, FormControlLabel, IconButton } from '@mui/material';
import { ArrowBack, Lock, Public } from '@mui/icons-material';
import { apiFetch } from '../api';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useParams();
  const hist = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    apiFetch('/add_post', {
      method: 'POST',
      body: { title, body, private: isPrivate }
    }).then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          console.log('Error:', err.message);
          setLoading(false);
        });
      } else {
        hist.push(`/dashboard/${user}`);
      }
    }).catch(e => {
      console.error('Post error:', e);
      setLoading(false);
    });
  };

  return (
    <div className="add-post-page page-enter">
      <div className="add-post-header">
        <IconButton className="back-btn" onClick={() => hist.goBack()}>
          <ArrowBack />
        </IconButton>
        <h2>Create New Post</h2>
      </div>

      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Give your post a compelling title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <span className="char-count">{title.length} characters</span>
        </div>

        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            placeholder="Start writing your thoughts..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <span className="char-count">{body.length} characters</span>
        </div>

        <div className="form-group privacy-toggle">
          <div className="privacy-label">
            {isPrivate ? <Lock fontSize="small" /> : <Public fontSize="small" />}
            <span>Post visibility</span>
          </div>
          <FormControlLabel
            control={<Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />}
            label={isPrivate ? 'Private' : 'Public'}
            className="privacy-switch"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => hist.goBack()}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading || !title.trim() || !body.trim()}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
