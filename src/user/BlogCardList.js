import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { LockOutlined, PublicOutlined } from '@mui/icons-material';
import '../styles/BlogCardList.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const truncate = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
};

const BlogCardList = ({ blogs, handleDelete, viewMode }) => {
    const hist = useHistory();

    const onCardClick = (id) => {
        hist.push('/blog/' + id);
    };

    const handleEdit = (blog, e) => {
        e.stopPropagation();
        hist.push({
            pathname: `/edit/${blog._id}`,
            state: { blog }
        });
    };

    const handleDeleteClick = (blogId, e) => {
        e.stopPropagation();
        handleDelete(blogId);
    };

    return (
        <div className="blog-card-list">
            {blogs.map((blog, index) => (
                <div className="blog-card" key={blog._id || index} onClick={() => onCardClick(blog._id)} style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="card-accent"></div>
                    <div className="card-content">
                        <div className="card-header">
                            <span className={`card-badge ${blog.private ? 'badge-private' : 'badge-public'}`}>
                                {blog.private ? <LockOutlined fontSize="small" /> : <PublicOutlined fontSize="small" />}
                                {blog.private ? 'Private' : 'Public'}
                            </span>
                            <span className="card-date">{formatDate(blog.createdAt)}</span>
                        </div>
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-excerpt">{truncate(blog.body, 120)}</p>
                        <p className="blog-author">By {blog.author}</p>
                    </div>
                    {viewMode === 'my' && (
                        <div className="card-actions">
                            <button className="action-btn edit-btn" onClick={(e) => handleEdit(blog, e)} title="Edit">
                                <FaEdit />
                            </button>
                            <button className="action-btn delete-btn" onClick={(e) => handleDeleteClick(blog._id, e)} title="Delete">
                                <FaTrashAlt />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BlogCardList;
