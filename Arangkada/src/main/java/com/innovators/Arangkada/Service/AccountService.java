package com.innovators.Arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.Arangkada.Entity.AccountEntity;
import com.innovators.Arangkada.Repository.AccountRepository;

@Service
public class AccountService {
	
	@Autowired
	AccountRepository arepo;
	
	//Create
	public AccountEntity insertAccount(AccountEntity account) {
		return arepo.save(account);
	}
	
	//Read
	public List<AccountEntity> getAllAccounts(){
		return arepo.findAll();
	}
	//Read2
	public AccountEntity findByUsername(String username) {
		if(arepo.findByUsername(username) != null)
			return arepo.findByUsername(username);
		else
			return null;
	}
	
	//Update
	public AccountEntity putStudent(int accountId, AccountEntity newAccountDetails) throws Exception{
			
		AccountEntity account = new AccountEntity();
			
			try {
				account = arepo.findById(accountId).get(); 
				
				account.setUsername(newAccountDetails.getUsername());
				account.setPassword(newAccountDetails.getPassword());
				
				return arepo.save(account);
			}catch(NoSuchElementException nex) {
				throw new Exception("ID Number " + accountId + " does not exist!");
			}
	}
	
	//Delete
	public String deleteAccount(int accountId) {
		String msg;
		if(arepo.findById( accountId) !=null) {
			arepo.deleteById( accountId);
			
			msg = "Account ID Number " +  accountId + " is successfully deleted!";
		}
		else
			msg = "Account ID Number " +  accountId + " is NOT found!";
		
		return msg;
	}
	
	

}
