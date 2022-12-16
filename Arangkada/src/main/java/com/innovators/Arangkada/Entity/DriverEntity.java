package com.innovators.Arangkada.Entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "tbl_driver")
@SQLDelete(sql = "UPDATE tbl_operator SET is_deleted = true WHERE operator_id=?")
@Where(clause = "is_deleted=false")
public class DriverEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int driverId;
	
	private String licenseNumber;
	private String licenseCode;
	private boolean isDeleted = Boolean.FALSE;
	
	@OneToOne(cascade = { CascadeType.REMOVE, CascadeType.MERGE })
	@JoinColumn(name="account_id",  referencedColumnName = "accountId")
	AccountEntity account;
	
	public DriverEntity() {}

	public DriverEntity(int driverId, String licenseNumber, String licenseCode, AccountEntity account) {
		super();
		this.driverId = driverId;
		this.licenseNumber = licenseNumber;
		this.licenseCode = licenseCode;
		this.account = account;
	}

	public int getDriverId() {
		return driverId;
	}

	public String getLicenseNumber() {
		return licenseNumber;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	public String getLicenseCode() {
		return licenseCode;
	}

	public void setLicenseCode(String licenseCode) {
		this.licenseCode = licenseCode;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}
	
	public boolean getIsDeleted() {
		return isDeleted;
	}
	
}
