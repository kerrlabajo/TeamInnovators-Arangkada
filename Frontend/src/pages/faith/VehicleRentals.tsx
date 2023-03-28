import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Vehicle } from "../../api/dataTypes";
import VehicleCardList from "../../components/faith/VehicleCardList";
import VehicleFilterForm from "../../components/faith/VehicleFilterForm";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import VehicleService from "../../api/VehicleService";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";

const VehicleRentals = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    VehicleService.getAvailableVehicles(
      false, "Tricycle", "Ready to use"
    ).then((response) => {
      setVehicles(response.data);
      setError("");
    }).catch((error) => {
      setError(error.message);
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    setFilteredVehicles(vehicles);
  }, [vehicles])

  const handleFilterSubmit = (filters: { businessName: string, operatorName: string, route: string }) => {
    const { businessName, operatorName, route } = filters;
    const temp = vehicles.filter((vehicle) =>
      vehicle.operator.businessName.toLowerCase().includes(businessName.toLowerCase()) &&
      (vehicle.operator.account.firstname + " " + vehicle.operator.account.lastname).toLowerCase().includes(operatorName.toLowerCase()) &&
      vehicle.route.toLowerCase().includes(route.toLowerCase())
    )
    setFilteredVehicles(temp);
  }

  const handleFilterClear = () => {
    setFilteredVehicles(vehicles);
  }

  if (loading) return (<Loading />)

  if (error !== "") return (<ResponseError message={error} />)

  return (
    <>
      <Box mt="12px" sx={{ minHeight: "80vh" }}>
        <PageHeader title="Vehicle Rentals" />
        <br></br>
        <VehicleFilterForm handleFilterSubmit={handleFilterSubmit} handleFilterClear={handleFilterClear} />
        <br></br>
        {filteredVehicles.length !== 0 && <VehicleCardList vehicles={filteredVehicles} />}
        {filteredVehicles.length === 0 && <Typography variant="body1" color="text.secondary">No available vehicles.</Typography>}
      </Box>
      <Footer name="Faith Rosalijos" course="BSIT" section="G1" />
    </>
  );
}

export default VehicleRentals;