import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import Head from 'next/head';

const BaggagePolicy = () => {
  return (
    <>
      <Head>
        <title>Flight Search</title>
      </Head>
      <Container sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Baggage Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our baggage policy page. Here you can find information about what is included in your ticket regarding baggage and additional options you might have.
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2">
              Standard Baggage Allowance
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Carry-On: 1 bag up to 7 kg (15 lbs)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Checked Bag: 1 bag up to 23 kg (50 lbs)" />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2">
              Additional Baggage Fees
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Additional Carry-On: $30 per bag" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Additional Checked Bag: $60 per bag" />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2">
              Special Baggage
            </Typography>
            <Typography variant="body1" paragraph>
              For special items like sports equipment or musical instruments, please contact our support team to arrange special handling and any applicable fees.
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            For any further queries, feel free to reach out to our customer service team or visit our FAQ page.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default BaggagePolicy;
