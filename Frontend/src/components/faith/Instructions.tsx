import { Typography } from "@mui/material";

type InstructionsProps = {
  header: string,
  subheader: string,
}

const Instructions = ({ header, subheader }: InstructionsProps) => {
  return (
    <div>
      <Typography variant="h5">{header}</Typography>
      <Typography variant="body1" color="text.secondary">{subheader}</Typography>
    </div>
  );
}

export default Instructions;