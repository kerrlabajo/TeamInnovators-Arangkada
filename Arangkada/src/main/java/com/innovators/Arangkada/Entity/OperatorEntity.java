package com.innovators.Arangkada.Entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="tbl_operator")
public class OperatorEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int operatorId;
	
	private String businessName;
	private String permitNumber;
	
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name="account_id",  referencedColumnName = "accountId")
	AccountEntity account;
	
	public OperatorEntity() {}

	public OperatorEntity(int operatorId, String businessName, String permitNumber, AccountEntity account) {
		super();
		this.operatorId = operatorId;
		this.businessName = businessName;
		this.permitNumber = permitNumber;
		this.account = account;
	}

	public int getOperatorId() {
		return operatorId;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getPermitNumber() {
		return permitNumber;
	}

	public void setPermitNumber(String permitNumber) {
		this.permitNumber = permitNumber;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}
	
	
	
}
