import { Container, FormControl, InputLabel, TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface Props {
  discharge: { date: null | Dayjs, criteria: string };
  setDischarge: React.Dispatch<React.SetStateAction<{ date: null | Dayjs, criteria: string }>>
}

const HospitalEntryInfo = ({ discharge, setDischarge }: Props) => {

  const changeCriteria = (value: string) => {
    setDischarge({
      ...discharge,
      criteria: value
    });
  };

  const changeDate = (value: Dayjs | null) => {
    setDischarge({
      ...discharge,
      date: value,
    });
  };

  return (
    <>
      <InputLabel id="discharge-rating-label" sx={{marginTop: 1 }}>discharge:</InputLabel>
      <FormControl variant="standard" fullWidth >
        <Container>
          <DateField sx={{height: 48}} label="date" fullWidth variant="standard" value={discharge.date} onChange={(value) => changeDate(value)}/>
          <TextField
            fullWidth
            id="criteria"
            label="criteria"
            variant="standard"
            value={discharge.criteria}
            onChange={({target: { value }}) => changeCriteria(value)}
          />
        </Container>
      </FormControl>
    </>
  );
};

export default HospitalEntryInfo;