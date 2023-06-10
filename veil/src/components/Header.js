import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Container } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; // Replace with the path to your logo image

const styledLink = "text-purple-900 hover:text-purple-300"
const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar className="flex justify-between">
                    <Link to="/">
                        <img src={logo} alt="VEIL Logo" style={{ height: 40 }} />
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <Link to="/" className={styledLink}>Home</Link>
                                </li>
                                <li>
                                    <Link to="/products" className={styledLink}>Products</Link>
                                </li>
                                <li>
                                    <Link to="/about" className={styledLink}>About</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className={styledLink}>Contact</Link>
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
