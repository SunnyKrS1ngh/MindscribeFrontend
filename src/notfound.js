import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '@mui/material';
import { Home } from '@mui/icons-material';

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="notfound-content">
                <h1 className="notfound-code">404</h1>
                <p className="notfound-message">Looks like this page got lost in thought...</p>
                <Link to="/">
                    <Button variant="contained" className="notfound-btn" startIcon={<Home />}>
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
