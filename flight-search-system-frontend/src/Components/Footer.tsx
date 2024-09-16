import React from 'react';
import { Container, Grid, Typography, Link, Paper } from '@mui/material';

const Footer = () => {
    return (
        <Paper
            component="footer"
            sx={{
                p: 3,
                mt: 'auto',
                backgroundColor: '#f5f5f5',
                borderTop: '1px solid #ddd'
            }}
        >
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                                Discover your next adventure with ease at FlyFinder.
                             Our mission is to make flight searches straightforward and stress-free,
                              providing you with the best options and prices all in one place. 
                              Safe travels and happy flying!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <Link href="#" color="inherit">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">
                            1234 Street Name
                            <br />
                            City, State 12345
                            <br />
                            Email: flyfinder@example.com
                            <br />
                            Phone: (+91) 666-456-7890
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    © {new Date().getFullYear()} FlyFinder. All rights reserved.
                </Typography>
            </Container>
        </Paper>
    );
};

export default Footer;
