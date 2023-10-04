import axios from "axios";
import { Entry, EntryRequest, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const get = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
}

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patientId: string, request: EntryRequest) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, request);
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get, getAll, create, addEntry,
};

