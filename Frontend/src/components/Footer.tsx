import { Typography, Box } from '@mui/material';

type FooterProps = {
  name: string,
  course: string,
  section: string,
}

const Footer = ({ name, course, section }: FooterProps) => {
  return ( 
    <Box sx={{ padding: "32px 0" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {name} {course} {section} | CSIT321 G1 - C0
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright © Arangkada {new Date().getFullYear()}
      </Typography>
    </Box>
   );
}
 
export default Footer;