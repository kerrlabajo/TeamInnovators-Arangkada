package com.innovators.Arangkada.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_approval_requests")
public class ApprovalRequestsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int requestId;
	
	@OneToOne
	@JoinColumn(name = "driverid")
	DriverEntity driver;
	
	@OneToOne
	@JoinColumn(name = "operatorid")
	OperatorEntity operator;

	public ApprovalRequestsEntity() {}
	
	public ApprovalRequestsEntity(int requestId, DriverEntity driver, OperatorEntity operator) {
		super();
		this.requestId = requestId;
		this.driver = driver;
		this.operator = operator;
	}

	public int getRequestId() {
		return requestId;
	}

	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}

	public DriverEntity getDriver() {
		return driver;
	}

	public void setDriver(DriverEntity driver) {
		this.driver = driver;
	}

	public OperatorEntity getOperator() {
		return operator;
	}

	public void setOperator(OperatorEntity operator) {
		this.operator = operator;
	}
	
	
}
