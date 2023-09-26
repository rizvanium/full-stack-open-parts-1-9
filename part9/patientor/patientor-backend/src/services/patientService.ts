import patientData from '../../data/patients';
import { NonSensitivePatient } from '../types';

const getAll = (): NonSensitivePatient[] => {
  return patientData.map(patient => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
  }));
};

export default {
  getAll,
};