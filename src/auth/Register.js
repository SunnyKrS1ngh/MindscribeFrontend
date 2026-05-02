import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { apiFetch } from '../api';
import ErrorPopup from '../misc/ErrorPopup';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const handleError = (message) => {
        setError(message);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const hist = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        apiFetch('/register', {
            method: 'POST',
            body: { username, password }
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    handleError(err.message);
                    setLoading(false);
                });
            } else {
                setLoading(false);
                hist.push('/signIn');
            }
        }).catch(e => {
            console.error('Post error:', e);
            handleError('Something went wrong. Please try again.');
            setLoading(false);
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-panel decorative-panel">
                <div className="decorative-content">
                    <Typography variant="h3" className="decorative-title">Join MindScribe</Typography>
                    <Typography variant="body1" className="decorative-text">Start your journey of sharing ideas and connecting with others.</Typography>
                </div>
            </div>
            <div className="auth-panel form-panel">
                <div className="auth-form-container">
                    <Typography variant="h4" className="auth-title">Create Account</Typography>
                    <Typography variant="body2" className="auth-subtitle">Sign up to start writing and sharing</Typography>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}
                            className="auth-input"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            className="auth-input"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Register'}
                        </Button>
                    </form>

                    <Typography variant="body2" className="auth-footer">
                        Already have an account? <Link to="/signIn" className="auth-link">Sign In</Link>
                    </Typography>
                </div>
            </div>
            {open && <ErrorPopup open={open} handleClose={handleClose} message={error} />}
        </div>
    );
};

export default Register;
