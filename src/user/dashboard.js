import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { apiFetch } from '../api';
import DashboardNavbar from './DashboardNavbar';
import useFetch from '../useFetch';
import BlogCardList from './BlogCardList';
import LoadingSpinner from '../misc/loading';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user } = useParams();
    const { data, loading, error } = useFetch('/dashboard');
    const [showData, setShowData] = useState(null);
    const [viewMode, setViewMode] = useState('latest');
    const hist = useHistory();

    useEffect(() => {
        if (data) {
            setShowData(data.pub);
        }
    }, [data]);

    const handleDelete = (id) => {
        apiFetch('/delete_post/' + id, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => console.log('Error:', err.message));
            } else {
                window.location.reload();
            }
        }).catch(e => console.error('Post error:', e));
    };

    const handleViewChange = (event, newValue) => {
        if (newValue !== null) {
            setViewMode(newValue);
            if (newValue === 'my') {
                setShowData(data.my);
            } else {
                setShowData(data.pub);
            }
        }
    };

    return (
        <div className="dashboard-page page-enter">
            <DashboardNavbar user={user} />

            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1 className="dashboard-greeting">Welcome back, <span className="username-highlight">{user}</span></h1>
                    <p className="dashboard-subtitle">Your personal writing space awaits</p>
                </div>

                {data && (
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-icon stat-total">
                                <span>{data.my.length + data.pub.length}</span>
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Total Posts</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-public">
                                <span>{data.pub.length}</span>
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Public</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-private">
                                <span>{data.my.length - data.pub.filter(p => data.my.map(m => m._id).includes(p._id)).length}</span>
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">Private</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="view-toggle">
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        className="toggle-group"
                    >
                        <ToggleButton value="latest" className="toggle-btn">
                            Latest Posts
                        </ToggleButton>
                        <ToggleButton value="my" className="toggle-btn">
                            My Posts
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className="blog-list">
                    {loading && <LoadingSpinner />}
                    {error && <div className="error-state">Something went wrong. Please try again.</div>}
                    {showData && showData.length === 0 && (
                        <div className="empty-state">
                            <p>No posts yet.</p>
                            <button className="empty-cta" onClick={() => hist.push(`/addpost/${user}`)}>
                                Create your first post
                            </button>
                        </div>
                    )}
                    {showData && showData.length > 0 && <BlogCardList blogs={showData} handleDelete={handleDelete} viewMode={viewMode} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
