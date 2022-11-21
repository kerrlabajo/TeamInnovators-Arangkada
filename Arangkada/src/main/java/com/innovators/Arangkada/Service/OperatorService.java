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
	public OperatorEntity findByPermitnumber(String permitnumber) {
		if(orepo.findByPermitnumber(permitnumber) != null)
			return orepo.findByPermitnumber(permitnumber);
		else
			return null;
	}
	
	//Update
	public OperatorEntity putOperator(int operatorid, OperatorEntity newOperatorDetails) throws Exception{
				
		OperatorEntity operator = new OperatorEntity();
				
			try {
				operator = orepo.findById(operatorid).get(); 
					
				operator.setBusinessname(newOperatorDetails.getBusinessname());
				operator.setPermitnumber(newOperatorDetails.getPermitnumber());
					
				return orepo.save(operator);
			}catch(NoSuchElementException nex) {
				throw new Exception("ID Number " + operatorid + " does not exist!");
			}
	}
	
	//Delete
		public String deleteOperator(int operatorid) {
			String msg;
			if(orepo.findById( operatorid) !=null) {
				orepo.deleteById( operatorid);
				
				msg = "Operator ID Number " +  operatorid + " is successfully deleted!";
			}
			else
				msg = "Operator ID Number " +  operatorid + " is NOT found!";
			
			return msg;
		}

}
