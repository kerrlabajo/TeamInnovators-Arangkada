package com.innovators.Arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.ApprovalRequestsEntity;

@Repository
public interface ApprovalRequestsRepository extends JpaRepository<ApprovalRequestsEntity, Integer>{
	
	ApprovalRequestsEntity findByDrivername(String drivername);

}
