package com.innovators.Arangkada.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "tbl_driver")
public class DriverEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private String driverid;
	
	private String licensenumber;
	private String licensecode;
	
	@OneToOne
	@JoinColumn(name="accountid")
	AccountEntity account;

	
		
	public DriverEntity() {}



	public DriverEntity(String driverid, String licensenumber, String licensecode, AccountEntity account) {
		super();
		this.driverid = driverid;
		this.licensenumber = licensenumber;
		this.licensecode = licensecode;
		this.account = account;
	}



	public String getDriverid() {
		return driverid;
	}



	public void setDriverid(String driverid) {
		this.driverid = driverid;
	}



	public String getLicensenumber() {
		return licensenumber;
	}



	public void setLicensenumber(String licensenumber) {
		this.licensenumber = licensenumber;
	}



	public String getLicensecode() {
		return licensecode;
	}



	public void setLicensecode(String licensecode) {
		this.licensecode = licensecode;
	}



	public AccountEntity getAccount() {
		return account;
	}



	public void setAccount(AccountEntity account) {
		this.account = account;
	}


	
	
	
}
