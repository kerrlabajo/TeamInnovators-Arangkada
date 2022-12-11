package com.innovators.Arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.DriverEntity;
import com.innovators.Arangkada.Repository.DriverRepository;




@Service
public class DriverService {
	
	@Autowired
	DriverRepository drepo;
	
	//Create 
	public DriverEntity insertDriver(DriverEntity driver) {
		return drepo.save(driver);
	}
	
	//Read
	public List<DriverEntity> getAllDriver(){
		return drepo.findAll(); 		
	}
	
	public DriverEntity findByDriverId (int driverId) {
		if (drepo.findByDriverId(driverId)!=null)
			return drepo.findByDriverId(driverId);
		else
			return null;
	}
	
	//Update 
	public DriverEntity putDriver(int driverId, DriverEntity newDriverDetails) throws Exception{
	
	DriverEntity driver = new DriverEntity();
	
	try {
		
		driver = drepo.findById(driverId).get(); 
		
		driver.setLicenseNumber(newDriverDetails.getLicenseNumber());
		driver.setLicenseCode(newDriverDetails.getLicenseCode());

		return drepo.save(driver);
		
	}catch(NoSuchElementException nex) {
		throw new Exception("Driver ID " + driverId + " does not exist!");		
		}
	}
	
	//Delete 
	public String deleteDriver(int driverId) {
		String msg;
		if(drepo.findById(driverId) != null) {       
			drepo.deleteById(driverId);				
				
			msg = "Driver ID " + driverId + " is successfully deleted!";
		}
		else
			msg = "Driver " + driverId + " is NOT found!";
		
		return msg;
	}

	

}
