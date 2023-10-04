import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import { Box, Button, Typography } from "@mui/material";
import GenderIcon from "./Icons/GenderIcon";
import Entries from "./Entries";
import PatientEntryForm from "./PatientEntryForm";

interface Props {
  diagnoses: Map<Diagnosis['code'], Diagnosis>;
}

const PatientDetails = ({ diagnoses }: Props) => {
  let { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    patients.get(id).then(data => {
      setPatient({
        ...data, 
        entries: data?.entries?.map(entry => ({...entry}))
      });
    });
  }, [id])

  if (!patient) {
    return <div>No info found</div>
  }

  const addNewEntry = (entry: Entry) => {
    setPatient({
      ...patient,
      entries: patient.entries ? patient.entries.concat(entry): [],
    });
  }
  
  return (
    <>
      <Box sx={{marginTop: 3}}>
        <Typography align="left" variant="h4" fontWeight="bold">
          {patient.name}
          <GenderIcon gender={patient.gender} />
        </Typography>
      </Box>
      <Box sx={{marginTop: 1}}>
        <Typography variant="subtitle2">
          ssn: {patient.ssn}
        </Typography>
        <Typography variant="subtitle2">
          occupation: {patient.occupation}
        </Typography>
      </Box>
      <PatientEntryForm patientId={id} diagnoses={diagnoses} handleNewEntry={addNewEntry} />
      {patient?.entries && <Entries entries={patient.entries} diagnoses={diagnoses}/>}
      <Button variant="contained" sx={{ marginTop: 2 }} >add new entry</Button>
    </>
  )
}

export default PatientDetails;