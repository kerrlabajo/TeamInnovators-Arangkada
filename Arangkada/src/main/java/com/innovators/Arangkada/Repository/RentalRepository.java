package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.RentalEntity;
import com.innovators.Arangkada.Enum.RentalStatus;

@Repository
public interface RentalRepository extends JpaRepository<RentalEntity, Integer>{
	
	public List<RentalEntity> findByVehicleOperatorOperatorId(int id);
	public List<RentalEntity> findByStatusAndVehicleOperatorOperatorId(RentalStatus status, int id);
	public List<RentalEntity> findByDriverDriverid(int id);
	
	@Query(value = "select * from tbl_rental where driver_id = ?1 and status in ('PENDING', 'APPROVED') limit 1", nativeQuery = true)
	public RentalEntity findCurrentByDriverId(int id);
}
