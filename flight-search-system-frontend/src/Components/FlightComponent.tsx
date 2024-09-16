import * as React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Flight } from '@/pages/api/types/flight';
import styles from '../styles/FlightComponent.module.css'
import dateFormatter from '@/pages/api/utils/dateConverter';

interface FlightComponentProps {
  flights: Flight[];
}

const FlightComponent: React.FC<FlightComponentProps> = ({ flights }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [termsAgreed, setTermsAgreed] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState<Flight | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBookClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTermsAgreed(false);
    setSelectedFlight(null);
  };

  const handleConfirmBooking = () => {
    if (termsAgreed) {
      handleCloseDialog();
    } else {
      alert('You must agree to the terms and conditions to proceed.');
    }
  };

  let paginatedFlights: Flight[] = [];
  if (flights.length > 0) {
    paginatedFlights = flights.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }} className={styles.flightCard}>
        {paginatedFlights.length > 0 ? (
          paginatedFlights.map((flight, index) => (
            <Card key={index} className={styles.flightCard}>
              <CardActionArea className={styles.flightCardContent}>
                <CardMedia
                  sx={{ width: '20%', height: '5%', marginLeft: 0, padding: 0 }}
                  component="img"
                  image='planeIcon.png'
                  alt='Plane Image'
                />
                <CardContent>
                  <Typography variant="h6" className={styles.flightCardtitle}>
                    {flight.airline.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Flight Number: {flight.flightNumber}
                  </Typography>
                  <span>{flight.travelClass + ", " + flight.flightType.toString() + ", "}</span>
                  <span>{"Duration: " + flight.duration + " minutes"} </span>
                  <Typography color="text.secondary">
                    {dateFormatter(flight.departureTime) + " "}{flight.originAirport.city.name + " "}
                    <ArrowRightAltIcon />
                    {" " + dateFormatter(flight.arrivalTime) + " "}{flight.destinationAirport.city.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {flight.layovers === 0 ? 'Non-stop '+ flight.aircraftType.model : `${flight.layovers} Stops` + ", " + flight.aircraftType.model}
                  </Typography>
                  <Typography variant="h6" className={styles.flightCardprice}>
                    Price: Rs. {flight.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBookClick(flight)}
                >
                  Book
                </Button>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography>No Records Found..</Typography>
        )}
      </div>
      <TablePagination className={styles.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={flights.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please read the policy carefully and confirm your booking.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            }
            label="I have read the policy carefully and agree to the terms."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default FlightComponent;
