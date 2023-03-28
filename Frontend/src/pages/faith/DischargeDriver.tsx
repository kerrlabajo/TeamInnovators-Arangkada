import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import DischargeDriverForm from "../../components/faith/DischargeDriverForm";
import Instructions from "../../components/faith/Instructions";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";

const DischargeDriver = () => {
  const location = useLocation();

  return (
    <>
      <Box mt="12px" sx={{ minHeight: "80vh" }}>
        <PageHeader title="Discharge Driver" />
        <br></br>
        <Typography variant="h5">Driver ID: {location.state.rental.driver.driverId}</Typography>
        <br></br>
        <Instructions
          header="Do you want to discharge this driver from his current vehicle rental?"
          subheader="This action cannot be undone."
        />
        <br></br>
        <br></br>
        <DischargeDriverForm rental={location.state.rental} />
      </Box>
      <Footer name="Faith Rosalijos" course="BSIT" section="G1" />
    </>
  );
}

export default DischargeDriver;