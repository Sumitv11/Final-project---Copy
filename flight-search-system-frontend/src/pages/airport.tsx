// import React, { useEffect, useState } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//   Button, Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl,
//   TablePagination
// } from '@mui/material';
// import Layout from '@/Components/Layout';
// import styles from '../styles/City.module.css';
// import { useAppDispatch, useAppSelector } from './api/hooks';
// import {
//   fetchAirportsStart,
//   updateAirport,
//   deleteAirport,
//   addAirport
// } from '@/redux/slice/airportSlice';
// import { fetchCitiesStart } from '@/redux/slice/citySlice';
// import { City } from './api/types/city';
// import { Airport } from './api/types/airport';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';

// const AirportComponent = () => {
//   const dispatch = useAppDispatch();
//   const airports = useAppSelector((state) => state.airport.airports);
//   const cities = useAppSelector((state) => state.city.cities);

//   useEffect(() => {
//     dispatch(fetchAirportsStart());
//     dispatch(fetchCitiesStart());
//   }, [dispatch]);

//   const [open, setOpen] = useState(false);
//   const [addOpen, setAddOpen] = useState(false);
//   const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
//   const [newAirport, setNewAirport] = useState<Airport>({
//     id: 0,
//     name: '',
//     iataCode: '',
//     city: { id: 0, name: '', code: '', country: '' }
//   });

//   const handleOpen = (airport: Airport) => {
//     setSelectedAirport(airport);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setAddOpen(false);
//     setNewAirport({
//       id: 0,
//       name: '',
//       iataCode: '',
//       city: { id: 0, name: '', code: '', country: '' }
//     });
//   };

//   const handleSave = () => {
//     if (selectedAirport) {
//       dispatch(updateAirport(selectedAirport));
//       handleClose();
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     if (selectedAirport) {
//       setSelectedAirport({
//         ...selectedAirport,
//         [event.target.name]: event.target.value
//       });
//     }
//   };

//   const handleNewAirportChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setNewAirport({
//       ...newAirport,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleAddAirport = () => {
//     dispatch(addAirport(newAirport));
//     setNewAirport({
//       id: 0,
//       name: '',
//       iataCode: '',
//       city: { id: 0, name: '', code: '', country: '' }
//     });
//     handleClose();
//   };

//   const handleDeleteAirport = (id: number) => {
//     dispatch(deleteAirport(id));
//   };

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);


//   const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const paginatedAirports = airports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


//   return (
//     <Layout>
//       <div className={styles.container}>
//         <Button
//           variant="contained"
//           className={`${styles.button} ${styles.addButton}`}
//           startIcon={<AddIcon />}
//           onClick={() => setAddOpen(true)}
//         >
//           Add Airport
//         </Button>
//         <TableContainer component={Paper} className={styles.tableContainer}>
//           <Table className={styles.table} stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>IATA Code</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedAirports.map((airport: Airport) => (
//                 <TableRow key={airport.id}>
//                   <TableCell>{airport.name}</TableCell>
//                   <TableCell>{airport.iataCode}</TableCell>
//                   <TableCell>{airport.city.name}</TableCell>
//                   <TableCell align="right">
//                     <Button
//                       className={`${styles.button} ${styles.buttonSave}`}
//                       startIcon={<EditNoteIcon />}
//                       onClick={() => handleOpen(airport)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       className={`${styles.button} ${styles.buttonDelete}`}
//                       startIcon={<DeleteIcon />}
//                       onClick={() => handleDeleteAirport(airport.id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {/* Edit Modal */}
//           <Modal open={open} onClose={handleClose}>
//             <Box className={styles.modalContainer}>
//               <Box className={styles.modalContent}>
//                 {selectedAirport && (
//                   <form className={styles.field}>
//                     <TextField
//                       label="ID"
//                       value={selectedAirport.id}
//                       fullWidth
//                       InputProps={{ readOnly: true }}
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="Name"
//                       name="name"
//                       value={selectedAirport.name}
//                       onChange={handleChange}
//                       fullWidth
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="IATA Code"
//                       name="iataCode"
//                       value={selectedAirport.iataCode}
//                       onChange={handleChange}
//                       fullWidth
//                       className={styles.textField}
//                     />
//                     <FormControl fullWidth className={styles.textField}>
//                       <InputLabel>City</InputLabel>
//                       <Select
//                         value={selectedAirport.city.id}
//                         onChange={(e) => {
//                           const cityId = e.target.value as number;
//                           const city = cities.find(c => c.id === cityId);
//                           if (city) {
//                             setSelectedAirport({ ...selectedAirport, city });
//                           }
//                         }}
//                       >
//                         {cities.map((city) => (
//                           <MenuItem key={city.id} value={city.id}>
//                             {city.name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                     <Button
//                       className={`${styles.button} ${styles.buttonSave}`}
//                       onClick={handleSave}
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       className={`${styles.button} ${styles.buttonCancel}`}
//                       onClick={handleClose}
//                     >
//                       Cancel
//                     </Button>
//                   </form>
//                 )}
//               </Box>
//             </Box>
//           </Modal>
//           {/* Add Modal */}
//           <Modal open={addOpen} onClose={handleClose}>
//             <Box className={styles.modalContainer}>
//               <Box className={styles.modalContent}>
//                 <form className={styles.field}>
//                   <TextField
//                     label="Name"
//                     name="name"
//                     value={newAirport.name}
//                     onChange={handleNewAirportChange}
//                     fullWidth
//                     className={styles.textField}
//                   />
//                   <TextField
//                     label="IATA Code"
//                     name="iataCode"
//                     value={newAirport.iataCode}
//                     onChange={handleNewAirportChange}
//                     fullWidth
//                     className={styles.textField}
//                   />
//                   <FormControl fullWidth className={styles.textField}>
//                     <InputLabel>City</InputLabel>
//                     <Select
//                       value={newAirport.city.id}
//                       onChange={(event) => {
//                         const cityId = event.target.value as number;
//                         const selectedCity = cities.find((city) => city.id === cityId);
//                         if (selectedCity) {
//                           setNewAirport({ ...newAirport, city: selectedCity });
//                         }
//                       }}
//                     >
//                       {cities.map((city: City) => (
//                         <MenuItem key={city.id} value={city.id}>
//                           {city.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <Button
//                     className={`${styles.button} ${styles.buttonSave}`}
//                     onClick={handleAddAirport}
//                   >
//                     Add Airport
//                   </Button>
//                   <Button
//                     className={`${styles.button} ${styles.buttonCancel}`}
//                     onClick={handleClose}
//                   >
//                     Cancel
//                   </Button>
//                 </form>
//               </Box>
//             </Box>
//           </Modal>
//           <TablePagination
//             rowsPerPageOptions={[10, 20, 50]}
//             component="div"
//             count={airports.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </div>
//     </Layout>
//   );
// };

// export default AirportComponent;

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl,
  TablePagination, FormHelperText,
  Typography,
  Container
} from '@mui/material';
import Layout from '@/Components/Layout';
import styles from '../styles/City.module.css';
import { useAppDispatch, useAppSelector } from './api/hooks';
import {
  fetchAirportsStart,
  updateAirport,
  deleteAirport,
  addAirport
} from '@/redux/slice/airportSlice';
import { fetchCitiesStart } from '@/redux/slice/citySlice';
import { City } from './api/types/city';
import { Airport } from './api/types/airport';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { areObjectsEqual } from './api/utils/objectChecker';

const AirportComponent = () => {
  const dispatch = useAppDispatch();
  const airports = useAppSelector((state) => state.airport.airports);
  const cities = useAppSelector((state) => state.city.cities);

  useEffect(() => {
    dispatch(fetchAirportsStart());
    dispatch(fetchCitiesStart());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<Airport>({
    id: 0,
    name: '',
    iataCode: '',
    city: { id: 0, name: '', code: '', country: '' }
  });

  const [newAirport, setNewAirport] = useState<Airport>({
    id: 0,
    name: '',
    iataCode: '',
    city: { id: 0, name: '', code: '', country: '' }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [existingAirport, setExistingAirport] = useState<Airport>();

  const handleOpen = (airport: Airport) => {
    setSelectedAirport(airport);
    setExistingAirport(airport);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddOpen(false);
    setNewAirport({
      id: 0,
      name: '',
      iataCode: '',
      city: { id: 0, name: '', code: '', country: '' }
    });
    setErrors({
      name: '',
      iataCode: '',
      city: ''
    });
  };

  const validateFields = (airport: Airport) => {
    const errors: { [key: string]: string } = {};
    if (!airport.name) errors.name = 'Name is required';
    if (!airport.iataCode) {
      errors.iataCode = 'IATA Code is required';
    } else if (airport.iataCode.length !== 3) {
      errors.iataCode = 'IATA Code must be exactly 3 characters';
    }
    if (!airport.city.id) errors.city = 'City is required';

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateFields(selectedAirport);
    if (Object.keys(validationErrors).length === 0) {
      if (!areObjectsEqual(selectedAirport, existingAirport)) {
        dispatch(updateAirport(selectedAirport));
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
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedAirport) {
      setSelectedAirport({
        ...selectedAirport,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleNewAirportChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewAirport({
      ...newAirport,
      [event.target.name]: event.target.value
    });
  };

  const handleAddAirport = () => {
    const validationErrors = validateFields(newAirport);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addAirport(newAirport));
      setNewAirport({
        id: 0,
        name: '',
        iataCode: '',
        city: { id: 0, name: '', code: '', country: '' }
      });
      handleClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDeleteAirport = (id: number) => {
    dispatch(deleteAirport(id));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedAirports = airports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - airports.length) : 0;

  return (
    <Layout>
      <div className={styles.container}>
        <Button
          variant="contained"
          className={`${styles.button} ${styles.addButton}`}
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
        >
          Add 
        </Button>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>IATA Code</TableCell>
                <TableCell>City</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAirports.map((airport: Airport) => (
                <TableRow key={airport.id}>
                  <TableCell>{airport.name}</TableCell>
                  <TableCell>{airport.iataCode}</TableCell>
                  <TableCell>{airport.city.name}</TableCell>
                  <TableCell align="center">
                    <div className={styles.buttonAlign}>
                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        startIcon={<EditNoteIcon />}
                        onClick={() => handleOpen(airport)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={`${styles.button} ${styles.buttonDelete}`}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteAirport(airport.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
            <TableRow style={{ height: 75 * emptyRows }}>
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
                  Edit Airport
                </Typography>
                {selectedAirport && (
                  <form className={styles.field}>
                    <TextField
                      label="Name"
                      name="name"
                      value={selectedAirport.name}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name}
                      className={styles.textField}
                    />
                    <TextField
                      label="IATA Code"
                      name="iataCode"
                      value={selectedAirport.iataCode}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.iataCode}
                      helperText={errors.iataCode}
                      className={styles.textField}
                    />
                    <FormControl fullWidth className={styles.textField} error={!!errors.city}>
                      <InputLabel>City</InputLabel>
                      <Select
                        value={selectedAirport.city.id}
                        onChange={(e) => {
                          const cityId = e.target.value as number;
                          const city = cities.find(c => c.id === cityId);
                          if (city) {
                            setSelectedAirport({ ...selectedAirport, city });
                          }
                        }}
                      >
                        {cities.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.city}</FormHelperText>
                    </FormControl>
                    {errors.general && (
                      <Box sx={{ color: 'red' }}>{errors.general}</Box>
                    )}
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>


                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        onClick={handleSave}
                        sx={{ paddingLeft: 3, paddingRight: 3 }}
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
                  Add a new Airport
                </Typography>
                <form className={styles.field}>
                  <TextField
                    label="Name"
                    name="name"
                    value={newAirport.name}
                    onChange={handleNewAirportChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    className={styles.textField}
                  />
                  <TextField
                    label="IATA Code"
                    name="iataCode"
                    value={newAirport.iataCode}
                    onChange={handleNewAirportChange}
                    fullWidth
                    error={!!errors.iataCode}
                    helperText={errors.iataCode}
                    className={styles.textField}
                  />
                  <FormControl fullWidth className={styles.textField} error={!!errors.city}>
                    <InputLabel>City</InputLabel>
                    <Select
                      label='City'
                      value={newAirport.city.id}
                      onChange={(event) => {
                        const cityId = event.target.value as number;
                        const selectedCity = cities.find((city) => city.id === cityId);
                        if (selectedCity) {
                          setNewAirport({ ...newAirport, city: selectedCity });
                        }
                      }}
                    >
                      {cities.map((city: City) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.city}</FormHelperText>
                  </FormControl>
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                      className={`${styles.button} ${styles.buttonSave}`}
                      onClick={handleAddAirport}
                      sx={{ paddingLeft: 3, paddingRight: 3 }}
                    >
                      Add Airport
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
            count={airports.length}
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

export default AirportComponent;
