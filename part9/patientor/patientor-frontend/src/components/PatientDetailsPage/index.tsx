import { useEffect, useRef, useState } from "react";
import { Diagnosis, Entry, Patient } from "../../types";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PatientEntryForm from "./PatientEntryForm";
import GenderIcon from "./Icons/GenderIcon";
import patients from "../../services/patients";
import Togglable from "../Togglable";
import Entries from "./Entries";

interface Props {
  diagnoses: Map<Diagnosis['code'], Diagnosis>;
}

const PatientDetails = ({ diagnoses }: Props) => {
  let { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const patientRef = useRef<{ toggleVisibility: () => void }>(null);

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
  };
  
  const closeForm = () => {
    if (patientRef && patientRef.current) {
      patientRef.current.toggleVisibility();
    }
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
      <Togglable ref={patientRef} buttonLabel="add new entry">
        <PatientEntryForm
          patientId={id}
          diagnoses={diagnoses}
          handleNewEntry={addNewEntry}
          closeForm={closeForm}
        />
      </Togglable>
      {patient?.entries && <Entries entries={patient.entries} diagnoses={diagnoses}/>}
    </>
  )
}

export default PatientDetails;