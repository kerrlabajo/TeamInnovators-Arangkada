import { Stack, Typography } from "@mui/material";

type ResponseErrorProps = {
  message: string,
}

const ResponseError = ({ message }: ResponseErrorProps) => {
  return (
    <Stack sx={{ minHeight: "80vh" }} justifyContent="center" alignItems="center">
      <Typography>{message}</Typography>
      <Typography>{"Could not retrieve data."}</Typography>
    </Stack>
  );
}

export default ResponseError;