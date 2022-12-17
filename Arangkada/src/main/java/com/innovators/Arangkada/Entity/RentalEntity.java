package com.innovators.Arangkada.Entity;

import java.util.Date;

import javax.persistence.CascadeType;
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

import com.innovators.Arangkada.Enum.RentalStatus;

@Entity
@Table(name="tbl_rental")
public class RentalEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int rentalId;
	
	@Temporal(TemporalType.DATE)
	private Date startDate;
	
	@Temporal(TemporalType.DATE)
	private Date endDate;
	
	@Enumerated(EnumType.STRING)
	private RentalStatus status;
	
	private boolean current;
	
	private boolean paid;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "vehicle_id", referencedColumnName = "vehicleId")
	private VehicleEntity vehicle;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "driver_id", referencedColumnName = "driverId")
	private DriverEntity driver;
	
	public RentalEntity() {}

	public RentalEntity(int rentalId, Date startDate, Date endDate, RentalStatus status, boolean current, boolean paid,
			VehicleEntity vehicle, DriverEntity driver) {
		super();
		this.rentalId = rentalId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
		this.current = current;
		this.paid = paid;
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
	
	public boolean isCurrent() {
		return current;
	}

	public void setCurrent(boolean current) {
		this.current = current;
	}

	public VehicleEntity getVehicle() {
		return vehicle;
	}

	public DriverEntity getDriver() {
		return driver;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	
}
