package com.innovators.arangkada.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innovators.arangkada.Entity.OperatorEntity;
import com.innovators.arangkada.Service.OperatorService;

@RestController
@RequestMapping("/operator")
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
	public OperatorEntity findByPermitnumber(@RequestParam String permitnumber) {
		return oserve.findByPermitnumber(permitnumber);
	}
		
	//Update
	@PutMapping("/putOperator")
	public OperatorEntity putOperator(@RequestParam int operatorid, @RequestBody OperatorEntity newOperatorDetails) throws Exception{
		return oserve.putOperator(operatorid, newOperatorDetails);
	}
			
	//Delete
	@DeleteMapping("/deleteOperator/{operatorid}")
	public String deleteOperator(@PathVariable int operatorid) {
		return oserve.deleteOperator(operatorid);
	}

}
