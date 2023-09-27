import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, PatientRequest } from '../types';

const getAll = (): NonSensitivePatient[] => {
  return patientData.map(patient => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
  }));
};

const addNew = (request: PatientRequest): Patient => {
  const newPatient = {
    id: uuid(),
    ...request
  };

  patientData.push(newPatient);
  
  return newPatient;
};

export default {
  getAll,
  addNew
};