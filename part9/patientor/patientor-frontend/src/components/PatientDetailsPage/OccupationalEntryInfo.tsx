import { Container, FormControl, InputLabel, TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React from "react";

interface Props {
  employerName: string,
  sickLeave: { startDate: null | Dayjs, endDate: null | Dayjs };
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeave: React.Dispatch<React.SetStateAction<{ startDate: null | Dayjs, endDate: null | Dayjs }>>;
}

const OccupationalEntryInfo = ({ employerName, sickLeave, setEmployerName, setSickLeave }: Props) => {
  const changeStartDate = (value: Dayjs | null) => {
    setSickLeave({
      ...sickLeave,
      startDate: value
    });
  };

  const changeEndDate = (value: Dayjs | null) => {
    setSickLeave({
      ...sickLeave,
      endDate: value,
    });
  };

  return (
    <>
      <TextField
        fullWidth
        id="employerName"
        label="employer"
        variant="standard"
        value={employerName}
        onChange={({target: { value }}) => setEmployerName(value)}
      /> 
      <InputLabel id="sickleave-rating-label" sx={{marginTop: 1 }}>sick leave:</InputLabel>
      <FormControl variant="standard" fullWidth >
        <Container>
          <DateField label="start date" fullWidth variant="standard" value={sickLeave.startDate} onChange={(value) => changeStartDate(value)}/>
          <DateField label="end date" fullWidth variant="standard" value={sickLeave.endDate} onChange={(value) => changeEndDate(value)}/>
        </Container>
      </FormControl>
    </>
  );
};

export default OccupationalEntryInfo;