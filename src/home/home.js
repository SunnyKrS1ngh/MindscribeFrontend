// import {useEffect} from 'react';
import BlogList from '../bloglist';
import useFetch from '../useFetch';

//useState is used to re-render the jsx when ever a change is made to the variable


const Home = () => {

//     const {blogs,loading,error,setBlogs} = useFetch('http://localhost:8000/blogs');

//     const handleDelete = (id)=>{
//     const newBlogs = blogs.filter((blog)=>blog.id!==id);
//     setBlogs(newBlogs);
// }

// useEffect(()=>{
//     fetch('http://localhost:5000/dashboard',{
//         method: 'GET',
//         credentials: 'include',  // Ensures cookies are sent with the request
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(res => {
//         if(!res.ok){
//             throw Error('could not fetch the data for that resource');
//         }
//         return res.json();
//     })
//     .then((data)=>{
//         console.log(data);
//     }).catch((err)=>{
//         console.log(err);
//     })
// },[])






//props help to pass inside the components
    return ( 
        // <div className="home">
        //     {error&&<div>{error}</div>}
        //     {loading&&<div>Loading...</div> }
        //     {blogs&&<BlogList blogs={blogs} handleDelete={handleDelete} />}
            
        // </div>
        <div>
            
        </div>
     );
}
 
export default Home;