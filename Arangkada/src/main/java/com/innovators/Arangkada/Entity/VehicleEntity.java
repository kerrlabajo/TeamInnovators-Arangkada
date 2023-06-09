package com.innovators.Arangkada.Entity;

import java.util.ArrayList;
import java.util.HashSet;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "tbl_vehicle", uniqueConstraints = {
        @UniqueConstraint(name = "UniquePlateNumberAndVIN", columnNames = {"plateNumber", "vin"})})
@SQLDelete(sql = "UPDATE tbl_vehicle SET is_deleted = true WHERE vehicle_id=?")
@Where(clause = "is_deleted=false")
@Component
public class VehicleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;

    @Column(unique = true)
    private String plateNumber;
    private String route;
    private String vehicleType;
    private String makeModel;

    @Column(unique = true, nullable = false)
    private String vin = ""; // set a default value for vin

    private String orStatus;
    private String vehicleCondition;
    private double rentalFee;
    private boolean isDeleted = Boolean.FALSE;
    private boolean isRented = Boolean.FALSE;
    private String deletionReason;
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.PERSIST)
    private Set<VehiclePictureEntity> pictures = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "operator_id", referencedColumnName = "operatorId")
    OperatorEntity operator;
    

	    public VehicleEntity() {
	        this.vin = ""; // set a default value for vin in the constructor
	    }
	
	    public VehicleEntity(int vehicleId, String plateNumber, String route, String vehicleType, String makeModel, String vin,
	                         String orStatus, String vehicleCondition, double rentalFee, boolean isDeleted, boolean isRented,
	                         String deletionReason, OperatorEntity operator) {
	        super();
	        this.vehicleId = vehicleId;
	        this.plateNumber = plateNumber;
	        this.route = route;
	        this.vehicleType = vehicleType;
	        this.makeModel = makeModel;
	        this.vin = vin;
	        this.orStatus = orStatus;
	        this.vehicleCondition = vehicleCondition;
	        this.rentalFee = rentalFee;
	        this.isDeleted = isDeleted;
	        this.isRented = isRented;
	        this.deletionReason = deletionReason;
	        this.operator = operator;
	    }
		public String getRoute() {
			return route;
		}
		
		public void setRoute(String route) {
			this.route = route;
		}

		public String getOrStatus() {
			return orStatus;
		}

		public void setOrStatus(String orStatus) {
			this.orStatus = orStatus;
		}

		public String getVehicleCondition() {
			return vehicleCondition;
		}

		public void setVehicleCondition(String vehicleCondition) {
			this.vehicleCondition = vehicleCondition;
		}
		
		public double getRentalFee() {
			return rentalFee;
		}
		public void setRentalFee(double rentalFee) {
			this.rentalFee = rentalFee;
		}
		public int getVehicleId() {
	        return vehicleId;
	    }

	    public void setVehicleId(int vehicleId) {
	        this.vehicleId = vehicleId;
	    }


		public String getPlateNumber() {
			return plateNumber;
		}

		public String getVehicleType() {
			return vehicleType;
		}

		public String getMakeModel() {
			return makeModel;
		}

		public String getVin() {
			return vin;
		}
		public OperatorEntity getOperator() {
			return operator;
		}
		public void setOperator(OperatorEntity operator) {
			this.operator = operator;
		}
		public boolean getIsDeleted() {
			return isDeleted;
		}
		public boolean isRented() {
			return isRented;
		}
		public void setRented(boolean isRented) {
			this.isRented = isRented;
		}

		public String getDeletionReason() {
			return deletionReason;
		}

		public void setDeletionReason(String deletionReason) {
			this.deletionReason = deletionReason;
		}
}
