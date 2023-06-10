import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton, Box, Container } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; // Replace with the path to your logo image

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    marginRight: '1rem',
}));

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link to="/">
                        <img src={logo} alt="VEIL Logo" sx={{ height: '10rem' }} />
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <nav>
                        <ul sx={{ display: 'flex', alignItems: 'center', listStyleType: 'none', p: 0, ml: '2rem' }}>
                                <li>
                                    <StyledLink to="/">
                                        Home
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink to="/products">
                                        Products
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink to="/about">
                                        About
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink to="/contact">
                                        Contact
                                    </StyledLink>
                                </li>
                            </ul>
                        </nav>
                    </Box>
                    <IconButton sx={{ color: '#4B0082' }}>
                        <ShoppingCart />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
