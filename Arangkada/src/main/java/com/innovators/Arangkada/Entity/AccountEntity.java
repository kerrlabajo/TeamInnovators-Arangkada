package com.innovators.Arangkada.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_account")
public class AccountEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int accountid;
	
	
	private String firstname;
	private String middlename;
	private String lastname;
	private Date birthdate;
	private int age;
	private String number;
	private String address;
	private String gender;
	private String username;
	private String password;
	private String accounttype;
	
	public AccountEntity() {}

	public AccountEntity(int accountid, String firstname, String middlename, String lastname, Date birthdate, int age,
			String number, String address, String gender, String username, String password, String accounttype) {
		super();
		this.accountid = accountid;
		this.firstname = firstname;
		this.middlename = middlename;
		this.lastname = lastname;
		this.birthdate = birthdate;
		this.age = age;
		this.number = number;
		this.address = address;
		this.gender = gender;
		this.username = username;
		this.password = password;
		this.accounttype = accounttype;
	}

	public int getAccountid() {
		return accountid;
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

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
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

	public String getAccounttype() {
		return accounttype;
	}

	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
	}
	
	
	

}