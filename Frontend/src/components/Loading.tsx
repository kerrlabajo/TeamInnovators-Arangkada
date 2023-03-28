import { Stack, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Stack sx={{ minHeight: "80vh" }} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
}

export default Loading;