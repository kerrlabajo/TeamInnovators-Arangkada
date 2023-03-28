import axios from "axios";
import { Driver } from "./dataTypes";


const DRIVER_BASE_URL = "http://localhost:8080/driver";

class DriverService {

    postDriver(data: Driver){
        return axios.post(DRIVER_BASE_URL + "/postDriver",data);
    }

    getByAccountId(id: string){
        return axios.get(DRIVER_BASE_URL + "/getByAccountId/" + id);
    }

    getDriverbyDriverId(id: string){
        return axios.get(DRIVER_BASE_URL + "/getByDriverId/" + id);
    }

    putDriver = (id: string, data: Driver) => {
        return axios.put(DRIVER_BASE_URL + "/putAccount?driverId" + id, data);
    };

    deleteDriver = (id: string) => {
        return axios.delete(DRIVER_BASE_URL + "/deleteDriver/" +id);
    };

}

export default new DriverService();