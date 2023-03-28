import { Box, Divider, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Box p="12px 0">
      <Typography variant="h4" component="h1">{title}</Typography>
      <Divider sx={{ bgcolor: "primary.main", marginTop: "24px" }}></Divider>
    </Box>
  );
}

export default PageHeader;