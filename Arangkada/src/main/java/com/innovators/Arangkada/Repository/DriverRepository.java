package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.DriverEntity;
import com.innovators.Arangkada.Entity.OperatorEntity;


@Repository
public interface DriverRepository extends JpaRepository<DriverEntity, Integer> {
	
	DriverEntity findByLicenseNumber(String licenseNumber);
	List<DriverEntity> findByAccountAccountId(int accountId);

}
