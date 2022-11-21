package com.innovators.Arangkada.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="tbl_account")
public class AccountEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int accountId;
	
	
	private String firstname;
	private String middlename;
	private String lastname;
	
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape =JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date birthdate;
	
	private int age;
	private String contactNumber;
	private String address;
	private String gender;
	private String username;
	private String password;
	private String accountType;
	
	public AccountEntity() {}

	public AccountEntity(int accountId, String firstname, String middlename, String lastname, Date birthdate, int age,
			String contactNumber, String address, String gender, String username, String password, String accountType) {
		super();
		this.accountId = accountId;
		this.firstname = firstname;
		this.middlename = middlename;
		this.lastname = lastname;
		this.birthdate = birthdate;
		this.age = age;
		this.contactNumber = contactNumber;
		this.address = address;
		this.gender = gender;
		this.username = username;
		this.password = password;
		this.accountType = accountType;
	}

	public int getAccountId() {
		return accountId;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getMiddlename() {
		return middlename;
	}

	public void setMiddlename(String middlename) {
		this.middlename = middlename;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	
	

}