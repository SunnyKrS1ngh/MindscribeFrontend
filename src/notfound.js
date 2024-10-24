import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
    return ( 
        <div>
            <h1>404! Not Found</h1>
            <Link to='/'>Back to homepage...</Link>
        </div>
     );
}
 
export default NotFound;