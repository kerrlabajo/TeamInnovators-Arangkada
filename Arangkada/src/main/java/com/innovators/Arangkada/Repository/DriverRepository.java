package com.innovators.Arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.DriverEntity;



@Repository
public interface DriverRepository extends JpaRepository<DriverEntity, Integer> {
	
	DriverEntity findByDriverid(int driverid);

}
