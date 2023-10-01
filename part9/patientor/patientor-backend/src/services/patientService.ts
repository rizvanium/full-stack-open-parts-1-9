import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, PatientRequest, Entry, EntryRequest } from '../types';

let patients = patientData;

const get = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getAll = (): NonSensitivePatient[] => {
  return patients.map(patient => ({
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
    ...request,
    entries: []
  };

  patients.push(newPatient);
  
  return newPatient;
};

const addNewEntry = (patient: Patient, request: EntryRequest): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...request
  };

  patients = patients.map(p => patient.id === p.id ? {
    ...p,
    entries: p.entries.concat(newEntry), 
  } : patient);
  
  return newEntry;
};

export default {
  get,
  getAll,
  addNew,
  addNewEntry
};