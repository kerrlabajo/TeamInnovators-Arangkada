package com.innovators.Arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.ApprovalRequestEntity;
import com.innovators.Arangkada.Repository.ApprovalRequestRepository;

@Service
public class ApprovalRequestService {

	@Autowired
	ApprovalRequestRepository arrepo;
	
	public ApprovalRequestEntity insertApprovalRequest(ApprovalRequestEntity request) {
		return arrepo.save(request);
	}
	
	public List<ApprovalRequestEntity> getAllApprovalRequests(){
		return arrepo.findAll(); 		
	}
	
	public ApprovalRequestEntity findByDrivername (String drivername) {
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
