package com.innovators.Arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.ApprovalRequestsEntity;
import com.innovators.Arangkada.Repository.ApprovalRequestsRepository;

@Service
public class ApprovalRequestsService {

	@Autowired
	ApprovalRequestsRepository arrepo;
	
	public ApprovalRequestsEntity insertApprovalRequest(ApprovalRequestsEntity request) {
		return arrepo.save(request);
	}
	
	public List<ApprovalRequestsEntity> getAllApprovalRequests(){
		return arrepo.findAll(); 		
	}
	
	public ApprovalRequestsEntity findByDrivername (String drivername) {
		if (arrepo.findByDrivername(drivername)!=null)
			return arrepo.findByDrivername(drivername);
		else
			return null;
	}
	
	public String deleteApprovalRequest(int requestid) {
		String msg;
		if(arrepo.findById(requestid) != null) {       
			arrepo.deleteById(requestid);				
				
			msg = "Approval ID " + requestid + " is successfully deleted!";
		}
		else
			msg = "Approval " + requestid + " is NOT found!";
		
		return msg;
	}
}
