import React, { useState } from 'react';
import '../styles/EditForm.css';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { apiFetch } from '../api';

const EditForm = () => {
    const location = useLocation();
    const { blog } = location.state;

    const [title, setTitle] = useState(blog.title || '');
    const [body, setBody] = useState(blog.body || '');
    const [loading, setLoading] = useState(false);
    const hist = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        apiFetch('/edit_post/' + blog._id, {
            method: 'PUT',
            body: { title, body }
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    console.log('Error:', err.message);
                    setLoading(false);
                });
            } else {
                hist.push(`/dashboard/${blog.author}`);
            }
        }).catch(e => {
            console.error('Post error:', e);
            setLoading(false);
        });
    };

    return (
        <div className="edit-post-page page-enter">
            <div className="edit-post-header">
                <IconButton className="back-btn" onClick={() => hist.goBack()}>
                    <ArrowBack />
                </IconButton>
                <h2>Edit Post</h2>
            </div>

            <form onSubmit={handleSubmit} className="edit-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
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
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                    <span className="char-count">{body.length} characters</span>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => hist.goBack()}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-submit" disabled={loading || !title.trim() || !body.trim()}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;
