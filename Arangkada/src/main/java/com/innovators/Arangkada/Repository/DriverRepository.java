package com.innovators.arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.arangkada.Entity.DriverEntity;



@Repository
public interface DriverRepository extends JpaRepository<DriverEntity, Integer> {
	
	DriverEntity findByDriverid(String driverid);

}
