import { Paper, Stack, Typography } from "@mui/material";

type DashboardCardProps = {
  title: string,
  count: number,
  children: React.ReactNode,
}

const DashboardCard = ({ title, count, children }: DashboardCardProps) => {

  return (
    <Paper sx={{ padding: "12px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" align="center">{title}</Typography>
      <Stack spacing={1} direction="row" alignItems="center">
        {children}
        <Typography variant="h2" align="center">{count}</Typography>
      </Stack>
    </Paper>
  );
}

export default DashboardCard;