import express from 'express';
import patientService from '../services/patientService';
import { toEntryRequest, toPatientRequest } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.status(200).send(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.get(id);

  if (!patient) {
    res.status(404).send('patient could not be found');
    return;
  }

  res.status(200).send(patient);
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
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient = patientService.get(id);

  if (!patient) {
    res.status(404).send('patient could not be found');
    return;
  }

  try {
    const entryRequest = toEntryRequest(req.body);
    const newEntry = patientService.addNewEntry(patient, entryRequest);

    res.status(200).send(newEntry);

  } catch (error) {
    let errorMessage = 'Something went wrong...';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;