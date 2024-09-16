// import React, { useEffect, useState } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//   Button, Modal, Box, TextField,
//   TablePagination
// } from '@mui/material';
// import Layout from '@/Components/Layout';
// import { addCity, deleteCity, fetchCitiesStart, updateCity } from '@/redux/slice/citySlice';
// import styles from '../styles/City.module.css';
// import { useAppDispatch, useAppSelector } from './api/hooks';
// import { City } from '@/pages/api/types/city';
// import EditIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';

// const CityComponent = () => {
//   const dispatch = useAppDispatch();
//   const cities = useAppSelector((state) => state.city.cities);

//   useEffect(() => {
//     dispatch(fetchCitiesStart());
//   }, [dispatch]);

//   const [open, setOpen] = useState(false);
//   const [addOpen, setAddOpen] = useState(false);
//   const [selectedCity, setSelectedCity] = useState<City>({
//     id: 0,
//     name: '',
//     code: '',
//     country: ''
//   });
//   const [newCity, setNewCity] = useState<City>({
//     id: 0,
//     name: '',
//     code: '',
//     country: ''
//   });

//   const handleOpen = (city: City) => {
//     setSelectedCity(city);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setAddOpen(false);
//     setNewCity({
//       id: 0,
//       name: '',
//       code: '',
//       country: ''
//     });
//   };

//   const handleSave = () => {
//     if (selectedCity.id) {
//       dispatch(updateCity(selectedCity));
//     }
//     handleClose();
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setSelectedCity({ ...selectedCity, [event.target.name]: event.target.value });
//   };

//   const handleAddCity = () => {
//     dispatch(addCity(newCity));
//     handleClose(); 
//   };

//   const handleNewCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCity({ ...newCity, [event.target.name]: event.target.value });
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


//   const paginatedCities = cities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <Button
//           variant="contained"
//           className={`${styles.button} ${styles.addButton}`}
//           startIcon={<AddIcon/>}
//           onClick={() => setAddOpen(true)}
//         >
//           Add City
//         </Button>
//         <TableContainer component={Paper} className={styles.tableContainer}>
//           <Table className={styles.table} stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Code</TableCell>
//                 <TableCell>Country</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedCities.map((city: City) => (
//                 <TableRow key={city.id}>
//                   <TableCell>{city.id}</TableCell>
//                   <TableCell>{city.name}</TableCell>
//                   <TableCell>{city.code}</TableCell>
//                   <TableCell>{city.country}</TableCell>
//                   <TableCell align="right">
//                     <Button
//                       className={`${styles.button} ${styles.buttonSave}`}
//                       startIcon={<EditIcon/>}
//                       onClick={() => handleOpen(city)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       className={`${styles.button} ${styles.buttonDelete}`}
//                       startIcon={<DeleteIcon/>}
//                       onClick={() => dispatch(deleteCity(city.id))}
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
//                 {selectedCity && (
//                   <form className={styles.field}>
//                     <TextField
//                       label="ID"
//                       value={selectedCity.id}
//                       fullWidth
//                       InputProps={{ readOnly: true }}
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="Name"
//                       name="name"
//                       value={selectedCity.name}
//                       onChange={handleChange}
//                       fullWidth
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="Code"
//                       name="code"
//                       value={selectedCity.code}
//                       onChange={handleChange}
//                       fullWidth
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="Country"
//                       name="country"
//                       value={selectedCity.country}
//                       onChange={handleChange}
//                       fullWidth
//                       className={styles.textField}
//                     />
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
//                     value={newCity.name}
//                     onChange={handleNewCityChange}
//                     fullWidth
//                     className={styles.textField}
//                   />
//                   <TextField
//                     label="Code"
//                     name="code"
//                     value={newCity.code}
//                     onChange={handleNewCityChange}
//                     fullWidth
//                     className={styles.textField}
//                   />
//                   <TextField
//                     label="Country"
//                     name="country"
//                     value={newCity.country}
//                     onChange={handleNewCityChange}
//                     fullWidth
//                     className={styles.textField}
//                   />
//                   <Button
//                     className={`${styles.button} ${styles.buttonSave}`}
//                     onClick={handleAddCity}
//                   >
//                     Add City
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
//             count={cities.length}
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

// export default CityComponent;


// import React, { useEffect, useState } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//   Button, Modal, Box, TextField, TablePagination, FormHelperText
// } from '@mui/material';
// import Layout from '@/Components/Layout';
// import {
//   addCity, deleteCity, fetchCitiesStart, updateCity
// } from '@/redux/slice/citySlice';
// import styles from '../styles/City.module.css';
// import { useAppDispatch, useAppSelector } from './api/hooks';
// import { City } from '@/pages/api/types/city';
// import EditIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';

// const CityComponent = () => {
//   const dispatch = useAppDispatch();
//   const cities = useAppSelector((state) => state.city.cities);

//   useEffect(() => {
//     dispatch(fetchCitiesStart());
//   }, [dispatch]);

//   const [open, setOpen] = useState(false);
//   const [addOpen, setAddOpen] = useState(false);
//   const [selectedCity, setSelectedCity] = useState<City | null>(null);
//   const [newCity, setNewCity] = useState<City>({
//     id: 0,
//     name: '',
//     code: '',
//     country: ''
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     code: '',
//     country: ''
//   });

//   const validateFields = (city: City) => {
//     const errors: any = {};
//     if (!city.name) errors.name = 'Name is required';
//     if (!city.code) errors.code = 'Code is required';
//     if (!city.country) errors.country = 'Country is required';

//     return errors;
//   };

//   const handleOpen = (city: City) => {
//     setSelectedCity(city);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setAddOpen(false);
//     setNewCity({
//       id: 0,
//       name: '',
//       code: '',
//       country: ''
//     });
//     setErrors({
//       name: '',
//       code: '',
//       country: ''
//     });
//   };

//   const handleSave = () => {
//     if (selectedCity) {
//       const validationErrors = validateFields(selectedCity);
//       if (Object.keys(validationErrors).length === 0) {
//         dispatch(updateCity(selectedCity));
//         handleClose();
//       } else {
//         setErrors(validationErrors);
//       }
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     if (selectedCity) {
//       setSelectedCity({
//         ...selectedCity,
//         [event.target.name]: event.target.value
//       });
//     }
//   };

//   const handleNewCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewCity({
//       ...newCity,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleAddCity = () => {
//     const validationErrors = validateFields(newCity);
//     if (Object.keys(validationErrors).length === 0) {
//       dispatch(addCity(newCity));
//       handleClose();
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const handleDeleteCity = (id: number) => {
//     dispatch(deleteCity(id));
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

//   const paginatedCities = cities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <Button
//           variant="contained"
//           className={`${styles.button} ${styles.addButton}`}
//           startIcon={<AddIcon />}
//           onClick={() => setAddOpen(true)}
//         >
//           Add City
//         </Button>
//         <TableContainer component={Paper} className={styles.tableContainer}>
//           <Table className={styles.table} stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Code</TableCell>
//                 <TableCell>Country</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedCities.map((city: City) => (
//                 <TableRow key={city.id}>
//                   <TableCell>{city.name}</TableCell>
//                   <TableCell>{city.code}</TableCell>
//                   <TableCell>{city.country}</TableCell>
//                   <TableCell align="right">
//                     <Button
//                       className={`${styles.button} ${styles.buttonSave}`}
//                       startIcon={<EditIcon />}
//                       onClick={() => handleOpen(city)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       className={`${styles.button} ${styles.buttonDelete}`}
//                       startIcon={<DeleteIcon />}
//                       onClick={() => handleDeleteCity(city.id)}
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
//                 {selectedCity && (
//                   <form className={styles.field}>
//                     <TextField
//                       label="Name"
//                       name="name"
//                       value={selectedCity.name}
//                       onChange={handleChange}
//                       fullWidth
//                       error={!!errors.name}
//                       helperText={errors.name}
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="Code"
//                       name="code"
//                       value={selectedCity.code}
//                       onChange={handleChange}
//                       fullWidth
//                       error={!!errors.code}
//                       helperText={errors.code}
//                       className={styles.textField}
//                     />
//                     <TextField
//                       label="Country"
//                       name="country"
//                       value={selectedCity.country}
//                       onChange={handleChange}
//                       fullWidth
//                       error={!!errors.country}
//                       helperText={errors.country}
//                       className={styles.textField}
//                     />
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
//                     value={newCity.name}
//                     onChange={handleNewCityChange}
//                     fullWidth
//                     error={!!errors.name}
//                     helperText={errors.name}
//                     className={styles.textField}
//                   />
//                   <TextField
//                     label="Code"
//                     name="code"
//                     value={newCity.code}
//                     onChange={handleNewCityChange}
//                     fullWidth
//                     error={!!errors.code}
//                     helperText={errors.code}
//                     className={styles.textField}
//                   />
//                   <TextField
//                     label="Country"
//                     name="country"
//                     value={newCity.country}
//                     onChange={handleNewCityChange}
//                     fullWidth
//                     error={!!errors.country}
//                     helperText={errors.country}
//                     className={styles.textField}
//                   />
//                   <Button
//                     className={`${styles.button} ${styles.buttonSave}`}
//                     onClick={handleAddCity}
//                   >
//                     Add City
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
//             count={cities.length}
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

// export default CityComponent;


import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, Box, TextField, TablePagination,
  Container,
  Typography
} from '@mui/material';
import Layout from '@/Components/Layout';
import {
  addCity, deleteCity, fetchCitiesStart, updateCity
} from '@/redux/slice/citySlice';
import styles from '../styles/City.module.css';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { City } from '@/pages/api/types/city';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const CityComponent = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.city.cities);

  useEffect(() => {
    dispatch(fetchCitiesStart());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [existingCity, setExistingCity] = useState<City | null>(null);
  const [newCity, setNewCity] = useState<City>({
    id: 0,
    name: '',
    code: '',
    country: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    code: '',
    country: '',
    general: ''
  });

  const validateFields = (city: City) => {
    const errors: any = {};
    if (!city.name) errors.name = 'Name is required';
    if (!city.code) errors.code = 'Code is required';
    if (!city.country) errors.country = 'Country is required';

    return errors;
  };

  const hasChanges = (original: City, updated: City | null) => {
    if (original && updated) {
      return original.name !== updated.name || original.code !== updated.code || original.country !== updated.country;
    }
  };

  const handleOpen = (city: City) => {
    setSelectedCity(city);
    setExistingCity(city);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddOpen(false);
    setNewCity({
      id: 0,
      name: '',
      code: '',
      country: ''
    });
    setErrors({
      name: '',
      code: '',
      country: '',
      general: ''
    });
  };

  const handleSave = () => {
    if (selectedCity) {
      const validationErrors = validateFields(selectedCity);
      if (Object.keys(validationErrors).length === 0) {
        if (hasChanges(selectedCity, existingCity)) {
          dispatch(updateCity(selectedCity));
          handleClose();
        } else {
          setErrors({
            ...errors,
            general: 'No changes detected'
          });
        }
      } else {
        setErrors(validationErrors);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedCity) {
      setSelectedCity({
        ...selectedCity,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleNewCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity({
      ...newCity,
      [event.target.name]: event.target.value
    });
  };

  const handleAddCity = () => {
    const validationErrors = validateFields(newCity);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addCity(newCity));
      handleClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDeleteCity = (id: number) => {
    dispatch(deleteCity(id));
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

  const paginatedCities = cities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cities.length) : 0;
  return (
    <Layout>
      <div className={styles.container}>
        <Button
          variant="contained"
          className={`${styles.button} ${styles.addButton}`}
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
        >
          Add City
        </Button>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Country</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCities.map((city: City) => (
                <TableRow key={city.id}>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>{city.code}</TableCell>
                  <TableCell>{city.country}</TableCell>
                  <TableCell align="center">
                    <div className={styles.buttonAlign}>
                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        startIcon={<EditIcon />}
                        onClick={() => handleOpen(city)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={`${styles.button} ${styles.buttonDelete}`}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteCity(city.id)}
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
                 Edit City
                </Typography>
                {selectedCity && (
                  <form className={styles.field}>
                    <TextField
                      label="ID"
                      value={selectedCity.id}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      className={styles.textField}
                    />
                    <TextField
                      label="Name"
                      name="name"
                      value={selectedCity.name}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name}
                      className={styles.textField}
                    />
                    <TextField
                      label="Code"
                      name="code"
                      value={selectedCity.code}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.code}
                      helperText={errors.code}
                      className={styles.textField}
                    />
                    <TextField
                      label="Country"
                      name="country"
                      value={selectedCity.country}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.country}
                      helperText={errors.country}
                      className={styles.textField}
                    />
                    {errors.general && (
                      <Box sx={{ color: 'red' }}>{errors.general}</Box>
                    )}
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        className={`${styles.button} ${styles.buttonCancel}`}
                        onClick={handleClose}
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
                  Add a new City
                </Typography>
                <form className={styles.field}>
                  <TextField
                    label="Name"
                    name="name"
                    value={newCity.name}
                    onChange={handleNewCityChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    className={styles.textField}
                  />
                  <TextField
                    label="Code"
                    name="code"
                    value={newCity.code}
                    onChange={handleNewCityChange}
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code}
                    className={styles.textField}
                  />
                  <TextField
                    label="Country"
                    name="country"
                    value={newCity.country}
                    onChange={handleNewCityChange}
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country}
                    className={styles.textField}
                  />
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                      className={`${styles.button} ${styles.buttonSave}`}
                      onClick={handleAddCity}
                      sx={{ paddingLeft: 3, paddingRight: 3 }}
                    >
                      Add City
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
            count={cities.length}
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

export default CityComponent;
