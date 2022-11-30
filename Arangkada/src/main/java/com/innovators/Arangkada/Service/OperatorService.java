package com.innovators.Arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.OperatorEntity;
import com.innovators.Arangkada.Repository.OperatorRepository;

@Service
public class OperatorService {
	
	@Autowired
	OperatorRepository orepo;
	
	//Create
	public OperatorEntity insertOperator(OperatorEntity operator) {
		return orepo.save(operator);
	}
	
	//Read
	public List<OperatorEntity> getAllOperators(){
		return orepo.findAll();
	}
	//Read2
	public OperatorEntity findByPermitnumber(String permitNumber) {
		if(orepo.findByPermitNumber(permitNumber) != null)
			return orepo.findByPermitNumber(permitNumber);
		else
			return null;
	}
	
	//Update
	public OperatorEntity putOperator(int operatorId, OperatorEntity newOperatorDetails) throws Exception{
				
		OperatorEntity operator = new OperatorEntity();
				
			try {
				operator = orepo.findById(operatorId).get(); 
					
				operator.setBusinessName(newOperatorDetails.getBusinessName());
				operator.setPermitNumber(newOperatorDetails.getPermitNumber());
					
				return orepo.save(operator);
			}catch(NoSuchElementException nex) {
				throw new Exception("ID Number " + operatorId + " does not exist!");
			}
	}
	
	//Delete
		public String deleteOperator(int operatorId) {
			String msg;
			if(orepo.findById( operatorId).orElse(null) !=null) {
				orepo.deleteById( operatorId);
				
				msg = "Operator ID Number " +  operatorId + " is successfully deleted!";
			}
			else
				msg = "Operator ID Number " +  operatorId + " is NOT found!";
			
			return msg;
		}

}
