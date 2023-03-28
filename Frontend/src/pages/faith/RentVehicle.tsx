import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Instructions from "../../components/faith/Instructions";
import RentVehicleForm from "../../components/faith/RentVehicleForm";
import VehicleDetails from "../../components/faith/VehicleDetails";
import PageHeader from "../../components/PageHeader";
import { Vehicle } from "../../api/dataTypes";
import Footer from "../../components/Footer";
import VehicleService from "../../api/VehicleService";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";

const RentVehicle = () => {
  const { id } = useParams() as { id: string };
  const [vehicle, setVehicle] = useState<Vehicle>({} as Vehicle);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    VehicleService.getVehicleByVehicleId(
      id
    ).then((response) => {
      setVehicle(response.data);
      setError("");
    }).catch((error) => {
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  if (loading) return (<Loading />)

  if (error !== "") return (<ResponseError message={error} />)

  return (
    <>
      <Box mt="12px" sx={{ minHeight: "80vh" }}>
        <PageHeader title="Rent Vehicle" />
        <br></br>
        <Instructions
          header="Please provide the details needed for rental."
          subheader="It might take a few days before the operator can respond to your application. You can still modify the start and end date until then."
        />
        <br></br>
        <VehicleDetails vehicle={vehicle} />
        <br></br>
        <br></br>
        <RentVehicleForm />
      </Box>
      <Footer name="Faith Rosalijos" course="BSIT" section="G1" />
    </>
  );
}

export default RentVehicle;