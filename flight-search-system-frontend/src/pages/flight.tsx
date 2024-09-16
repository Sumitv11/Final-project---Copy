import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl,
  Alert, TablePagination, Container,
  FormHelperText,
  Typography
} from '@mui/material';
import Layout from '@/Components/Layout';
import styles from '../styles/Flight.module.css';
import { TravelClass } from './api/types/travelclass';
import { FlightType } from './api/types/flightType';
import { Airport } from './api/types/airport';
import { Aircraft } from './api/types/aircraft';
import { Airline } from './api/types/airline';
import { Flight } from './api/types/flight';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { addFlight, deleteFlight, fetchFlightStart, updateFlight } from '@/redux/slice/flightSlice';
import { fetchAircraftStart } from '@/redux/slice/aircraftSlice';
import { fetchAirlinesStart } from '@/redux/slice/airlineSlice';
import { fetchAirportsStart } from '@/redux/slice/airportSlice';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { areObjectsEqual } from './api/utils/objectChecker';

const FlightComponent = () => {
  const dispatch = useAppDispatch();
  const flights: Flight[] = useAppSelector((state) => state.flight.flights);
  const airlines: Airline[] = useAppSelector((state) => state.airline.airlines);
  const airports: Airport[] = useAppSelector((state) => state.airport.airports);
  const aircrafts: Aircraft[] = useAppSelector((state) => state.aircraft.aircraft);
  const error = useAppSelector((state) => state.flight.error);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchFlightStart());
    dispatch(fetchAirlinesStart());
    dispatch(fetchAircraftStart());
    dispatch(fetchAirportsStart());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [existingFlight, setExistingFlight] = useState<Flight>();

  const [newFlight, setNewFlight] = useState<Flight>({
    id: 0,
    flightNumber: '',
    airline: { id: 0, name: '' },
    destinationAirport: {
      id: 0, name: '',
      iataCode: '',
      city: { id: 0, name: '', code: '', country: '' },
    },
    originAirport: {
      id: 0, name: '',
      iataCode: '',
      city: { id: 0, name: '', code: '', country: '' },
    },
    departureTime: '',
    arrivalTime: '',
    duration: 0,
    price: 0,
    travelClass: TravelClass.ECONOMY,
    flightType: FlightType.ONEWAY,
    aircraftType: {
      id: 0,
      model: '',
      seatingCapacity: 0,
      maxTakeoffWeight: 0,
    },
    capacity: 0,
    layovers: 0
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFlight = (flight: Flight): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (!flight.flightNumber.trim()) errors.flightNumber = 'Flight Number is required';
    if (!flight.airline.id) errors.airline = 'Airline is required';
    if (!flight.destinationAirport.id) errors.destinationAirport = 'Destination Airport is required';
    if (!flight.originAirport.id) errors.originAirport = 'Origin Airport is required';
    if (!flight.departureTime) errors.departureTime = 'Departure Time is required';
    if (!flight.arrivalTime) errors.arrivalTime = 'Arrival Time is required';
    if (!flight.aircraftType.id) errors.aircraftType = 'Aircraft is required';
    if (flight.duration <= 0) errors.duration = 'Duration must be a positive number';
    if (flight.price <= 0) errors.price = 'Price must be a positive number';
    if (flight.capacity <= 0) errors.capacity = 'Capacity must be a positive number';
    if (flight.layovers < 0) errors.layovers = 'Layovers cannot be negative';
    return errors;
  };

  const handleOpen = (flight: Flight) => {
    setSelectedFlight(flight);
    setExistingFlight(flight);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddOpen(false);
    setErrors({});
    if (addOpen) {
      setNewFlight({
        id: 0,
        flightNumber: '',
        airline: { id: 0, name: '' },
        destinationAirport: {
          id: 0, name: '',
          iataCode: '',
          city: { id: 0, name: '', code: '', country: '' },
        },
        originAirport: {
          id: 0, name: '',
          iataCode: '',
          city: { id: 0, name: '', code: '', country: '' },
        },
        departureTime: '',
        arrivalTime: '',
        duration: 60,
        price: 1000,
        travelClass: TravelClass.ECONOMY,
        flightType: FlightType.ONEWAY,
        aircraftType: {
          id: 0,
          model: '',
          seatingCapacity: 0,
          maxTakeoffWeight: 0,
        },
        capacity: 0,
        layovers: 0
      });
    }
  };

  const handleSave = () => {
    if (selectedFlight) {
      const validationErrors = validateFlight(selectedFlight);
      if (Object.keys(validationErrors).length === 0) {
        if (!areObjectsEqual(selectedFlight, existingFlight)) {
          dispatch(updateFlight(selectedFlight));
          handleClose();
        } else {
          setErrors({
            ...errors,
            general: 'No changes detected'
          });
        }
      }
      else {
        setErrors(validationErrors);
        return;
      }
    }
  };

  const handleAddFlight = () => {
    const validationErrors = validateFlight(newFlight);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addFlight(newFlight));
      handleClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedFlight) {
      setSelectedFlight({
        ...selectedFlight,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleNewFlightChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewFlight({
      ...newFlight,
      [event.target.name]: event.target.value
    });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteFlight = (id: number) => {
    dispatch(deleteFlight(id));
  };


  const paginatedFlights = flights.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - flights.length) : 0;
  return (
    <Layout>
      <div className={styles.container}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={`${styles.button} ${styles.addButton}`}
          onClick={() => setAddOpen(true)}
        >
          Add
        </Button>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
                <TableCell>Flight Number</TableCell>
                <TableCell>Airline</TableCell>
                <TableCell>Destination Airport</TableCell>
                <TableCell>Origin Airport</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Arrival Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Aircraft</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Layovers</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedFlights.map((flight: Flight) => (
                <TableRow key={flight.id}>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>{flight.airline.name}</TableCell>
                  <TableCell>{flight.destinationAirport.name}</TableCell>
                  <TableCell>{flight.originAirport.name}</TableCell>
                  <TableCell>{flight.departureTime}</TableCell>
                  <TableCell>{flight.arrivalTime}</TableCell>
                  <TableCell>{flight.duration}</TableCell>
                  <TableCell>{flight.price}</TableCell>
                  <TableCell>{flight.travelClass}</TableCell>
                  <TableCell>{flight.flightType}</TableCell>
                  <TableCell>{flight.aircraftType.model}</TableCell>
                  <TableCell>{flight.capacity}</TableCell>
                  <TableCell>{flight.layovers}</TableCell>
                  <TableCell align="right">
                    <Button
                      className={`${styles.button} ${styles.buttonSave}`}
                      startIcon={<EditNoteIcon />}
                      onClick={() => handleOpen(flight)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={`${styles.button} ${styles.buttonDelete}`}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteFlight(flight.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 110 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Edit Modal */}
          <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalContainer}>
              <Box className={styles.modalContent}>
                <Typography id="modal-modal-title" variant="h5" align="center"
                  sx={{ backgroundColor: 'lavender', marginBottom: 2, borderRadius: '3%' }}>
                  Edit Flight
                </Typography>
                {selectedFlight && (
                  <form className={styles.field}>
                    <TextField
                      label="Flight Number"
                      name="flightNumber"
                      value={selectedFlight.flightNumber}
                      onChange={handleChange}
                      fullWidth
                      className={styles.textField}
                      error={!!errors.flightNumber}
                      helperText={errors.flightNumber}
                    />
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Airline</InputLabel>
                      <Select
                        label="Airline"
                        value={selectedFlight.airline.id}
                        onChange={(e) => {
                          const airlineId = e.target.value as number;
                          const airline = airlines.find(a => a.id === airlineId);
                          if (airline) {
                            setSelectedFlight({ ...selectedFlight, airline });
                          }
                        }}
                      >
                        {airlines.map((airline) => (
                          <MenuItem key={airline.id} value={airline.id}>
                            {airline.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Destination Airport</InputLabel>
                      <Select
                        label="Destination Airport"
                        value={selectedFlight.destinationAirport.id}
                        onChange={(e) => {
                          const airportId = e.target.value as number;
                          const airport = airports.find(a => a.id === airportId);
                          if (airport) {
                            setSelectedFlight({ ...selectedFlight, destinationAirport: airport });
                          }
                        }}
                      >
                        {airports.map((airport) => (
                          <MenuItem key={airport.id} value={airport.id}>
                            {airport.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Origin Airport</InputLabel>
                      <Select
                        label="Origin Airport"
                        value={selectedFlight.originAirport.id}
                        onChange={(e) => {
                          const airportId = e.target.value as number;
                          const airport = airports.find(a => a.id === airportId);
                          if (airport) {
                            setSelectedFlight({ ...selectedFlight, originAirport: airport });
                          }
                        }}
                      >
                        {airports.map((airport) => (
                          <MenuItem key={airport.id} value={airport.id}>
                            {airport.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Departure Time"
                      name="departureTime"
                      type="datetime-local"
                      value={selectedFlight.departureTime}
                      onChange={handleChange}
                      fullWidth
                      className={styles.textField}
                      error={!!errors.departureTime}
                      helperText={errors.departureTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="Arrival Time"
                      name="arrivalTime"
                      type="datetime-local"
                      value={selectedFlight.arrivalTime}
                      onChange={handleChange}
                      fullWidth
                      className={styles.textField}
                      error={!!errors.arrivalTime}
                      helperText={errors.arrivalTime}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="Duration (minutes)"
                      name="duration"
                      value={selectedFlight.duration}
                      onChange={handleChange}
                      fullWidth
                      className={styles.textField}
                      error={!!errors.duration}
                      helperText={errors.duration}
                    />
                    <TextField
                      label="Price"
                      name="price"
                      value={selectedFlight.price}
                      onChange={handleChange}
                      fullWidth
                      className={styles.textField}
                      error={!!errors.price}
                      helperText={errors.price}
                    />
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Class</InputLabel>
                      <Select
                        label="Class"
                        value={selectedFlight.travelClass}
                        onChange={(e) => {
                          const travelClass = e.target.value as TravelClass;
                          setSelectedFlight({ ...selectedFlight, travelClass });
                        }}
                      >
                        {Object.values(TravelClass).map((cls) => (
                          <MenuItem key={cls} value={cls}>
                            {cls}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Type</InputLabel>
                      <Select
                        label="Type"
                        value={selectedFlight.flightType}
                        onChange={(e) => {
                          const flightType = e.target.value as FlightType;
                          setSelectedFlight({ ...selectedFlight, flightType });
                        }}
                      >
                        {Object.values(FlightType).map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Aircraft Type</InputLabel>
                      <Select
                        label="Aircraft Name"
                        value={selectedFlight.aircraftType.id}
                        onChange={(e) => {
                          const aircraftId = e.target.value as number;
                          const aircraft = aircrafts.find(a => a.id === aircraftId);
                          if (aircraft) {
                            setSelectedFlight({ ...selectedFlight, aircraftType: aircraft });
                          }
                        }}
                      >
                        {aircrafts.map((aircraft) => (
                          <MenuItem key={aircraft.id} value={aircraft.id}>
                            {aircraft.model}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Capacity"
                      name="capacity"
                      value={selectedFlight.capacity}
                      onChange={handleChange}
                      fullWidth
                      className={styles.textField}
                      error={!!errors.capacity}
                      helperText={errors.capacity}
                    />
                    <FormControl fullWidth className={styles.textField}>
                      <InputLabel>Layovers</InputLabel>
                      <Select
                        label="Layovers"
                        value={selectedFlight.layovers}
                        onChange={(e) => {
                          const layovers = e.target.value as number;
                          setSelectedFlight({ ...selectedFlight, layovers });
                        }}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.general && (
                      <Box sx={{ color: 'red', textAlign: 'center' }}>{errors.general}</Box>
                    )}
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        onClick={handleSave}
                        sx={{ paddingLeft: 4, paddingRight: 4 }}
                      >
                        Save
                      </Button>
                      <Button
                        className={`${styles.button} ${styles.buttonCancel}`}
                        onClick={handleClose}
                        sx={{ paddingLeft: 1, paddingRight: 1 }}
                      >
                        Cancel
                      </Button>
                    </Container>
                  </form>
                )}
              </Box>
            </Box>
          </Modal>

          {/* Add Modal */}
          <Modal open={addOpen} onClose={handleClose}>
            <Box className={styles.modalContainer}>
              <Box className={styles.modalContent}>
                <Typography id="modal-modal-title" variant="h5" align="center"
                  sx={{ backgroundColor: 'lavender', marginBottom: 2, borderRadius: '3%' }}>
                  Add a new Flight
                </Typography>
                <form className={styles.field}>
                  <TextField
                    label="Flight Number"
                    name="flightNumber"
                    value={newFlight.flightNumber}
                    onChange={handleNewFlightChange}
                    fullWidth
                    className={styles.textField}
                    error={!!errors.flightNumber}
                    helperText={errors.flightNumber}
                  />
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Airline</InputLabel>
                    <Select
                      label="Airline"
                      value={newFlight.airline.id}
                      onChange={(e) => {
                        const airlineId = e.target.value as number;
                        const airline = airlines.find(a => a.id === airlineId);
                        if (airline) {
                          setNewFlight({ ...newFlight, airline });
                        }
                      }}
                      error={!!errors.airline}
                    >
                      {airlines.map((airline) => (
                        <MenuItem key={airline.id} value={airline.id}>
                          {airline.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.airline && <FormHelperText error>{errors.airline}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Destination Airport</InputLabel>
                    <Select
                      label="Destination Airport"
                      value={newFlight.destinationAirport.id}
                      onChange={(e) => {
                        const airportId = e.target.value as number;
                        const airport = airports.find(a => a.id === airportId);
                        if (airport) {
                          setNewFlight({ ...newFlight, destinationAirport: airport });
                        }
                      }}
                      error={!!errors.destinationAirport}
                    >
                      {airports.map((airport) => (
                        <MenuItem key={airport.id} value={airport.id}>
                          {airport.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.destinationAirport && <FormHelperText error>{errors.destinationAirport}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Origin Airport</InputLabel>
                    <Select
                      label="Origin Airport"
                      value={newFlight.originAirport.id}
                      onChange={(e) => {
                        const airportId = e.target.value as number;
                        const airport = airports.find(a => a.id === airportId);
                        if (airport) {
                          setNewFlight({ ...newFlight, originAirport: airport });
                        }
                      }}
                      error={!!errors.originAirport}
                    >
                      {airports.map((airport) => (
                        <MenuItem key={airport.id} value={airport.id}>
                          {airport.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.originAirport && <FormHelperText error>{errors.originAirport}</FormHelperText>}
                  </FormControl>
                  <TextField
                    label="Departure Time"
                    name="departureTime"
                    type="datetime-local"
                    value={newFlight.departureTime}
                    onChange={handleNewFlightChange}
                    fullWidth
                    className={styles.textField}
                    error={!!errors.departureTime}
                    helperText={errors.departureTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    label="Arrival Time"
                    name="arrivalTime"
                    type="datetime-local"
                    value={newFlight.arrivalTime}
                    onChange={handleNewFlightChange}
                    fullWidth
                    className={styles.textField}
                    error={!!errors.arrivalTime}
                    helperText={errors.arrivalTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    label="Duration (minutes)"
                    name="duration"
                    value={newFlight.duration}
                    onChange={handleNewFlightChange}
                    fullWidth
                    className={styles.textField}
                    error={!!errors.duration}
                    helperText={errors.duration}
                  />
                  <TextField
                    label="Price"
                    name="price"
                    value={newFlight.price}
                    onChange={handleNewFlightChange}
                    fullWidth
                    className={styles.textField}
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Class</InputLabel>
                    <Select
                      label="Class"
                      value={newFlight.travelClass}
                      onChange={(e) => {
                        const travelClass = e.target.value as TravelClass;
                        setNewFlight({ ...newFlight, travelClass });
                      }}
                      error={!!errors.travelClass}
                    >
                      {Object.values(TravelClass).map((cls) => (
                        <MenuItem key={cls} value={cls}>
                          {cls}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.travelClass && <FormHelperText error>{errors.travelClass}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      value={newFlight.flightType}
                      onChange={(e) => {
                        const flightType = e.target.value as FlightType;
                        setNewFlight({ ...newFlight, flightType });
                      }}
                      error={!!errors.flightType}
                    >
                      {Object.values(FlightType).map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.flightType && <FormHelperText error>{errors.flightType}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Aircraft Type</InputLabel>
                    <Select
                      label="Aircraft Name"
                      value={newFlight.aircraftType.id}
                      onChange={(e) => {
                        const aircraftId = e.target.value as number;
                        const aircraft = aircrafts.find(a => a.id === aircraftId);
                        if (aircraft) {
                          setNewFlight({ ...newFlight, aircraftType: aircraft });
                        }
                      }}
                      error={!!errors.aircraftType}
                    >
                      {aircrafts.map((aircraft) => (
                        <MenuItem key={aircraft.id} value={aircraft.id}>
                          {aircraft.model}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.aircraftType && <FormHelperText error>{errors.aircraftType}</FormHelperText>}
                  </FormControl>
                  <TextField
                    label="Capacity"
                    name="capacity"
                    value={newFlight.capacity}
                    onChange={handleNewFlightChange}
                    fullWidth
                    className={styles.textField}
                    error={!!errors.capacity}
                    helperText={errors.capacity}
                  />
                  <FormControl fullWidth className={styles.textField}>
                    <InputLabel>Layovers</InputLabel>
                    <Select
                      label="Layovers"
                      value={newFlight.layovers}
                      onChange={(e) => {
                        const layovers = e.target.value as number;
                        setNewFlight({ ...newFlight, layovers });
                      }}
                      error={!!errors.layovers}
                    >
                      <MenuItem value={0}>None</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                    {errors.layovers && <FormHelperText error>{errors.layovers}</FormHelperText>}
                  </FormControl>
                  {errors.general && (
                    <Box sx={{ color: 'red', textAlign: 'center' }}>{errors.general}</Box>
                  )}
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                      className={`${styles.button} ${styles.buttonSave}`}
                      onClick={handleAddFlight}
                      sx={{ paddingLeft: 3, paddingRight: 3 }}
                    >
                      Add Flight
                    </Button>
                    <Button
                      className={`${styles.button} ${styles.buttonCancel}`}
                      onClick={handleClose}
                      sx={{ paddingLeft: 1, paddingRight: 1 }}
                    >
                      Cancel
                    </Button>
                  </Container>
                </form>
              </Box>
            </Box>
          </Modal>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={flights.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </Layout>
  );
};

export default FlightComponent;
