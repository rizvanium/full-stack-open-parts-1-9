import express from 'express';
import patientService from '../services/patientService';
import { toPatientRequest } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.status(200).send(patients);
});

router.post('/', (req, res) => {
  try {
    const patientRequest = toPatientRequest(req.body);
    const patient = patientService.addNew(patientRequest);
    res.status(200).send(patient);
  } catch (error) {
    let errorMessage = 'Someting went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default router;