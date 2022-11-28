package com.innovators.Arangkada.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.PaymentEntity;
import com.innovators.Arangkada.Repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;
	
	public PaymentEntity postPayment(PaymentEntity payment) {
		return paymentRepository.save(payment);
	}
	
	public List<PaymentEntity> getAllPayments() {
		return paymentRepository.findAll();
	}
	
	public PaymentEntity getPaymentById(int id) {
		return paymentRepository.findById(id).orElse(null);
	}
	
	public PaymentEntity putPayment(int id, PaymentEntity newPaymentDdetails) {
		if(paymentRepository.existsById(id)) {
			PaymentEntity payment = paymentRepository.findById(id).get();
			
			payment.setAmount(newPaymentDdetails.getAmount());
			payment.setDatePaid(newPaymentDdetails.getDatePaid());
			payment.setRent(newPaymentDdetails.getRent());
			
			return paymentRepository.save(payment);
		}	
		return null;
	}
	
	public String deletePayment(int id) {
		String msg = "Payment with id: " + id + " is not found.";
		if(paymentRepository.existsById(id)) {
			paymentRepository.deleteById(id);
			msg = "Payment with id: " + id + " is successfully deleted.";
			return msg;
		}	
		return msg;
	}
	
}