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
	@Column(name="plate_number")
	public VehicleEntity findByPlatenumber(String plateNumber){
		if (vrepo.findByPlateNumber(plateNumber) !=null)
			return vrepo.findByPlateNumber(plateNumber);
		else 
			return null;

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
		if(vrepo.findById(vehicleId) !=null) { 
			vrepo.deleteById(vehicleId); 
			msg= "Vehicle ID Number " + vehicleId + " is successfully deleted!";
		}
		else {
			msg= "Vehicle ID Number " + vehicleId + " is NOT found!";
		}
		return msg;
	}
}

