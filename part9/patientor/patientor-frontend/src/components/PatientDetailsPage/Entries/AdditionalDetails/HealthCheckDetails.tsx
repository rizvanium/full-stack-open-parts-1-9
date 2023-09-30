import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../../../types";
import EntryIcon from "../../Icons/EntryIcon";
import HealthRatingIcon from "../../Icons/HealthRatingIcon";

interface Props {
  entry: HealthCheckEntry;
}

const HealthcheckEntryDetails = ({ entry }: Props) => {
  return (
    <>    
      <Typography variant="subtitle2">
        {entry.date}{' '}
        <EntryIcon entry={entry}/>{' '}
        <HealthRatingIcon rating={entry.healthCheckRating}/>
      </Typography>
    </>
  )
}

export default HealthcheckEntryDetails