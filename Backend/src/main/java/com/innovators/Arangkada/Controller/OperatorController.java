package com.innovators.Arangkada.Controller;

import java.util.List;
import java.util.Optional;

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

import com.innovators.Arangkada.Entity.OperatorEntity;
import com.innovators.Arangkada.Service.OperatorService;

@RestController
@RequestMapping("/operator")
@CrossOrigin
public class OperatorController {
	
	@Autowired
	OperatorService oserve;
	
	//Create or insert
	@PostMapping("/postOperator")
	public OperatorEntity insertOperator(@RequestBody OperatorEntity operator) {
		return oserve.insertOperator(operator);
	}
		
	//Read all
	@GetMapping("/getAllOperators")
	public List<OperatorEntity> getAllOperators(){
		return oserve.getAllOperators();
	}
			
	//Read a record by Permit Number
	@GetMapping("/getByPermitnumber")
	public OperatorEntity findByPermitnumber(@RequestParam String permitNumber) {
		return oserve.findByPermitnumber(permitNumber);
	}
	
	@GetMapping("/getByAccountId/{accountId}")
	public List<OperatorEntity> findByAccountAccountId(@PathVariable int accountId){
		return oserve.findByAccountAccountId(accountId);
	}
	
	@GetMapping("/getByOperatorId/{operatorId}")
	public Optional<OperatorEntity> findByOperatorId(@PathVariable int operatorId){
		return oserve.findByOperatorId(operatorId);
	}
	
		
	//Update
	@PutMapping("/putOperator")
	public OperatorEntity putOperator(@RequestParam int operatorId, @RequestBody OperatorEntity newOperatorDetails) throws Exception{
		return oserve.putOperator(operatorId, newOperatorDetails);
	}
			
	//Delete
	@DeleteMapping("/deleteOperator/{operatorId}")
	public String deleteOperator(@PathVariable int operatorId) {
		return oserve.deleteOperator(operatorId);
	}

}
