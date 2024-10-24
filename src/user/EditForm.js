import React, { useState } from 'react';
import '../styles/EditForm.css'; // Import the CSS for styling
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardNavbar from './DashboardNavbar';

const EditForm = () => {
    const location = useLocation();
    const {blog} = location.state;

    const [title, setTitle] = useState(blog.title || '');
    const [body, setBody] = useState(blog.body || '');
    const hist = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assuming handleUpdate is a function that handles the API update logic
        //handleUpdate({ ...blog, title, body });

        const postData = {
            title,
            body
          };
      
          fetch('/edit_post/'+blog._id, {
            method: 'PUT',
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
                    console.log('Post updated');
                    hist.push(`/dashboard/${blog.author}`); // Redirect to dashboard
                });
            }
        }).catch(e => {
            console.error('Post error:', e);
        });
      
          // Add your fetch logic to send postData to the server here
          console.log('Post data submitted:', postData);
          
    };

    return (
        <div>
            <DashboardNavbar />
        <div className="edit-form-container">
            <h2 className="edit-form-header">Edit Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="edit-form-group">
                    <label className="edit-form-label" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="edit-form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label" htmlFor="body">Body</label>
                    <textarea
                        id="body"
                        className="edit-form-textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="edit-form-actions">
                    <button type="submit" className="edit-form-button">Save Changes</button>
                    
                </div>
            </form>
        </div>
        </div>
    );
};

export default EditForm;
