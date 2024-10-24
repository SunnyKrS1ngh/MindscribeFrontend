import React from 'react';
import '../styles/BlogView.css'; // Create and link this CSS file for styling
import useFetch from '../useFetch';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardNavbar from './DashboardNavbar';
import LoadingSpinner from '../misc/loading';

const BlogView = () => {
    const {id} = useParams();
    //console.log(id);
    const {data,loading,error} = useFetch('https://mindscribebackend-tzvh.onrender.com/postpriv/'+id);
    console.log(data);
  return (
    <div>
        <DashboardNavbar />
        {loading && <LoadingSpinner />}
        {error && <div>{error}</div>}
        {data&& <div className="blog-view">
      <div className="blog-header">
        <h1 className="blog-title">{data.post.title}</h1>
      </div>
      <div className="blog-body">
        <p>{data.post.body}</p>
      </div>
    </div>}
    
    </div>
  );
};

export default BlogView;
