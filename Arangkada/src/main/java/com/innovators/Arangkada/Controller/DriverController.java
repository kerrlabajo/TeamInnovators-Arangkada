package com.innovators.arangkada.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innovators.arangkada.Entity.DriverEntity;
import com.innovators.arangkada.Service.DriverService;




@RestController
@RequestMapping("/driver")
public class DriverController {
	
	@Autowired
	DriverService dserv;
	
	// Create 
	@PostMapping("/postDriver")
	public DriverEntity insertDriver(@RequestBody DriverEntity driver) {
		return dserv.insertDriver(driver);
	}
	
	//Read 
	@GetMapping("/displayAllDriver")
	public List<DriverEntity> getAllDriver(){
		return dserv.getAllDriver(); 	
	}
	
	@GetMapping("/getByDriverid")
	public DriverEntity findByDriverId(@RequestParam String driverid) {
		return dserv.findByDriverId(driverid);	
	}
	
	//Update 
	@PutMapping("/putDriver")
	public DriverEntity putDriver(@RequestParam int driverid, @RequestBody DriverEntity newDriverDetails) throws Exception{
		return dserv.putDriver(driverid, newDriverDetails);
	}
	
	//Delete 
	@DeleteMapping("/deleteDriver/{driverid}")
	public String deleteDriver(@PathVariable int driverid) {
		return dserv.deleteDriver(driverid);
	}

}
