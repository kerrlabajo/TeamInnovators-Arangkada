package com.innovators.Arangkada.Entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.innovators.Arangkada.Enum.RentalStatus;

@Entity
@Table(name="tbl_rental")
public class RentalEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int rentalId;
	
	@Column(name = "start_date")
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date startDate;
	
	@Column(name = "end_date")
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date endDate;
	
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private RentalStatus status;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "vehicle_id", referencedColumnName = "vehicle_id")
	private VehicleEntity vehicle;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "driver_id", referencedColumnName = "driverid")
	private DriverEntity driver;
	
	public RentalEntity() {}

	public RentalEntity(int rentalId, Date startDate, Date endDate, RentalStatus status, VehicleEntity vehicle,
			DriverEntity driver) {
		super();
		this.rentalId = rentalId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
		this.vehicle = vehicle;
		this.driver = driver;
	}

	public int getRentalId() {
		return rentalId;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public RentalStatus getStatus() {
		return status;
	}

	public void setStatus(RentalStatus status) {
		this.status = status;
	}

	public VehicleEntity getVehicle() {
		return vehicle;
	}

	public DriverEntity getDriver() {
		return driver;
	}
	
}