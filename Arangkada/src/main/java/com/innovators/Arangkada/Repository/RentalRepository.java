package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.RentalEntity;

@Repository
public interface RentalRepository extends JpaRepository<RentalEntity, Integer>{
	
	public List<RentalEntity> findByVehicleOperatorOperatorId(int id);
	
	@Query(value = "select * from tbl_rental where driver_id = ?1 and status in ('PENDING', 'APPROVED') limit 1", nativeQuery = true)
	public RentalEntity findCurrentByDriverId(int id);
	
	@Query(value = "select * from tbl_rental where driver_id = ?1 and status not in ('PENDING', 'APPROVED')", nativeQuery = true)
	public List<RentalEntity> findPreviousByDriverId(int id);
}