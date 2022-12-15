package com.innovators.Arangkada.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.innovators.Arangkada.Entity.VehicleEntity;
import com.innovators.Arangkada.Repository.VehicleRepository;
import java.util.*;
import javax.persistence.Column;

@Service
public class VehicleService {
	@Autowired
	VehicleRepository vrepo;
	

	public VehicleEntity insertVehicle(VehicleEntity vehicle) {
		
		return vrepo.save(vehicle);
	}

	public List<VehicleEntity> getAllVehicle(){
		return vrepo.findAll();
	}
	
	public VehicleEntity findByPlatenumber(String plateNumber){
		if (vrepo.findByPlateNumber(plateNumber) !=null)
			return vrepo.findByPlateNumber(plateNumber);
		else 
			return null;
	}
	public Optional<VehicleEntity> findByVehicleId(int vehicleId){
		if (vrepo.findById(vehicleId) !=null)
			return vrepo.findById(vehicleId);
		else 
			return null;
	}
	public List<VehicleEntity> findByOperatorOperatorId(int operatorId){
		if (vrepo.findByOperatorOperatorId(operatorId) !=null)
			return vrepo.findByOperatorOperatorId(operatorId);
		else 
			return null;
	}
	public List<VehicleEntity> findByVehicleType(String vehicleType){
		if (vrepo.findByVehicleType(vehicleType) !=null)
			return vrepo.findByVehicleType(vehicleType);
		else 
			return null;
	}
	public List<VehicleEntity> findByIsRentedAndVehicleTypeAndVehicleCondition(boolean isRented, String vehicleType, String vehicleCondition){
		if (vrepo.findByIsRentedAndVehicleTypeAndVehicleCondition(isRented, vehicleType, vehicleCondition) !=null)
			return vrepo.findByIsRentedAndVehicleTypeAndVehicleCondition(isRented, vehicleType, vehicleCondition);
		else 
			return null;
	}
	
	public VehicleEntity putVehicleRented(int vehicleid, boolean rented) throws Exception {
		VehicleEntity vehicle = new VehicleEntity();
		try {
			vehicle = vrepo.findById(vehicleid).get();
			vehicle.setRented(rented);
			return vrepo.save(vehicle);
		}
		catch(NoSuchElementException nex) {
			throw new Exception("ID Number "+vehicleid+" does not exist!");
		}
	}
	
	public VehicleEntity putVehicle(int vehicleId, VehicleEntity newVehicleDetails) throws Exception{
		VehicleEntity vehicle = new VehicleEntity();
		try {
			vehicle = vrepo.findById(vehicleId).get();
			vehicle.setRoute(newVehicleDetails.getRoute());
			vehicle.setOrStatus(newVehicleDetails.getOrStatus());
			vehicle.setVehicleCondition(newVehicleDetails.getVehicleCondition());
			vehicle.setRentalFee(newVehicleDetails.getRentalFee());
			return vrepo.save(vehicle);
		}
		catch(NoSuchElementException nex) {
			throw new Exception("ID Number "+vehicleId+" does not exist!");
		}
	}

	public String deleteVehicle(int vehicleId) {
		String msg;
		if(vrepo.findById(vehicleId).orElse(null) !=null) { 
			vrepo.deleteById(vehicleId); 
			msg= "Vehicle ID Number " + vehicleId + " is successfully deleted!";
		}
		else {
			msg= "Vehicle ID Number " + vehicleId + " is NOT found!";
		}
		return msg;
	}
}

