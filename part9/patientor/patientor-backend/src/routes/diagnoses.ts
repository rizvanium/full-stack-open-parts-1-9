import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosisService.getAll();
  res.status(200).send(diagnoses);
});

export default router;