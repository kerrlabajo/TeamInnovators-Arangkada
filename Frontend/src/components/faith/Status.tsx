import { Stack, Typography } from "@mui/material";
import { PendingOutlined, CheckCircle, TaskAlt } from "@mui/icons-material/";

type StatusProps = {
  status: string,
  message: string,
}

const Status = ({ status, message }: StatusProps) => {
  return (
    <Stack spacing={2} direction="row" width="100%">
      {status === "Pending" && <PendingOutlined fontSize="large" color="action" />}
      {status === "Approved" && <CheckCircle fontSize="large" color="success" />}
      {status === "Finished" && <TaskAlt fontSize="large" color="info" />}
      <div>
        <Typography variant="body1">Status: {status}</Typography>
        <Typography variant="body1" color="text.secondary">{message}</Typography>
      </div>
    </Stack>
  );
}

export default Status;