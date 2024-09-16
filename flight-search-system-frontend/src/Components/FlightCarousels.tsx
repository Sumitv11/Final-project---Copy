import React, { useState } from 'react';
import { Container, Box, IconButton, Typography, Card, CardContent, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

const data = [
    { title: 'Flight to Goa', description: 'Enjoy a wonderful trip to Goa.', image: '/goa.jpg' },
    { title: 'Flight to Paris', description: 'Enjoy a wonderful trip to Paris.', image: '/paris.jpg' },
    { title: 'Vacation in Hanuwantiya', description: 'Relax on the beautiful banks of Narmada river.', image: 'hanuwantiya.jpg' },
    { title: 'Vacation in Bali', description: 'Relax on the beautiful beaches of Bali.', image: 'bali.jpg' },
    { title: 'Vacation in Bali', description: 'Relax on the beautiful beaches of Bali.', image: 'http://ts2.mm.bing.net/th?id=OIP.0H8a-VeAzQlgCJbkCwBXzgHaE8&pid=15.1' },
    { title: 'Vacation in Bali', description: 'Relax on the beautiful beaches of Bali.', image: 'http://ts2.mm.bing.net/th?id=OIP.0H8a-VeAzQlgCJbkCwBXzgHaE8&pid=15.1' },
    { title: 'Vacation in Bali', description: 'Relax on the beautiful beaches of Bali.', image: 'http://ts2.mm.bing.net/th?id=OIP.0H8a-VeAzQlgCJbkCwBXzgHaE8&pid=15.1' },
    { title: 'Holiday in New York', description: 'Experience the vibrant life of New York City.', image: 'newyork.jpg' },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    return (
        <Container sx={{height:'80%'}}>
            <h1 className='text-center'>Top Destination Places</h1>
            <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <IconButton
                    sx={{ position: 'absolute', top: '20%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                    onClick={handlePrev}
                >
                    <ChevronLeft fontSize="large" sx={{ color: pink[500] }} />
                </IconButton>

                <Box sx={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentIndex * 100}%)` }}>
                    {data.map((item, index) => (
                        <Box key={index} sx={{ flex: '0 0 100%' }}>
                            <Card sx={{ width: '100%', height: '60%' }}>
                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '80%' }} />
                                <CardContent sx={{display:'flex',alignItems:'center' , justifyContent:'space-around'}}>
                                    <div>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography variant="body2">{item.description}</Typography>
                                    </div>
                                    <Button variant="contained"> Details</Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                <IconButton
                    sx={{ position: 'absolute', top: '20%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                    onClick={handleNext}
                >
                    <ChevronRight fontSize="large" sx={{ color: pink[500] }}  />
                </IconButton>
            </Box>
        </Container>
    );
};

export default Carousel;
