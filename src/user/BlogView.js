import React from 'react';
import '../styles/BlogView.css';
import useFetch from '../useFetch';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ArrowBack, LockOutlined, PublicOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import DashboardNavbar from './DashboardNavbar';
import LoadingSpinner from '../misc/loading';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const BlogView = () => {
    const { id } = useParams();
    const hist = useHistory();
    const { data, loading, error } = useFetch('/postpriv/' + id);

    return (
        <div>
            <DashboardNavbar />
            {loading && <LoadingSpinner />}
            {error && <div className="blog-error">Could not load this post.</div>}
            {data && (
                <div className="blog-view page-enter">
                    <div className="blog-view-header">
                        <IconButton className="blog-back-btn" onClick={() => hist.goBack()}>
                            <ArrowBack />
                        </IconButton>
                        <span className={`blog-view-badge ${data.post.private ? 'badge-private' : 'badge-public'}`}>
                            {data.post.private ? <LockOutlined fontSize="small" /> : <PublicOutlined fontSize="small" />}
                            {data.post.private ? 'Private' : 'Public'}
                        </span>
                    </div>
                    <div className="blog-view-content">
                        <h1 className="blog-view-title">{data.post.title}</h1>
                        <div className="blog-view-meta">
                            <span className="meta-author">By {data.post.author}</span>
                            <span className="meta-divider">&middot;</span>
                            <span className="meta-date">{formatDate(data.post.createdAt)}</span>
                        </div>
                        <div className="blog-view-divider"></div>
                        <div className="blog-view-body">
                            <p>{data.post.body}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogView;
