import { Container, Typography, Box, Link, Paper } from '@mui/material';
import Head from 'next/head';

const CancellationPolicy =()=> {
  return (
    <>
      <Head>
        <title>Cancellation Policy</title>
      </Head>
      <Container>
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Cancellation Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for choosing our flight booking services. We strive to provide you with the best travel experience possible. However, we understand that plans can change. Please review our cancellation policy below:
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            1. Cancellation by the Customer
          </Typography>
          <Typography variant="body1" paragraph>
            If you wish to cancel your booking, please do so at least 24 hours before your scheduled departure to avoid cancellation fees. Cancellations made within 24 hours of departure are subject to a fee of up to 50% of the ticket price.
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            2. Cancellation by the Airline
          </Typography>
          <Typography variant="body1" paragraph>
            In the event that the airline cancels your flight, you will be offered a full refund or an alternate flight at no additional cost. We will notify you of any such changes as soon as possible.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Refund Process
          </Typography>
          <Typography variant="body1" paragraph>
            Refunds for cancellations will be processed within 7-10 business days. Please allow additional time for your bank or credit card provider to reflect the refund in your account.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or need assistance with a cancellation, please contact our customer support team at <Link href="mailto:support@example.com">support@example.com</Link> or call us at 1-800-123-4567.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
export default CancellationPolicy ;
