import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../services/patients";
import { Gender, Patient } from "../types";
import { Box, Typography } from "@mui/material";
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


interface Props {
  gender: Gender;
}

const GenderIcon = ({ gender }: Props) => {
  switch (gender) {
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Male:
      return <MaleIcon />;
    default:
      return <TransgenderIcon />;
  }
}

const PatientDetails = () => {
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
  
  return (

    <Box>
      <Typography align="left" variant="h6" fontWeight="bold" sx={{marginTop: 3}}>
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </Typography>
      <Box sx={{marginTop: 1}}>
        <Typography variant="subtitle2">
          ssn: {patient.ssn}
        </Typography>
        <Typography variant="subtitle2">
          occupation: {patient.occupation}
        </Typography>
      </Box>
    </Box>
  )
}

export default PatientDetails;