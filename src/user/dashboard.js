import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'; // Import CSS for styling
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardNavbar from './DashboardNavbar';
import useFetch from '../useFetch';
import BlogCardList from './BlogCardList';
import LoadingSpinner from '../misc/loading';

const Dashboard = () => {
    const { user } = useParams(); // Access user data from context

    const {data,loading,error} = useFetch('/dashboard');
    const [showData, setShowData] = useState(null);
    const [disabledButton, setDisabledButton] = useState('latest'); // Set initial disabled button (latest or my posts)
    const hist = useHistory();

    useEffect(() => {
        if (data) {
            setShowData(data.pub); // Show public posts initially
        }
    }, [data]);

    const handleDelete = (id) => {
        console.log(id);
        fetch('/delete_post/' + id, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log('Response status:', res.status); // Log status code
            if (!res.ok) {
                return res.json().then(err => {
                    console.log('Error:', err.message); // Log the error message
                });
            } else {
                return res.json().then(() => {
                    console.log('Post deleted');
                    window.location.reload();
                });
            }
        }).catch(e => {
            console.error('Post error:', e);
        });
    };

    const showMyPosts = () => {
        setShowData(data.my);
        setDisabledButton('my'); // Disable the "My posts" button
    };

    const showLatestPosts = () => {
        setShowData(data.pub);
        setDisabledButton('latest'); // Disable the "Latest posts" button
    };

    return (
        <div>
            <DashboardNavbar user={user} />

            <div className="button-group">
                <button
                    className='button'
                    onClick={showMyPosts}
                    disabled={disabledButton === 'my'} // Disable "My posts" button if it's already selected
                >
                    My posts
                </button>
                <button
                    className='button button-secondary'
                    onClick={showLatestPosts}
                    disabled={disabledButton === 'latest'} // Disable "Latest posts" button if it's already selected
                >
                    Latest posts
                </button>
            </div>

            <div className='blog-list'>
                {loading && <LoadingSpinner />}
                {error && <div>{error}</div>}

                {showData && <BlogCardList blogs={showData} handleDelete={handleDelete} latest={disabledButton}/>}
            </div>
        </div>
    );
};

export default Dashboard;
