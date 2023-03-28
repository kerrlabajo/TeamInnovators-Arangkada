import axios from "axios";
import { PostRental, PutRental } from "./dataTypes";

const RENTAL_BASE_URL = "http://localhost:8080/rental";

class RentalService {

  getRentalById(id: string) {
    return axios.get(RENTAL_BASE_URL + "/getRentalById/" + id);
  }

  getRentalsByDriver(id: string) {
    return axios.get(RENTAL_BASE_URL + "/getRentalsByDriverId/" + id);
  }

  getCurrentRentalByDriver(id: string) {
    return axios.get(RENTAL_BASE_URL + "/getCurrentRentalByDriverId/" + id);
  }

  getCurrentRentalsByOperator(id: string) {
    return axios.get(RENTAL_BASE_URL + "/getCurrentRentalsByOperatorId/" + id);
  }

  getRentalsByOperatorAndStatus(id: string, status: string) {
    return axios.get(RENTAL_BASE_URL + "/getRentalsByStatusAndVehicleOperatorId/" + id + "?status=" + status);
  }

  postRental(rental: PostRental) {
    return axios.post(RENTAL_BASE_URL + "/postRental/", rental);
  }

  putRental(id: string, rental: PutRental) {
    return axios.put(RENTAL_BASE_URL + "/putRental/" + id, rental);
  }

  deleteRental(id: string) {
    return axios.delete(RENTAL_BASE_URL + "/deleteRental/" + id);
  }

}

export default new RentalService();