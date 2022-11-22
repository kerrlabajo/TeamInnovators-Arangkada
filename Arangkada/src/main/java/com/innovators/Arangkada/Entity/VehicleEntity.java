package com.innovators.Arangkada.Entity;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;



	@Entity
	@Table (name = "tbl_vehicle")
	public class VehicleEntity {
		
		// Mariel Genodiala BSIT- 3
		@Id
		@GeneratedValue (strategy= GenerationType.IDENTITY)
		@Column(name="vehicle_id")
		private int vehicleId;
		@Column(name="plate_number")
		private String plateNumber;
		private String route;
		@Column(name="vehicle_type")
		private String vehicleType;
		@Column(name="make_model")
		private String makeModel;
		private int vin;
		@Column(name="or_status")
		private String orStatus;
		@Column(name="vehicle_condition")
		private String vehicleCondition;
		@Column(name="rental_fee")
		private double rentalFee;
		
		public VehicleEntity() {}
		
//		@OneToMany(cascade = CascadeType.MERGE)
//		private Set<OperatorEntity> operator;

		@OneToOne
		@JoinColumn(name="operatorId")
		OperatorEntity operator;

		public VehicleEntity(int vehicleId, String plateNumber, String route, String vehicleType, String makeModel,
				int vin, String orStatus, String vehicleCondition, double rentalFee, OperatorEntity operator) {
			super();
			this.vehicleId = vehicleId;
			this.plateNumber = plateNumber;
			this.route = route;
			this.vehicleType = vehicleType;
			this.makeModel = makeModel;
			this.vin = vin;
			this.orStatus = orStatus;
			this.vehicleCondition = vehicleCondition;
			this.rentalFee=rentalFee;
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

		public String getPlateNumber() {
			return plateNumber;
		}

		public String getVehicleType() {
			return vehicleType;
		}

		public String getMakeModel() {
			return makeModel;
		}

		public int getVin() {
			return vin;
		}
//		public Set<OperatorEntity> getOperator() {
//			return operator;
//		}
//		public void setOperator(Set<OperatorEntity> operator) {
//			this.operator = operator;
//		}
		public OperatorEntity getOperator() {
			return operator;
		}
		public void setOperator(OperatorEntity operator) {
			this.operator = operator;
		}
}
