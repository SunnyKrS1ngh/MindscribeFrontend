import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const BlogDetail = () => {

    const {id} = useParams();

    const {blogs,error,loading} = useFetch('http://localhost:8000/blogs/'+id);

    return ( 
        <div className="blog-details">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            
            {blogs&&(
                <article>
                    <h2>{blogs.title}</h2>
                    <p>{blogs.body}</p>
                </article>
            )}
            
        </div>
     );
}
 
export default BlogDetail;