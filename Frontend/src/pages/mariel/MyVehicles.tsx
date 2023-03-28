import { Box, Typography, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import MyVehicleCardList from "../../components/mariel/MyVehicleCardList";
import MyVehicleSearch from "../../components/mariel/MyVehicleSearch";
import { Vehicle } from "../../api/dataTypes";
import VehicleService from "../../api/VehicleService";
import { UserContext, UserContextType } from "../../helpers/UserContext";



const MyVehicles = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [myVehicles, setVehicles] = useState<Vehicle[]>([]);


  useEffect(() => {
    if(user !== null) {
      VehicleService.getVehicleByOperatorOperatorId(user.userId).then((response) => {
        setVehicles(response.data);
      }).catch((error) => {
        console.log(error);
      })
    }
  }, []);

  useEffect(() => {
    setFilteredVehicles(myVehicles);
  }, [myVehicles])

  const handleFilterSubmit = (plateNumber: string) => {
    const temp = myVehicles.filter((myVehicle) =>
    myVehicle.plateNumber.toLowerCase().includes(plateNumber.toLowerCase()) 
    )
    setFilteredVehicles(temp);
  }

  const handleFilterClear = () => {
    setFilteredVehicles(myVehicles);
  }

  return ( 
    <>
      <Box mt="12px" sx={{ minHeight: "80vh"}}>
        <PageHeader title="Vehicles" />
        <br></br>
        <MyVehicleSearch handleFilterSubmit={handleFilterSubmit} handleFilterClear={handleFilterClear}/>
        <br></br>
          {filteredVehicles.length !== 0 && <MyVehicleCardList myVehicle={filteredVehicles} />}
          {filteredVehicles.length === 0 && <Typography variant="body1" color="text.secondary">No vehicles added.</Typography>}
      </Box>
      <Footer name="Mariel Genodiala" course="BSIT" section="G3"/>
    </>

  );
}
 
export default MyVehicles;