import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back arrow icon
import '../styles/DashboardNavbar.css'; // Add styles here
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {Dialog, DialogActions, DialogTitle } from '@mui/material'; // Import required Material-UI components

const DashboardNavbar = ({ user }) => {
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

  // History for navigation
  const hist = useHistory();

  const location = useLocation();

  // Toggle drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Handle Logout
  const onLogout = () => {
    fetch('https://mindscribebackend-tzvh.onrender.com/logout', { method: 'GET' }) // Ensure credentials are included if necessary
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          console.log('User logged out');
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

  // Function to close the dialog without logging out
  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Function to confirm logout
  const confirmLogout = () => {
    setDialogOpen(false);
    onLogout();
  };

  // Handle Back navigation
  const handleBack = () => {
    if(location.pathname===`/dashboard/${user}`){
      console.log('back button disabled in dashboard');
    }else{
      hist.goBack();
    }
     // Go back to the previous page
  };

  return (
    <div className="dashboard-navbar">
      {/* Back Button */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={handleBack} // Handle back navigation
        className="back-button"
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Menu Drawer Button */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        className="menu-button"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          className="drawer-content"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to={`/addpost/${user}`}>
              <ListItemText primary="+ New Post" />
            </ListItem>
          </List>
        </div>

        <div className="drawer-footer">
          <Button variant="contained" color="primary" className="profile-button">
            {user}'s Profile
          </Button>
        </div>
      </Drawer>

      {/* Logout Button */}
      <div className='logout-container'>
      {/* Logout Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={openDialog} // Trigger dialog on button click
        className='logout-button'
      >
        Logout
      </Button>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog} // Close dialog when clicking outside or pressing ESC
        aria-labelledby="confirm-logout-dialog"
      >
        <DialogTitle id="confirm-logout-dialog">Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};

export default DashboardNavbar;
