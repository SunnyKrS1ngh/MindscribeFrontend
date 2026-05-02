import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { apiFetch } from '../api';
import ErrorPopup from '../misc/ErrorPopup';
import '../styles/SignInForm.css';

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const hist = useHistory();

    const handleError = (message) => {
        setError(message);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userLocal = localStorage.getItem('username');
        if (token && userLocal) {
            hist.push(`/dashboard/${userLocal}`);
        }
    }, [hist]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        apiFetch('/admin', {
            method: 'POST',
            body: { username, password }
        }).then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    handleError(err.message);
                    setLoading(false);
                });
            } else {
                return res.json().then(data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.user.username);
                    hist.push(`/dashboard/${data.user.username}`);
                });
            }
        }).catch(e => {
            console.error('Fetch error:', e);
            handleError('Something went wrong. Please try again.');
            setLoading(false);
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-panel decorative-panel">
                <div className="decorative-content">
                    <Typography variant="h3" className="decorative-title">MindScribe</Typography>
                    <Typography variant="body1" className="decorative-text">Your space to write, reflect, and share with the world.</Typography>
                </div>
            </div>
            <div className="auth-panel form-panel">
                <div className="auth-form-container">
                    <Typography variant="h4" className="auth-title">Welcome Back</Typography>
                    <Typography variant="body2" className="auth-subtitle">Sign in to continue to your dashboard</Typography>

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
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <Typography variant="body2" className="auth-footer">
                        Don't have an account? <Link to="/register" className="auth-link">Register</Link>
                    </Typography>
                </div>
            </div>
            {open && <ErrorPopup open={open} handleClose={handleClose} message={error} />}
        </div>
    );
};

export default SignInForm;
