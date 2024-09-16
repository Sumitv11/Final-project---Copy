import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, Box, TextField,
  TablePagination,
  Container,
  Typography
} from '@mui/material';
import Layout from '@/Components/Layout';
import styles from '../styles/City.module.css';
import { addAirline, deleteAirline, fetchAirlinesStart, updateAirline } from '@/redux/slice/airlineSlice';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { Airline } from '@/pages/api/types/airline';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { areObjectsEqual } from './api/utils/objectChecker';

const AirlineComponent = () => {
  const dispatch = useAppDispatch();
  const airlines = useAppSelector((state) => state.airline.airlines);

  useEffect(() => {
    dispatch(fetchAirlinesStart());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState<Airline>({
    id: 0,
    name: '',
  });
  const [newAirline, setNewAirline] = useState<Airline>({
    id: 0,
    name: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [existingAirline, setExistingAirline] = useState<Airline>();

  const handleOpen = (airline: Airline) => {
    setSelectedAirline(airline);
    setExistingAirline(airline);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddOpen(false);
    setErrors({});
    setNewAirline({
      id: 0,
      name: ''
    });
  };

  const validateAirline = (airline: Airline) => {
    const errors: { [key: string]: string } = {};
    if (!airline.name.trim()) errors.name = 'Name is required';
    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateAirline(selectedAirline);
    if (Object.keys(validationErrors).length === 0) {
      if (!areObjectsEqual(selectedAirline, existingAirline)) {
        dispatch(updateAirline(selectedAirline));
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
    setSelectedAirline({ ...selectedAirline, [event.target.name]: event.target.value });
  };

  const handleAddAirline = () => {
    const validationErrors = validateAirline(newAirline);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(addAirline(newAirline));
    handleClose();
  };

  const handleNewAirlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAirline({ ...newAirline, [event.target.name]: event.target.value });
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

  const paginatedAirlines = airlines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - airlines.length) : 0;

  return (
    <Layout>
      <div className={styles.container}>
        <Button
          variant="contained"
          className={`${styles.button} ${styles.addButton}`}
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
        >
          Add Airline
        </Button>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: '50%' }}>
              {paginatedAirlines.map((airline: Airline) => (
                <TableRow key={airline.id}>
                  <TableCell align='center'>{airline.name}</TableCell>
                  <TableCell align="right">
                    <div className={styles.buttonAlign}>
                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        startIcon={<EditIcon />}
                        onClick={() => handleOpen(airline)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={`${styles.button} ${styles.buttonDelete}`}
                        startIcon={<DeleteIcon />}
                        onClick={() => dispatch(deleteAirline(airline.id))}
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
                  Edit Airline
                </Typography>
                {selectedAirline && (
                  <form className={styles.field}>
                    <TextField
                      label="ID"
                      value={selectedAirline.id}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      className={styles.textField}
                    />
                    <TextField
                      label="Name"
                      name="name"
                      value={selectedAirline.name}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name}
                      className={styles.textField}
                    />
                    {errors.general && (
                      <Box sx={{ color: 'red' }}>{errors.general}</Box>
                    )}
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        sx={{ paddingLeft: 3, paddingRight: 3 }}
                        onClick={handleSave}
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
                  Add a new Airline
                </Typography>
                <form className={styles.field}>
                  <TextField
                    label="Name"
                    name="name"
                    value={newAirline.name}
                    onChange={handleNewAirlineChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    className={styles.textField}
                  />

                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                      className={`${styles.button} ${styles.buttonSave}`}
                      onClick={handleAddAirline}
                    >
                      Add Airline
                    </Button>
                    <Button
                      className={`${styles.button} ${styles.buttonCancel}`}
                      onClick={handleClose}
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
            count={airlines.length}
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

export default AirlineComponent;
