export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  Hospital = "hospital",
  OccupationalHealthcare = "occupationalHealthcare",
  HealthCheck = 'healthCheck',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientRequest = Omit<Patient, 'id' | 'entries'>;

export type EntryRequestBase = UnionOmit<BaseEntry, 'id'>;
export type EntryRequest = UnionOmit<Entry, 'id'>;

export interface HospitalEntryInfo {
  discharge: {
    date: string;
    criteria: string;
  }
}

export interface HealthCheckEntryInfo {
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalEntryInfo {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}