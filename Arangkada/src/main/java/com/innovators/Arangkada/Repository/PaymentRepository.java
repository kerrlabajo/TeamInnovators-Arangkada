package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.PaymentEntity;
import com.innovators.Arangkada.Entity.RentalEntity;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer>{

	public List<PaymentEntity> findByRentalDriverid(int id);
}
