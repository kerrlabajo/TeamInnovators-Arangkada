package com.innovators.Arangkada.Entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tbl_payment")
public class PaymentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentId;
	private double amount;
	private Date datePaid;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "rental_id", referencedColumnName = "rental_id")
	private RentalEntity rent;

	public PaymentEntity() {}
	
	public PaymentEntity(int paymentId, double amount, Date datePaid, RentalEntity rent) {
		super();
		this.paymentId = paymentId;
		this.amount = amount;
		this.datePaid = datePaid;
		this.rent = rent;
	}

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getDatePaid() {
		return datePaid;
	}

	public void setDatePaid(Date datePaid) {
		this.datePaid = datePaid;
	}

	public RentalEntity getRent() {
		return rent;
	}

	public void setRent(RentalEntity rent) {
		this.rent = rent;
	}
	
	
}
