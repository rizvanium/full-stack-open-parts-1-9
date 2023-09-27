import { Gender, Patient, PatientRequest } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseText = (text: unknown, errorMessage: string): string => {
  if (!isString(text)) {
    throw new Error(errorMessage);
  }
  return text;
};

const parseId = (name: unknown): string => {
  return parseText(name, 'Incorrect id');
};

const parseName = (name: unknown): string => {
  return parseText(name, 'Incorrect name');
};

const parseSsn = (ssn: unknown): string => {
  return parseText(ssn, 'Incorrect ssn');
};

const parseOccupation = (occupation: unknown): string => {
  return parseText(occupation, 'Incorrect occupation');
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date of birth');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender');
  }

  return gender;
};

export const toPatientRequest = (object: unknown): PatientRequest => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const patientRequest: PatientRequest = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return patientRequest;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toPatient = (object: unknown): Patient => {
  const patientRequest = toPatientRequest(object);
  if (object && typeof object === 'object' && 'id' in object) {
    return {
      id: parseId(object.id),
      ...patientRequest
    };
  }
  
  throw new Error('Incorect data: some fields are missing');
};