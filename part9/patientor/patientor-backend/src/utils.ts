import { Diagnosis, EntryRequest, EntryRequestBase, EntryType, Gender, HealthCheckEntryInfo, HealthCheckRating, HospitalEntryInfo, OccupationalEntryInfo, Patient, PatientRequest } from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(g => +g).includes(rating);
};

const isEntryType = (type: string): type is EntryType => {
  return Object.values(EntryType).map(et => et.toString()).includes(type);
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

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender');
  }

  return gender;
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error('Incorrect entry type');
  }

  return entryType;
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
      ...patientRequest,
      entries: []
    };
  }
  
  throw new Error('Incorect data: some fields are missing');
};


const parseEntryRequestBase = (object: object): EntryRequestBase => {
  if (!('date' in object) || !('specialist' in object) || !('description' in object)) {
    throw new Error ('Incorect data: some fields are missing');
  }

  const diagnosisCodes = 'diagnosisCodes' in object ? 
    object.diagnosisCodes as Array<Diagnosis['code']> : 
    [] as Array<Diagnosis['code']>;

  return {
    date: parseDate(object.date),
    description: parseText(object.description, 'Incorrect description'),
    specialist: parseText(object.specialist, 'Incorrect specialist'),
    diagnosisCodes
  };
};

const parseHospitalEntryInfo = (object: object): HospitalEntryInfo => {
  if (!('discharge' in object)) {
    throw new Error ('Incorect data: discharge is missing');
  }

  const discharge = object.discharge as { criteria: string, date: string };
  if (!discharge || !('criteria' in discharge) || !('date' in discharge)) {
    throw new Error ('Incorect data: some fields are missing');
  }

  return {
    discharge: {
      criteria: parseText(discharge.criteria, 'Incorrect criteria'),
      date: parseDate(discharge.date),
    },
  };
};

const parseHealthCheckEntryInfo = (object: object): HealthCheckEntryInfo => {
  if (!('healthCheckRating' in object)) {
    throw new Error ('Incorect data: HealthCheck rating is missing');
  }
  
  if (!isNumber(object.healthCheckRating) || !isHealthCheckRating(object.healthCheckRating)) {
    throw new Error ('Incorect data: HealthCheck rating is incorrect');
  }

  return {
    healthCheckRating: object.healthCheckRating,
  };
};

const parseSickLeave = (object: unknown): { startDate: string, endDate: string } => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect sick leave');
  }

  if (!('startDate' in object)) {
    throw new Error('sick leave is missing a start date');
  }

  if (!('endDate' in object)) {
    throw new Error('sick leave is missing an end date');
  }

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const parseOccupationalEntryInfo = (object: object): OccupationalEntryInfo => {
  if (!('employerName' in object)) {
    throw new Error('Incorect data: some fields are missing');
  }
  const sickLeave = 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined;

  return {
    employerName: parseText(object.employerName, 'Employer information is missing'),
    sickLeave
  };
};

export const toEntryRequest = (object: unknown): EntryRequest => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object)) {
    throw new Error('missing entry type');
  }

  const entryType = parseEntryType(object.type);
  const entryRequestBase = parseEntryRequestBase(object);

  switch (entryType) {
    case EntryType.Hospital:
      return {
        type: entryType,
        ...entryRequestBase,
        ...parseHospitalEntryInfo(object),
      };
    case EntryType.HealthCheck:
      return {
        type: entryType,
        ...entryRequestBase,
        ...parseHealthCheckEntryInfo(object),
      };
    case EntryType.OccupationalHealthcare:
      return {
        type: entryType,
        ...entryRequestBase,
        ...parseOccupationalEntryInfo(object),
      };
    default:
      return assertNever(entryType);
  }
};