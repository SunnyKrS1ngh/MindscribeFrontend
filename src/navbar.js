import { Link } from 'react-router-dom';
import './styles/global.css'; // Make sure to import the CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="brand">
                <Link to="/"><h1>MindScribe</h1></Link>
            </div>
            <div className="links">
                <Link to="/signIn" className="signIn-btn">
                    <button>SIGN IN</button>
                </Link>
                <Link to="/register" className="register-btn">
                    <button>REGISTER</button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
