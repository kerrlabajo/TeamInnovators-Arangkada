package com.innovators.Arangkada.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innovators.Arangkada.Entity.RentalEntity;
import com.innovators.Arangkada.Enum.RentalStatus;
import com.innovators.Arangkada.Service.RentalService;

@RestController
@RequestMapping("/rental")
@CrossOrigin
public class RentalController {

	@Autowired
	private RentalService rentalService;
	
	// Create
	@PostMapping("/postRental")
	public RentalEntity postRental(@RequestBody RentalEntity rental) {
		return rentalService.postRental(rental);
	}
	
	// Read
	@GetMapping("/getAllRentals")
	public List<RentalEntity> getAllRentals() {
		return rentalService.getAllRentals();
	}
	
	@GetMapping("/getRentalById/{id}")
	public RentalEntity getRentalById(@PathVariable int id) {
		return rentalService.getRentalById(id);
	}
	
	@GetMapping("/getRentalsByVehicleOperatorId/{id}")
	public List<RentalEntity> getRentalsByVehicleOperatorId(@PathVariable int id) {
		return rentalService.getRentalsByVehicleOperatorId(id);
	}
	
	@GetMapping("/getRentalsByStatusAndVehicleOperatorId/{id}")
	public List<RentalEntity> getRentalsByStatusAndVehicleOperatorId(@RequestParam RentalStatus status, @PathVariable int id) {
		return rentalService.getRentalsByStatusAndVehicleOperatorId(status, id);
	}
	
	@GetMapping("/getRentalsByDriverId/{id}")
	public List<RentalEntity> getRentalsByDriverId(@PathVariable int id) {
		return rentalService.getRentalsByDriverId(id);
	}
	
	@GetMapping("/getCurrentRentalsByOperatorId/{id}")
	public List<RentalEntity> getCurrentRentalsByOperatorId(@PathVariable int id) {
		return rentalService.getCurrentRentalsByOperatorId(id);
	}
	
	@GetMapping("/getCurrentRentalByDriverId/{id}")
	public RentalEntity getCurrentRentalByDriverId(@PathVariable int id) {
		return rentalService.getCurrentRentalByDriverId(id);
	}
	
	// Update
	@PutMapping("/putRental/{id}")
	public RentalEntity putRental(@PathVariable int id, @RequestBody RentalEntity newRentalDetails) {
		return rentalService.putRental(id, newRentalDetails);
	}
	
	// Delete
	@DeleteMapping("/deleteRental/{id}")
	public String deleteRental(@PathVariable int id) {
		return rentalService.deleteRental(id);
	}
}
