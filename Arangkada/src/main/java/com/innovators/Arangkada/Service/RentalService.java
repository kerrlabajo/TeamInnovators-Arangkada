package com.innovators.Arangkada.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.RentalEntity;
import com.innovators.Arangkada.Enum.RentalStatus;
import com.innovators.Arangkada.Repository.RentalRepository;

@Service
public class RentalService {
	
	@Autowired
	private RentalRepository rentalRepository;
	
	// Create
	public RentalEntity postRental(RentalEntity rental) {
		rental.setStatus(RentalStatus.PENDING);	
		return rentalRepository.save(rental);
	}
	
	// Read
	public List<RentalEntity> getAllRentals() {
		return rentalRepository.findAll();
	}
	
	public RentalEntity getRentalById(int id) {
		return rentalRepository.findById(id).orElse(null);
	}
	
	public List<RentalEntity> getRentalsByVehicleOperatorId(int id) {
		return rentalRepository.findByVehicleOperatorOperatorId(id);
	}
	
	public List<RentalEntity> getRentalsByDriverId(int id) {
		return rentalRepository.findByDriverDriverid(id);
	}
	
	public RentalEntity getCurrentRentalByDriverId(int id) {
		return rentalRepository.findCurrentByDriverId(id);
	}
	
	
	// Update
	public RentalEntity putRental(int id, RentalEntity newRentalDetails) {
		if(rentalRepository.existsById(id)) {
			RentalEntity rental = rentalRepository.findById(id).get();
			rental.setStartDate(newRentalDetails.getStartDate());
			rental.setEndDate(newRentalDetails.getEndDate());
			rental.setStatus(newRentalDetails.getStatus());
			return rentalRepository.save(rental);
		}	
		return null;
	}
	
	// Delete
	public String deleteRental(int id) {
		String msg = "Rental with id: " + id + " is not found.";
		if(rentalRepository.existsById(id)) {
			rentalRepository.deleteById(id);
			msg = "Rental with id: " + id + " is successfully deleted.";
			return msg;
		}	
		return msg;
	}
}
