package com.innovators.Arangkada.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innovators.Arangkada.Entity.ApprovalRequestEntity;
import com.innovators.Arangkada.Service.ApprovalRequestService;

@RestController
@RequestMapping("/approvalRequests")
public class ApprovalRequestController {

	@Autowired
	ApprovalRequestService arrserv;
	
	@PostMapping("/postApprovalRequest")
	public ApprovalRequestEntity insertApprovalRequest(@RequestBody ApprovalRequestEntity driver) {
		return arrserv.insertApprovalRequest(driver);
	}
	
	@GetMapping("/displayAllApprovalRequests")
	public List<ApprovalRequestEntity> getAllApprovalRequests(){
		return arrserv.getAllApprovalRequests(); 	
	}
	
	@GetMapping("/getByDriverName")
	public ApprovalRequestEntity findByDrivername(@RequestParam String drivername) {
		return arrserv.findByDrivername(drivername);	
	}
	
	@DeleteMapping("/deleteApprovalRequest/{requestid}")
	public String deleteApprovalRequest(@PathVariable int requestid) {
		return arrserv.deleteApprovalRequest(requestid);
	}
}
