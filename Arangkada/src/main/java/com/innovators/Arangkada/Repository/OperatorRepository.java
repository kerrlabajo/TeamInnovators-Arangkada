package com.innovators.arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.arangkada.Entity.OperatorEntity;

@Repository
public interface OperatorRepository extends JpaRepository<OperatorEntity, Integer>{
	
	OperatorEntity findByPermitnumber(String permitnumber);

}
