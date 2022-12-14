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

import com.innovators.Arangkada.Entity.AccountEntity;
import com.innovators.Arangkada.Service.AccountService;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {
	
	@Autowired
	AccountService aserve;
	
	//Create or insert
	@PostMapping("/postAccount")
	public AccountEntity insertAccount(@RequestBody AccountEntity account) {
		return aserve.insertAccount(account);
	}
	
	//Read all records
	@GetMapping("/getAllAccounts")
	public List<AccountEntity> getAllAccounts(){
		return aserve.getAllAccounts();
	}
	
	@GetMapping("/getAccountById/{accountId}")
	public Optional<AccountEntity> findByAccountId(@PathVariable int accountId){
		return aserve.findByAccountId(accountId);
	}
		
	//Read a record by Username
	@GetMapping("/getByUsername")
	public AccountEntity findByUsername(@RequestParam String username) {
		return aserve.findByUsername(username);
	}
	
	//Update a record
	@PutMapping("/putAccount")
	public AccountEntity putAccount(@RequestParam int accountId, @RequestBody AccountEntity newAccountDetails) throws Exception{
		return aserve.putAccount(accountId, newAccountDetails);
	}
		
	//Delete a record
	@DeleteMapping("/deleteAccount/{accountId}")
	public String deleteAccount(@PathVariable int accountId) {
		return aserve.deleteAccount(accountId);
	}
		

}
