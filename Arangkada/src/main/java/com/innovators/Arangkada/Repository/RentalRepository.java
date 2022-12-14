package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.RentalEntity;
import com.innovators.Arangkada.Enum.RentalStatus;

@Repository
public interface RentalRepository extends JpaRepository<RentalEntity, Integer>{
	
	public List<RentalEntity> findByVehicleOperatorOperatorId(int id);
	public List<RentalEntity> findByStatusAndVehicleOperatorOperatorId(RentalStatus status, int id);
	public List<RentalEntity> findByDriverDriverId(int id);
	public List<RentalEntity> findByCurrentAndStatusIsNotAndVehicleOperatorOperatorId(boolean current, RentalStatus status, int id);
	public RentalEntity findByCurrentAndDriverDriverId(boolean current, int id);
	
	@Modifying
	@Query(
		value = "UPDATE tbl_rental SET status = 'FINISHED' WHERE status = 'APPROVED' AND current = 1 AND end_date < CURDATE();",
		nativeQuery = true	
	)
	public void updateStatusFinished();
	
	@Modifying
	@Query(
		value = "UPDATE tbl_rental SET status = 'EXPIRED', current = false WHERE status = 'PENDING' AND current = 1 AND end_date < CURDATE();",
		nativeQuery = true	
	)
	public void updateStatusExpired();
}
