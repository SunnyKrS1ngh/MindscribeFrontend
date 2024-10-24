import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogCreate = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [loading,setLoading] = useState(false);
    const hist = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const blog = {title,body};
        
        setLoading(true);

        fetch('https://mindscribebackend-tzvh.onrender.com/blogs',{
            method:'POST',
            headers:{"Content-type":"applications/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added');
            setLoading(false);
            hist.push('/');
        })
    }

    return ( 
        <div>
            <h1>Create your blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" value={title} required
                onChange={(e)=>setTitle(e.target.value)}
                />

                <label>Blog body:</label>
                <textarea required value={body}
                onChange={(e)=>setBody(e.target.value)}
                ></textarea>

                {!loading&&<button>Add blog</button>}
                {loading&&<button disabled>Adding...</button>}
            </form>
            <p>{title}</p>
            <p>{body}</p>
        </div>
     );
}
 
export default BlogCreate;