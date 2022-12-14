package com.innovators.Arangkada.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovators.Arangkada.Entity.PaymentEntity;
import com.innovators.Arangkada.Service.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/postPayment")
	public PaymentEntity postPayment(@RequestBody PaymentEntity payment) {
		return paymentService.postPayment(payment);
	}
	
	@GetMapping("/getAllPayments/{id}")
	public List<PaymentEntity> getAllPayments(@PathVariable int id) {
		return paymentService.getAllPayments(id);
	}
	
	@GetMapping("/getAllCollectedPayments/{id}")
	public List<PaymentEntity> getAllCollectedPayments(@PathVariable int id) {
		return paymentService.getAllCollectedPayments(id);
	}
	
	@GetMapping("/getAllUnCollectedPayments/{id}")
	public List<PaymentEntity> getAllUnCollectedPayments(@PathVariable int id) {
		return paymentService.getAllUnCollectedPayments(id);
	}
	
	@GetMapping("/getPaymentsByDriverId/{id}")
	public List<PaymentEntity> getPaymentsByDriverId(@PathVariable int id) {
		return paymentService.getPaymentsByDriverId(id);
	}
	
	@GetMapping("/getPaymentById/{id}")
	public PaymentEntity getPaymentById(@PathVariable int id) {
		return paymentService.getPaymentById(id);
	}
	
	@PutMapping("/putPayment/{id}")
	public PaymentEntity putPayment(@PathVariable int id, @RequestBody PaymentEntity newPaymentDetails) {
		return paymentService.putPayment(id, newPaymentDetails);
	}
	
	@PutMapping("/putCollected/{id}")
	public PaymentEntity putCollected(@PathVariable int id, @RequestBody PaymentEntity newPaymentDetails) {
		return paymentService.putCollected(id, newPaymentDetails);
	}
	
	@DeleteMapping("/deletePayment/{id}")
	public String deletePayment(@PathVariable int id) {
		return paymentService.deletePayment(id);
	}
}
