package com.innovators.Arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.DriverEntity;
import com.innovators.Arangkada.Entity.OperatorEntity;
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
	
	public List<DriverEntity> findByAccountAccountId(int accountId){
		if(drepo.findByAccountAccountId(accountId) != null)
			return drepo.findByAccountAccountId(accountId);
		else
			return null;
	}
	
	public Optional<DriverEntity> findByDriverId(int driverId){
		if(drepo.findById(driverId) != null)
			return drepo.findById(driverId);
		else
			return null;
	}
	
	//Read2
	public DriverEntity findByLicenseNumber(String licenseNumber) {
		if(drepo.findByLicenseNumber(licenseNumber) != null)
			return drepo.findByLicenseNumber(licenseNumber);
		else
			return null;
	}
	
	//Update 
	public DriverEntity putDriver(int driverId, DriverEntity newDriverDetails) throws Exception{
	
		DriverEntity driver = new DriverEntity();
	
			try {
				
				driver = drepo.findById(driverId).get(); 
		
				driver.setLicenseCode(newDriverDetails.getLicenseCode());

				return drepo.save(driver);
				
			}catch(NoSuchElementException nex) {
				throw new Exception("Driver ID " + driverId + " does not exist!");		
			}
	}
	
	//Delete 
	public String deleteDriver(int driverId) {
		
		String msg;
		
		if(drepo.findById(driverId) .orElse(null) !=null) {     
			drepo.deleteById(driverId);				
				
			msg = "Driver ID Number " + driverId + " is successfully deleted!";
		}
		else
			msg = "Driver Number " + driverId + " is NOT found!";
		
		return msg;
	}
}
