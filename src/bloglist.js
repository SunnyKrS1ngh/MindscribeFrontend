import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogList = ({blogs}) => {
    const hist = useHistory();
   const handleDelete=(id)=>{
    

    fetch('https://mindscribebackend-tzvh.onrender.com/blogs/'+id,{
        method:'DELETE'
    }).then(()=>{
        console.log('blog deleted');
       window.location.reload();
    })
   }

    return ( 
        <div className="bloglist">
          
            {blogs.map((blog)=>(
                <div className='blog-preview' key={blog.id}>
                    <Link to={`/blogDetail/${blog.id}`}>
                    <h2>{blog.title}</h2>
                    <p>{blog.author}</p>
                    </Link>
                    <button onClick={()=>handleDelete(blog.id)}>Delete</button>
                </div>
                
            ))}
           
        </div>
     );
}
 
export default BlogList;