package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innovators.Arangkada.Entity.PaymentEntity;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer>{

	public List<PaymentEntity> findByRentalDriverDriverId(int id);
	
	public List<PaymentEntity> findByCollected(boolean collected);
}
