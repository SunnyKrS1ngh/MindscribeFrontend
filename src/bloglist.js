import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { apiFetch } from "./api";

const BlogList = ({blogs}) => {
   const handleDelete=(id)=>{
    
    apiFetch('/blogs/'+id,{
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