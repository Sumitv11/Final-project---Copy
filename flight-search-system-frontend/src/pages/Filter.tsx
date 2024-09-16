import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import { FormLabel, FormControlLabel, Checkbox, FormControl, MenuItem, Select, InputLabel, Autocomplete, Grid, TextField, Button, Slider, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { TravelClass } from './api/types/travelclass';
import { FlightType } from './api/types/flightType';
import FlightComponent from '@/Components/FlightComponent';
import { Flight } from './api/types/flight';
import styles from '../styles/Searchform.module.css';
import { Airport } from './api/types/airport';
import { Aircraft } from './api/types/aircraft';
import { fetchAircraftStart } from '@/redux/slice/aircraftSlice';
import { fetchAirportsStart } from '@/redux/slice/airportSlice';
import { fetchAirlinesStart } from '@/redux/slice/airlineSlice';
import { Airline } from './api/types/airline';
import { fetchFlightStart, filterFlightStart } from '@/redux/slice/flightSlice';
import { FlightFilterDto } from './api/types/flightFilterDto';

const Filter = () => {
    const [price, setPrice] = useState<number>(1000);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [sourceAirportId, setSourceAirportId] = useState<number | null>(0);
    const [destinationAirportId, setDestinationAirportId] = useState<number | null>(0);
    const [isSelect, setIsSelect] = useState(false);
    const [returnTrip, setReturnTrip] = useState(true);
    const [departureDate, setDepartureDate] = useState<string | ''>('');
    const [returnDate, setReturnDate] = useState<string | ''>('');
    const [travelClass, setTravelClass] = useState<TravelClass | string>(TravelClass.ECONOMY);
    const [flightType, setFlightType] = useState<FlightType | string>(FlightType.ONEWAY);
    const [airlinesId, setAirlinesId] = useState<number[]>([]);
    const [aircraftsId, setAircraftsId] = useState<number[]>([]);
    const [layovers, setLayovers] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [totalMinutes, setTotalMinutes] = useState<number>(0);

    const dispatch = useAppDispatch();
    const flights: Flight[] = useAppSelector((state) => state.flight.flights);
    const loading = useAppSelector((state) => state.flight.loading);
    const airlines: Airline[] = useAppSelector((state) => state.airline.airlines);
    const airports: Airport[] = useAppSelector((state) => state.airport.airports);
    const aircrafts: Aircraft[] = useAppSelector((state) => state.aircraft.aircraft);

    const [newFlightFilterDto, setNewFlightFilterDto] = useState<FlightFilterDto>({});

    useEffect(() => {
        dispatch(fetchAircraftStart());
        dispatch(fetchAirportsStart());
        dispatch(fetchAirlinesStart());
        dispatch(fetchFlightStart());
    }, [dispatch]);


    useEffect(() => {
        console.log(newFlightFilterDto);
        if (Object.keys(newFlightFilterDto).length > 0) {
            dispatch(filterFlightStart(newFlightFilterDto));
        } else {
            dispatch(fetchFlightStart());
        }
    }, [newFlightFilterDto, dispatch, airlinesId]);



    const handleSelectTrip = (event: SelectChangeEvent<string>) => {
        const newflightType = (event.target.value === 'None') ? null : event.target.value as string;
        setFlightType(event.target.value);

        event.target.value == FlightType.ROUNDTRIP ? setIsSelect(true) : setIsSelect(false);

        // if (newflightType) {
            // if (newflightType === 'ONE_WAY') {
                setNewFlightFilterDto(prevState => ({
                    ...prevState,
                    flightType: newflightType
                }));
            // }
        // }
    };

    const handleDepartureDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const date = event.target.value.length > 0 ? event.target.value : null;

        if (date) {
            const newDate = new Date(event.target.value);
            const formattedDate = new Date(newDate.setHours(10, 0, 0, 0)).toISOString().slice(0, 19);

            setDepartureDate(date);
            setNewFlightFilterDto(prevState => ({
                ...prevState,
                deptDate: formattedDate
            }));
        }
        else {
            setDepartureDate('');
            setNewFlightFilterDto(prevState => ({
                ...prevState,
                deptDate: date
            }));

        }
    };

    const handleReturnDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const date = event.target.value.length > 0 ? event.target.value : null;

        if (date) {
            const newDate = new Date(event.target.value);
            const formattedDate = new Date(newDate.setHours(10, 0, 0, 0)).toISOString().slice(0, 19);

            setReturnDate(date);
            setNewFlightFilterDto(prevState => ({
                ...prevState,
                deptDate: formattedDate
            }));
        }
        else {
            setReturnDate('');
            setNewFlightFilterDto(prevState => ({
                ...prevState,
                returnDate: date
            }));

        }
    };

    const handleTravelClassChange = (event: SelectChangeEvent<string>) => {
        const newTravelClass = (event.target.value === 'None') ? null : event.target.value as string;
        setTravelClass(event.target.value);

        setNewFlightFilterDto(prevState => ({
            ...prevState,
            travelClass: newTravelClass
        }));

    };

    const handleAirlineCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(event.target.name);
        const isChecked = event.target.checked;
        let updatedAirlinesId = isChecked
            ? [...airlinesId, id]
            : airlinesId.filter((airlineId) => airlineId !== id);

        setAirlinesId(updatedAirlinesId);

        (updatedAirlinesId.length > 0) ?
            setNewFlightFilterDto(prevState => ({
                ...prevState,
                airlines: updatedAirlinesId
            })) : setNewFlightFilterDto(prevState => ({
                ...prevState,
                airlines: null
            }));

    };

    const handleAircraftCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(event.target.name);
        const isChecked = event.target.checked;
        const updatedAircraftsId = isChecked
            ? [...aircraftsId, id]
            : aircraftsId.filter((aircraftId) => aircraftId !== id);

        setAircraftsId(updatedAircraftsId);
        setNewFlightFilterDto(prevState => ({
            ...prevState,
            aircrafts: updatedAircraftsId
        }));
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        const updatedValue = Array.isArray(newValue) ? newValue[0] : newValue;
        setPrice(updatedValue);
        setNewFlightFilterDto(prevState => ({
            ...prevState,
            maxPrice: updatedValue
        }));
    };

    const handleLayoversChange = (event: SelectChangeEvent<number>) => {
        const newLayovers = parseInt(event.target.value as string);
        setLayovers(newLayovers);
        setNewFlightFilterDto(prevState => ({
            ...prevState,
            layovers: newLayovers
        }));
    };

    const handleSourceAirport = (event: React.SyntheticEvent<Element, Event>, value: Airport | null) => {
        const newSourceAirportId = value ? value.id : null;

        setSourceAirportId(newSourceAirportId);
        setNewFlightFilterDto(prevState => ({
            ...prevState,
            originAirportId: newSourceAirportId
        }));
    }

    const handleDestinationAirport = (event: React.SyntheticEvent<Element, Event>, value: Airport | null) => {
        const newDestinationAirportId = value ? value.id : null;

        setDestinationAirportId(newDestinationAirportId);
        setNewFlightFilterDto(prevState => ({
            ...prevState,
            destinationAirportId: newDestinationAirportId
        }));
    }

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const value = newValue as number;
        setSliderValue(value);
        updateTotalMinutes(value);
    };

    const updateTotalMinutes = (value: number) => {
        const hours = Math.floor(value);
        const minutes = (value - hours) * 60;
        const total = hours * 60 + Math.round(minutes);
        setTotalMinutes(total);
        setNewFlightFilterDto(prevState => ({
            ...prevState,
            time: total
        }));
    };

    const handleClearFilters = () => {
        setPrice(1000);
        setSelectedFlight(null);
        setSourceAirportId(0);
        setDestinationAirportId(0);
        setIsSelect(false);
        setReturnTrip(true);
        setDepartureDate('');
        setReturnDate('');
        setTravelClass(TravelClass.ECONOMY);
        setFlightType(FlightType.ONEWAY);
        setAirlinesId([]);
        setAircraftsId([]);
        setLayovers(0);
        setSliderValue(0);
        setTotalMinutes(0);

        setNewFlightFilterDto({});
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.filterSidebar}>
                <Container style={{ marginLeft: '0px' }}>
                    <Button variant="contained" onClick={handleClearFilters} className='mb-2'>Clear Filter</Button>
                    <FormControl variant="outlined" fullWidth>
                        <Typography gutterBottom>Time</Typography>
                        <Slider className={styles.accordion}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            aria-labelledby="decimal-time-slider"
                            min={1}
                            max={12}
                            step={0.5}
                            valueLabelDisplay="auto"
                            marks
                            getAriaValueText={(value) => `${value} hours`}
                        />
                        <Box mt={2}>
                            <Typography>Selected Time: {sliderValue} hours</Typography>
                            <Typography>Total Minutes: {totalMinutes}</Typography>
                        </Box>
                    </FormControl>

                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Aircraft</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormLabel component="legend">Aircraft</FormLabel>
                                {aircrafts.map(value => (
                                    <FormControlLabel
                                        key={value.id}
                                        control={
                                            <Checkbox
                                                onChange={handleAircraftCheckboxChange}
                                                name={value.id.toString()}
                                            />
                                        }
                                        label={value.model}
                                    />
                                ))}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Travel Class</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth className={styles.textField}
                                size="small">
                                <InputLabel>Travel Class</InputLabel>
                                <Select
                                    value={travelClass || "None"}
                                    onChange={handleTravelClassChange}
                                    label="travel Class"
                                ><MenuItem key='None' value='None'>None</MenuItem>
                                    {Object.values(TravelClass).map((cls) => (
                                        <MenuItem key={cls} value={cls}>
                                            {cls}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded className={styles.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Airline</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormLabel component="legend">Airline</FormLabel>
                                {airlines.map(value => (
                                    <FormControlLabel
                                        key={value.id}
                                        control={
                                            <Checkbox
                                                onChange={handleAirlineCheckboxChange}
                                                name={value.id.toString()}
                                            />
                                        }
                                        label={value.name}
                                    />
                                ))}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                    <FormControl fullWidth>
                        <InputLabel>Layovers</InputLabel>
                        <Select
                            value={layovers}
                            onChange={handleLayoversChange}
                            label="Layovers"
                            size="small"
                        >
                            <MenuItem value={0}>None</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography sx={{ marginTop: '10%' }}>
                        Price
                        <Slider
                            value={price}
                            min={1000}
                            max={10000}
                            onChange={handlePriceChange}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            size="small"
                        />
                    </Typography>
                </Container>
            </div>

            <div className={styles.mainContainer}>
                <Grid container style={{ width: '100%' }}>
                    <FormControl className={styles.input} fullWidth>
                        <InputLabel>Flight Type</InputLabel>
                        <Select
                            value={flightType || 'None'}
                            onChange={handleSelectTrip}
                            label="Flight Type"
                            size="small"
                        >
                            <MenuItem value='None'>None</MenuItem>
                            <MenuItem value={FlightType.ONEWAY}>One Way</MenuItem>
                            <MenuItem value={FlightType.ROUNDTRIP}>Round Trip</MenuItem>
                        </Select>
                    </FormControl>

                    <Autocomplete
                        className={styles.inputDestination}
                        getOptionLabel={(option) => option.name}
                        options={airports}
                        onChange={handleSourceAirport}
                        renderInput={(params) => (
                            <TextField {...params} label="Origin City" variant="outlined" required />
                        )}
                        size="small"
                    />

                    <Autocomplete
                        className={styles.inputDestination}
                        getOptionLabel={(option) => option.name}
                        options={airports}
                        onChange={handleDestinationAirport}
                        renderInput={(params) => (
                            <TextField {...params} label="Destination City" variant="outlined" required />
                        )}
                        size="small"
                    />

                    <TextField
                        className={styles.inputDestination}
                        label="Journey Date"
                        type="date"
                        value={departureDate || ''}
                        onChange={handleDepartureDateChange}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                    />

                    {isSelect && (
                        <TextField
                            className={styles.inputDestination}
                            label="Return Date"
                            type="date"
                            value={returnDate}
                            onChange={handleReturnDateChange}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                        />
                    )}
                </Grid>

                <FlightComponent flights={flights} />
            </div>
        </div>
    );
};

export default Filter;
