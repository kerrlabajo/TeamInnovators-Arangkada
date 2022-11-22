package com.innovators.Arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.ApprovalRequestEntity;

@Repository
public interface ApprovalRequestRepository extends JpaRepository<ApprovalRequestEntity, Integer>{
	
	ApprovalRequestEntity findByDrivername(String drivername);

}
