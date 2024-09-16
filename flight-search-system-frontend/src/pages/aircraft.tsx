import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Modal, Box, TextField,
  TablePagination,
  Typography,
  Container
} from '@mui/material';
import Layout from '@/Components/Layout';
import styles from '../styles/City.module.css';
import { addAircraft, deleteAircraft, fetchAircraftStart, updateAircraft } from '@/redux/slice/aircraftSlice';
import { useAppDispatch, useAppSelector } from './api/hooks';
import { Aircraft } from '@/pages/api/types/aircraft';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { areObjectsEqual } from './api/utils/objectChecker';

const AircraftComponent = () => {
  const dispatch = useAppDispatch();
  const aircrafts = useAppSelector((state) => state.aircraft.aircraft);

  useEffect(() => {
    dispatch(fetchAircraftStart());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft>({
    id: 0,
    model: '',
    maxTakeoffWeight: 1000,
    seatingCapacity: 545,
  });
  const [newAircraft, setNewAircraft] = useState<Aircraft>({
    id: 0,
    model: '',
    maxTakeoffWeight: 0,
    seatingCapacity: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [existingAircraft, setExistingAircraft] = useState<Aircraft>();

  const handleOpen = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setExistingAircraft(aircraft);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddOpen(false);
    setErrors({});
    setNewAircraft({
      id: 0,
      model: '',
      maxTakeoffWeight: 0,
      seatingCapacity: 0,
    });
  };

  const handleSave = () => {
    const validationErrors = validateAircraft(selectedAircraft);
    if (Object.keys(validationErrors).length === 0) {
      if (!areObjectsEqual(selectedAircraft, existingAircraft)) {
        dispatch(updateAircraft(selectedAircraft));
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
    setSelectedAircraft({ ...selectedAircraft, [event.target.name]: event.target.value });
  };

  const handleAddAircraft = () => {
    const validationErrors = validateAircraft(newAircraft);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(addAircraft(newAircraft));
    handleClose();
  };

  const handleNewAircraftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAircraft({ ...newAircraft, [event.target.name]: event.target.value });
  };

  const validateAircraft = (aircraft: Aircraft) => {
    const errors: { [key: string]: string } = {};
    if (!aircraft.model.trim()) errors.model = 'Model is required';
    if (aircraft.maxTakeoffWeight <= 0) errors.maxTakeoffWeight = 'Max Takeoff Weight must not be zero';
    if (aircraft.seatingCapacity <= 0) errors.seatingCapacity = 'Seating Capacity must not be zero';
    return errors;
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

  const paginatedAircrafts = aircrafts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - aircrafts.length) : 0;

  return (
    <Layout>
      <div className={styles.container}>
        <Button
          variant="contained"
          className={`${styles.button} ${styles.addButton}`}
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
        >
          Add Aircraft
        </Button>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell>Max Takeoff Weight</TableCell>
                <TableCell>Seating Capacity</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAircrafts.map((aircraft: Aircraft) => (
                <TableRow key={aircraft.id}>
                  <TableCell>{aircraft.model}</TableCell>
                  <TableCell>{aircraft.maxTakeoffWeight}</TableCell>
                  <TableCell>{aircraft.seatingCapacity}</TableCell>
                  <TableCell align="center" >
                    <div className={styles.buttonAlign}>
                      <Button
                        className={`${styles.button} ${styles.buttonSave}`}
                        startIcon={<EditNoteIcon />}
                        onClick={() => handleOpen(aircraft)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={`${styles.button} ${styles.buttonDelete}`}
                        startIcon={<DeleteIcon />}
                        onClick={() => dispatch(deleteAircraft(aircraft.id))}
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
                  Edit Aircraft
                </Typography>
                {selectedAircraft && (
                  <form className={styles.field}>
                    <TextField
                      label="Model"
                      name="model"
                      value={selectedAircraft.model}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.model}
                      helperText={errors.model}
                      className={styles.textField}
                    />
                    <TextField
                      label="Max Takeoff Weight"
                      name="maxTakeoffWeight"
                      value={selectedAircraft.maxTakeoffWeight}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.maxTakeoffWeight}
                      helperText={errors.maxTakeoffWeight}
                      className={styles.textField}
                    />
                    <TextField
                      label="Seating Capacity"
                      name="seatingCapacity"
                      value={selectedAircraft.seatingCapacity}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.seatingCapacity}
                      helperText={errors.seatingCapacity}
                      className={styles.textField}
                    />
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
                        sx={{ paddingLeft: 1, paddingRight: 1 }} >
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
                  Add a new Aircraft
                </Typography>
                <form className={styles.field}>
                  <TextField
                    label="Model"
                    name="model"
                    value={newAircraft.model}
                    onChange={handleNewAircraftChange}
                    fullWidth
                    error={!!errors.model}
                    helperText={errors.model}
                    className={styles.textField}
                  />
                  <TextField
                    label="Max Takeoff Weight"
                    name="maxTakeoffWeight"
                    value={newAircraft.maxTakeoffWeight}
                    onChange={handleNewAircraftChange}
                    fullWidth
                    error={!!errors.maxTakeoffWeight}
                    helperText={errors.maxTakeoffWeight}
                    className={styles.textField}
                  />
                  <TextField
                    label="Seating Capacity"
                    name="seatingCapacity"
                    value={newAircraft.seatingCapacity}
                    onChange={handleNewAircraftChange}
                    fullWidth
                    error={!!errors.seatingCapacity}
                    helperText={errors.seatingCapacity}
                    className={styles.textField}
                  />
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                      className={`${styles.button} ${styles.buttonSave}`}
                      onClick={handleAddAircraft}
                      sx={{ paddingLeft: 3, paddingRight: 3 }}
                    >
                      Add
                    </Button>
                    <Button
                      className={`${styles.button} ${styles.buttonCancel}`}
                      onClick={handleClose}
                      sx={{ paddingLeft: 1, paddingRight: 1 }} >
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
            count={aircrafts.length}
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

export default AircraftComponent;
