import { Box } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Rental } from "../../api/dataTypes";
import RentalService from "../../api/RentalService";
import Instructions from "../../components/faith/Instructions";
import PayRentForm from "../../components/kerr/PayRentForm";
import RentalDetails from "../../components/kerr/RentalDetails";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";
import { UserContext, UserContextType } from "../../helpers/UserContext";

const PayRent = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentRental, setCurrentRental] = useState<Rental>({} as Rental);
    
    useEffect(() => {
      if (user !== null) {
        RentalService.getCurrentRentalByDriver(user.userId).then((response) => {
          setCurrentRental(response.data)
          console.log(response.data);
          setError("");
        }).catch((error) => {
          setError(error.message);
        }).finally(() => {
          setLoading(false);
        })
      }
    }, []);

    if (loading) return (<Loading />)

    if (error !== "") return (<ResponseError message={error} />)
    
    return (
      <>
        <Box mt="12px" display="flex" flexDirection="column" sx={{ minHeight: "80vh" }}>
          <PageHeader title="Pay Rent" />
          <br></br>
          <Instructions header="Please provide the amount to pay the rent." subheader="" />
          <br></br>
          <RentalDetails rental={currentRental} />
          <br></br>
          <br></br>
          <PayRentForm rental={currentRental}/>
        </Box>
        <Footer name="Kerr Labajo" course="BSCS" section="F1" />
      </>
    );
  }
  
  export default PayRent;