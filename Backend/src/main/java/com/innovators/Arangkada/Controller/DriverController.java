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

import com.innovators.Arangkada.Entity.DriverEntity;
import com.innovators.Arangkada.Entity.OperatorEntity;
import com.innovators.Arangkada.Service.DriverService;

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DriverController {
	
	@Autowired
	DriverService dserv;
	
	// Create 
	@PostMapping("/postDriver")
	public DriverEntity insertDriver(@RequestBody DriverEntity driver) {
		return dserv.insertDriver(driver);
	}
	
	//Read 
	@GetMapping("/getAllDrivers")
	public List<DriverEntity> getAllDrivers(){
		return dserv.getAllDrivers(); 	
	}
	
	@GetMapping("/getByLicenseNumber")
	public DriverEntity findByLicenseNumber(@RequestParam String licenseNumber) {
		return dserv.findByLicenseNumber(licenseNumber);	
	}
	
	@GetMapping("/getByAccountId/{accountId}")
	public List<DriverEntity> findByAccountAccountId(@PathVariable int accountId){
		return dserv.findByAccountAccountId(accountId);
	}
	
	@GetMapping("/getByDriverId/{driverId}")
	public Optional<DriverEntity> findByDriverId(@PathVariable int driverId){
		return dserv.findByDriverId(driverId);
	}
	
	
	//Update 
	@PutMapping("/putDriver")
	public DriverEntity putDriver(@RequestParam int driverId, @RequestBody DriverEntity newDriverDetails) throws Exception{
		return dserv.putDriver(driverId, newDriverDetails);
	}
	
	//Delete 
	@DeleteMapping("/deleteDriver/{driverId}")
	public String deleteDriver(@PathVariable int driverId) {
		return dserv.deleteDriver(driverId);
	}

}
