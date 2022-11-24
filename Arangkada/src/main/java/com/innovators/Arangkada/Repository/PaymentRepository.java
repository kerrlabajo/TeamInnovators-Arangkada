package com.innovators.Arangkada.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.PaymentEntity;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer>{

}