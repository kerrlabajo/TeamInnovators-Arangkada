import { Box, Divider } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import UpdateSelectedPayment from "../../components/kerr/SelectedPayment";

const UpdatePayment = () => {

    return ( 
      <>
        <Box mt="12px" sx={{ minHeight: "80vh" }}>
          <PageHeader title="Update Payment Information"/>
          <br></br>
          <br></br>
          <UpdateSelectedPayment/>
        </Box>
        <Footer name="Kerr Labajo" course="BSCS" section="F1"/>
      </>
     );
  }
  export default UpdatePayment;