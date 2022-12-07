package com.innovators.Arangkada.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.innovators.Arangkada.Entity.VehicleEntity;



@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, Integer> {
	
	//user=defined query
	VehicleEntity findByPlateNumber(String plateNumber);
	List<VehicleEntity> findByOperatorOperatorId(int operatorId);
	List<VehicleEntity> findByVehicleType(String vehicleType);
	
}