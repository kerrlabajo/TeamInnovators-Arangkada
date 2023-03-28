import { Box, } from "@mui/material";
import Footer from "../../components/Footer";
import ViewVehicle from "../../components/mariel/ViewVehicle";
import PageHeader from "../../components/PageHeader";



const MyVehicles = () => {

  return ( 
    <>
      <Box mt="12px" sx={{ minHeight: "80vh" }}>
        <PageHeader title="Update Vehicle Information"/>
        <br></br>
        <br></br>
        <ViewVehicle/>
      </Box>
      <Footer name="Mariel Genodiala" course="BSIT" section="G3"/>
    </>
   );
}
export default MyVehicles;