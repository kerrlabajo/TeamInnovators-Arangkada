import axios from "axios";
import { Vehicle } from "./dataTypes";


const VEHICLE_BASE_URL = "http://localhost:8080/vehicle";


class VehicleService {

  getVehicleByOperatorOperatorId(id: string) {
    return axios.get(VEHICLE_BASE_URL + "/getByOperatorId/" + id);
  }

  getVehicleByVehicleId(id: string) {
    return axios.get(VEHICLE_BASE_URL + "/getByVehicleId/" + id);
  }

  getVehicleByPlateNumber(plateNumber: string) {
    return axios.get(VEHICLE_BASE_URL + "/getByPlateNumber/?plateNumber=" + plateNumber);
  }

  getAvailableVehicles(isRented: boolean, vehicleType: String, vehicleCondition: String) {
    return axios.get(VEHICLE_BASE_URL + "/getByIsRentedAndVehicleTypeAndVehicleCondition/?isRented=" + isRented+ "&vehicleType="+vehicleType+ "&vehicleCondition="+vehicleCondition);
  }

  postVehicle(data: Vehicle){
    return axios.post(VEHICLE_BASE_URL + "/postVehicle",data);
  }

  putVehicleRented(id: string, rented: boolean) {
    return axios.put(VEHICLE_BASE_URL + "/putVehicleRented/" +id+ "?rented=" +rented);
  }

  putVehicle = (id: string, data: Vehicle) => {
    return axios.put(VEHICLE_BASE_URL + "/putVehicle/" +id,data);
  };

  deleteVehicle = (id: string) => {
    return axios.delete(VEHICLE_BASE_URL + "/deleteVehicle/" +id,);
  };

}


export default new VehicleService();