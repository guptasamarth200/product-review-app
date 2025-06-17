import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Product Reviews
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Products
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 