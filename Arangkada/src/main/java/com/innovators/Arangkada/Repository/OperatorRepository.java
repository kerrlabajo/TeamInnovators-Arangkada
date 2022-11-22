package com.innovators.Arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.OperatorEntity;

@Repository
public interface OperatorRepository extends JpaRepository<OperatorEntity, Integer>{
	
	OperatorEntity findByPermitNumber(String permitNumber);

}
