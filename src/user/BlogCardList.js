import React from 'react';
import { FaTrashAlt, FaEdit, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import '../styles/BlogCardList.css'; // Add your styles here
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const BlogCardList = ({ blogs, handleDelete ,latest}) => {
  const hist = useHistory();

  const onCardClick = (id) => {
    hist.push('/blog/' + id);
  };

  const handleEdit = (blog, e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    hist.push({
      pathname: `/edit/${blog._id}`,
      state: { blog }
    });
  };

  const handleDeleteClick = (blogId, e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    handleDelete(blogId);
    console.log('button pressed');
  };

  return (
    <div className="blog-card-list">
      {blogs.map((blog, index) => (
        <div className="blog-card" key={index} onClick={() => onCardClick(blog._id)}>
          <div className="card-content">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-author">By {blog.author}</p>
          </div>
          <div className="card-icons">
            {latest==='my'&&<FaEdit className="icon" onClick={(e) => handleEdit(blog, e)} />} {/* Call handleEdit with blog data */}
            {latest==='my'&&<FaTrashAlt className="icon" onClick={(e) => handleDeleteClick(blog._id, e)} />}
            {latest==='latest'&&<FaThumbsUp className="icon" />} {/* Assuming you have a handleLike function */}
            {latest==='latest'&&<FaThumbsDown className="icon" />} {/* Assuming you have a handleDislike function */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCardList;
