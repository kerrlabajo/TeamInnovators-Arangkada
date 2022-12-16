package com.innovators.Arangkada.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		rental.setCurrent(true);
		return rentalRepository.save(rental);
	}
	
	// Read
	@Transactional
	public List<RentalEntity> getRentalsByVehicleOperatorId(int id) {
		updateRentalStatus();
		return rentalRepository.findByVehicleOperatorOperatorId(id);
	}
	
	@Transactional
	public List<RentalEntity> getRentalsByStatusAndVehicleOperatorId(RentalStatus status, int id) {
		updateRentalStatus();
		return rentalRepository.findByStatusAndVehicleOperatorOperatorId(status, id);
	}
	
	@Transactional
	public List<RentalEntity> getRentalsByDriverId(int id) {
		updateRentalStatus();
		return rentalRepository.findByDriverDriverId(id);
	}
	
	@Transactional
	public List<RentalEntity> getCurrentRentalsByOperatorId(int id) {
		updateRentalStatus();
		return rentalRepository.findByCurrentAndStatusIsNotAndVehicleOperatorOperatorId(true, RentalStatus.PENDING, id);
	}

	@Transactional
	public RentalEntity getCurrentRentalByDriverId(int id) {
		updateRentalStatus();
		return rentalRepository.findByCurrentAndDriverDriverId(true, id);
	}
	
	// Update
	public RentalEntity putRental(int id, RentalEntity newRentalDetails) {
		if(rentalRepository.existsById(id)) {
			RentalEntity rental = rentalRepository.findById(id).get();
			rental.setStartDate(newRentalDetails.getStartDate());
			rental.setEndDate(newRentalDetails.getEndDate());
			rental.setStatus(newRentalDetails.getStatus());
			rental.setCurrent(newRentalDetails.getCurrent());
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
	
	public void updateRentalStatus() {
		rentalRepository.updateStatusExpired();
		rentalRepository.updateStatusFinished();
	}
}
