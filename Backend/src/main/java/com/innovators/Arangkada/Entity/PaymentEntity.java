package com.innovators.Arangkada.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="tbl_payment")
public class PaymentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int paymentId;
	private double amount;
	
	@Temporal(TemporalType.DATE)
	private Date datePaid;
	
	@OneToOne
	@JoinColumn(name = "rental_id", referencedColumnName = "rentalId")
	private RentalEntity rental;
	
	private boolean collected;

	public PaymentEntity() {}
	
	public PaymentEntity(int paymentId, double amount, Date datePaid, RentalEntity rental, boolean collected) {
		super();
		this.paymentId = paymentId;
		this.amount = amount;
		this.datePaid = datePaid;
		this.rental = rental;
		this.collected = collected;
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

	public RentalEntity getRental() {
		return rental;
	}

	public void setRental(RentalEntity rental) {
		this.rental = rental;
	}
	
	public boolean getCollected() {
		return collected;
	}

	public void setCollected(boolean collected) {
		this.collected = collected;
	}
}
