package com.innovators.arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.arangkada.Entity.DriverEntity;
import com.innovators.arangkada.Repository.DriverRepository;




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
	
	public DriverEntity findByDriverId (String driverid) {
		if (drepo.findByDriverid(driverid)!=null)
			return drepo.findByDriverid(driverid);
		else
			return null;
	}
	
	//Update 
	public DriverEntity putDriver(int driverid, DriverEntity newDriverDetails) throws Exception{
	
	DriverEntity driver = new DriverEntity();
	
	try {
		
		driver = drepo.findById(driverid).get(); 
		
		driver.setLicensenumber(newDriverDetails.getLicensenumber());
		driver.setLicensecode(newDriverDetails.getLicensecode());

		return drepo.save(driver);
		
	}catch(NoSuchElementException nex) {
		throw new Exception("Driver ID " + driverid + " does not exist!");		
		}
	}
	
	//Delete 
	public String deleteDriver(int driverid) {
		String msg;
		if(drepo.findById(driverid) != null) {       
			drepo.deleteById(driverid);				
				
			msg = "Driver ID " + driverid + " is successfully deleted!";
		}
		else
			msg = "Driver " + driverid + " is NOT found!";
		
		return msg;
	}

	

}
