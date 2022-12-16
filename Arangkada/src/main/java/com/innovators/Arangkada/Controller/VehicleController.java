package com.innovators.Arangkada.Controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.innovators.Arangkada.Entity.VehicleEntity;
import com.innovators.Arangkada.Service.VehicleService;


@RestController
@RequestMapping("/vehicle")
@CrossOrigin
public class VehicleController {
	
	@Autowired
	VehicleService vserv;

	@PostMapping("/postVehicle")
	public VehicleEntity insertVehicle(@RequestBody VehicleEntity vehicle) {
		return vserv.insertVehicle(vehicle);
	}

	@GetMapping("/getAllVehicles")
	public List<VehicleEntity> getAllVehicle(){
		return vserv.getAllVehicle();
	}

	@GetMapping("/getByPlateNumber")
	public VehicleEntity findByPlateNumber(@RequestParam String plateNumber){
		return vserv.findByPlatenumber(plateNumber);
	}
	@GetMapping("/getByVehicleId/{vehicleId}")
	public Optional<VehicleEntity> findByVehicleId(@PathVariable int vehicleId){
		return vserv.findByVehicleId(vehicleId);
	}
	@GetMapping("/getByOperatorId/{operatorId}")
	public List<VehicleEntity> findByOperatorOperatorId(@PathVariable int operatorId){
		return vserv.findByOperatorOperatorId(operatorId);
	}
	@GetMapping("/getByVehicleType")
	public List<VehicleEntity> findByVehicleType(@RequestParam String vehicleType){
		return vserv.findByVehicleType(vehicleType);
	}
	@GetMapping("/getByIsRentedAndVehicleTypeAndVehicleCondition")
	public List<VehicleEntity> findByIsRentedAndVehicleTypeAndVehicleCondition(@RequestParam boolean isRented, @RequestParam String vehicleType, @RequestParam String vehicleCondition){
		return vserv.findByIsRentedAndVehicleTypeAndVehicleCondition(isRented, vehicleType, vehicleCondition);
	}
	
	@PutMapping("/putVehicleRented/{vehicleid}")
	public VehicleEntity putVehicleRented(@PathVariable int vehicleid, @RequestParam boolean rented) throws Exception {
		return vserv.putVehicleRented(vehicleid, rented);
	}
	
	@PutMapping("/putVehicle/{vehicleid}")
	public VehicleEntity putVehicle(@PathVariable int vehicleid, @RequestBody VehicleEntity newVehicleDetails) throws Exception{
		return vserv.putVehicle(vehicleid, newVehicleDetails);
	}
	@PutMapping("/putReason/{vehicleid}")
	public VehicleEntity putReason(@PathVariable int vehicleid, @RequestBody VehicleEntity newVehicleDetails) throws Exception{
			return vserv.putReason(vehicleid, newVehicleDetails);
	}
	@DeleteMapping ("/deleteVehicle/{vehicleId}") 
	public String deleteVehicle(@PathVariable int vehicleId) { 
		return vserv.deleteVehicle(vehicleId);
	}
	
}
