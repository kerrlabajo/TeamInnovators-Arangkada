package com.innovators.Arangkada.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;



	@Entity
	@Table (name = "tbl_vehicle")
	@SQLDelete(sql = "UPDATE tbl_vehicle SET is_deleted = true WHERE vehicle_id=?")
	@Where(clause = "is_deleted=false")
	public class VehicleEntity {
		
		// Mariel Genodiala BSIT- 3
		@Id
		@GeneratedValue (strategy= GenerationType.IDENTITY)
		private int vehicleId;
		
		private String plateNumber;
		private String route;
		private String vehicleType;
		private String makeModel;
		private int vin;
		private String orStatus;
		private String vehicleCondition;
		private double rentalFee;
		private boolean isDeleted = Boolean.FALSE;
		@Column(name="is_rented")
		private boolean isRented = Boolean.FALSE;
		public VehicleEntity() {}
		
//		@OneToMany(cascade = CascadeType.MERGE)
//		private Set<OperatorEntity> operator;

		@ManyToOne
		@JoinColumn(name="operator_id", referencedColumnName = "operatorId")
		OperatorEntity operator;
		
		

		public VehicleEntity(int vehicleId, String plateNumber, String route, String vehicleType, String makeModel, int vin,
		String orStatus, String vehicleCondition, double rentalFee, boolean isDeleted, boolean isRented,
		OperatorEntity operator) {
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
		public boolean getIsDeleted() {
			return isDeleted;
		}
		public boolean isRented() {
			return isRented;
		}
		public void setRented(boolean isRented) {
			this.isRented = isRented;
		}
		
}
