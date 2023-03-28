import { Box, } from "@mui/material";
import Footer from "../../components/Footer";
import View from "../../components/mariel/View";
import PageHeader from "../../components/PageHeader";



const MyVehicles = () => {

  return ( 
    <>
      <Box mt="12px" sx={{ minHeight: "80vh" }}>
        <PageHeader title="Vehicle Information"/>
        <br></br>
        <br></br>
        <View/>
      </Box>
      <Footer name="Mariel Genodiala" course="BSIT" section="G3"/>
    </>
   );
}
export default MyVehicles;