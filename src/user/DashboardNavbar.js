import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, Typography } from '@mui/material';
import { Menu, Add, Home, ExitToApp } from '@mui/icons-material';
import '../styles/DashboardNavbar.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { apiFetch } from '../api';

const DashboardNavbar = ({ user }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const hist = useHistory();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const onLogout = () => {
        apiFetch('/logout', { method: 'GET' })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    hist.push('/');
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const confirmLogout = () => {
        setDialogOpen(false);
        onLogout();
    };

    const initials = user ? user.substring(0, 2).toUpperCase() : '??';

    return (
        <div className="dashboard-navbar">
            <div className="navbar-left">
                <IconButton
                    edge="start"
                    onClick={toggleDrawer(true)}
                    className="menu-button"
                >
                    <Menu />
                </IconButton>
                <Link to="/" className="navbar-brand">
                    <span className="brand-text">MindScribe</span>
                </Link>
            </div>

            <div className="navbar-right">
                <div className="user-avatar" onClick={() => hist.push(`/dashboard/${user}`)}>
                    {initials}
                </div>
                <Button
                    variant="text"
                    onClick={openDialog}
                    className="logout-button"
                    startIcon={<ExitToApp />}
                >
                    Logout
                </Button>
            </div>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div className="drawer-header">
                    <div className="drawer-avatar">{initials}</div>
                    <Typography variant="subtitle1" className="drawer-username">@{user}</Typography>
                </div>
                <List className="drawer-list">
                    <ListItem button component={Link} to={`/dashboard/${user}`} onClick={toggleDrawer(false)}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to={`/addpost/${user}`} onClick={toggleDrawer(false)}>
                        <ListItemIcon><Add /></ListItemIcon>
                        <ListItemText primary="New Post" />
                    </ListItem>
                    <ListItem button onClick={() => { toggleDrawer(false); openDialog(); }}>
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>

            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                className="logout-dialog"
            >
                <DialogTitle>Log out?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to log out?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} className="dialog-cancel">Cancel</Button>
                    <Button onClick={confirmLogout} className="dialog-confirm" autoFocus>Logout</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DashboardNavbar;
