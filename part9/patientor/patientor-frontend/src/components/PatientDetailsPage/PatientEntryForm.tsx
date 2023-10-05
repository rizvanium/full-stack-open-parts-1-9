import { 
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  Input, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Diagnosis, Entry, EntryRequest, EntryType, HealthCheckRating } from "../../types";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from 'dayjs';
import patientService from '../../services/patients';
import AdditionalEntryInfo from "./AdditionalEntryInfo";

interface Props {
  patientId: string | undefined,
  diagnoses: Map<Diagnosis['code'], Diagnosis>;
  handleNewEntry: (addedEntry: Entry) => void;
}

const PatientEntryForm = ({ patientId, diagnoses, handleNewEntry }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>(Object.keys([]));
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');

  const [discharge, setDischarge] = useState<{ date: Dayjs | null, criteria: string }>({
    date: null,
    criteria: '',
  });

  const [sickLeave, setSickLeave] = useState<{ startDate: Dayjs | null, endDate: Dayjs | null}>({
    startDate: null,
    endDate: null,
  });

  if (!patientId) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const addNewEntry = async () => {
    if (!date) {
      return;
    }

    try {
      const entryBase = {
        date: date.format('YYYY-MM-DD'),
        description,
        specialist,
        diagnosisCodes,
      };
      let entryRequest: EntryRequest | null = null;
      switch (type) {
        case EntryType.Hospital:
          
          if (!discharge.date) {
            return;
          }

          entryRequest = {
            type,
            ...entryBase,
            discharge: {
              date: discharge.date.format('YYYY-MM-DD'),
              criteria: discharge.criteria
            },
          }
          break;
        case EntryType.HealthCheck:
          entryRequest = {
            type,
            ...entryBase,
            healthCheckRating
          }
          break;
        default:
          if (!sickLeave.startDate || !sickLeave.endDate) {
            return;
          }
          entryRequest = {
            type,
            ...entryBase,
            employerName,
            sickLeave: {
              startDate: sickLeave.startDate.format('YYYY-MM-DD'),
              endDate: sickLeave.startDate.format('YYYY-MM-DD'),
            },
          }
          break;
      };

      const newEntry = await patientService.addEntry(patientId, entryRequest);
      handleNewEntry(newEntry);
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{borderStyle: 'dashed', marginTop: 3, padding: 1}}>
        <Typography variant="h6" fontWeight="bold" marginTop={1}>
          New {getTitle(type)} Entry
        </Typography>
        <TextField
            fullWidth
            id="description"
            label="Description"
            variant="standard"
            value={description}
            onChange={({target: { value }}) => setDescription(value)}
        />
        <DateField label="Date" fullWidth variant="standard" value={date} onChange={(value) => setDate(value)}/>
        <TextField
            fullWidth
            id="specialist"
            label="Specialist"
            variant="standard"
            value={specialist}
            onChange={({target: { value }}) => setSpecialist(value)}
        />
        <FormControl variant="standard" fullWidth>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            id="diagnosis-codes"
            labelId="diagnosis-codes-label"
            multiple
            displayEmpty
            value={diagnosisCodes}
            onChange={handleChange}
            input={<Input fullWidth />}
            renderValue={(selected) => selected.join(', ')}
          >
            {Array.from(diagnoses.keys()).map((code) => (
              <MenuItem
                key={code}
                value={code}
              >
                <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
                <ListItemText primary={code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            id="entry-type"
            labelId="entry-type-label"
            value={type}
            onChange={({ target: { value } }) => setType(value as EntryType)}
            input={<Input fullWidth />}
          >
            <MenuItem key={EntryType.HealthCheck} value={EntryType.HealthCheck} >
              HealthCheck
            </MenuItem>
            <MenuItem key={EntryType.Hospital} value={EntryType.Hospital} >
              Hospital
            </MenuItem>
            <MenuItem key={EntryType.OccupationalHealthcare} value={EntryType.OccupationalHealthcare} >
              Occupational
            </MenuItem>
          </Select>
        </FormControl>
        <AdditionalEntryInfo
          type={type}
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
          discharge={discharge}
          setDischarge={setDischarge}
          employerName={employerName}
          sickLeave={sickLeave}
          setEmployerName={setEmployerName}
          setSickLeave={setSickLeave}
        />
        <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'space-between', marginTop: 2}}>
          <Button variant="contained" color="error">cancel</Button>
          <Button onClick={addNewEntry} variant="contained" color="success">add</Button>
        </Box>
      </Box>
    </>
  )
};

const getTitle = (type: EntryType): string => {
  switch (type) {
    case EntryType.HealthCheck:
      return 'Health Check';
    case EntryType.Hospital:
      return 'Hospital';
    default:
      return 'Occupational Healthcare';
  }
}

export default PatientEntryForm;