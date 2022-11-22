package com.innovators.Arangkada.Repository;
import javax.persistence.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.innovators.Arangkada.Entity.VehicleEntity;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, Integer> {
	
	//user=defined query
	@Column(name="plate_number")
	VehicleEntity findByPlateNumber(String plateNumber);

}