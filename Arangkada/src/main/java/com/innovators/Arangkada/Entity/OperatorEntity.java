package com.innovators.arangkada.Entity;

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
	private int operatorid;
	
	private String businessname;
	private String permitnumber;
	
	@OneToOne
	@JoinColumn(name="accountid")
	AccountEntity account;
	
	public OperatorEntity() {}

	public OperatorEntity(int operatorid, String businessname, String permitnumber, AccountEntity account) {
		super();
		this.operatorid = operatorid;
		this.businessname = businessname;
		this.permitnumber = permitnumber;
		this.account = account;
	}

	public int getOperatorid() {
		return operatorid;
	}

	public String getBusinessname() {
		return businessname;
	}

	public void setBusinessname(String businessname) {
		this.businessname = businessname;
	}

	public String getPermitnumber() {
		return permitnumber;
	}

	public void setPermitnumber(String permitnumber) {
		this.permitnumber = permitnumber;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}
	
	
	
}
