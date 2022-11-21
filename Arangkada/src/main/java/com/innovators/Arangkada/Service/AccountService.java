package com.innovators.arangkada.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovators.arangkada.Entity.AccountEntity;
import com.innovators.arangkada.Repository.AccountRepository;

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
	public AccountEntity putStudent(int accountid, AccountEntity newAccountDetails) throws Exception{
			
		AccountEntity account = new AccountEntity();
			
			try {
				account = arepo.findById(accountid).get(); 
				
				account.setUsername(newAccountDetails.getUsername());
				account.setPassword(newAccountDetails.getPassword());
				
				return arepo.save(account);
			}catch(NoSuchElementException nex) {
				throw new Exception("ID Number " + accountid + " does not exist!");
			}
	}
	
	//Delete
	public String deleteAccount(int accountid) {
		String msg;
		if(arepo.findById( accountid) !=null) {
			arepo.deleteById( accountid);
			
			msg = "Account ID Number " +  accountid + " is successfully deleted!";
		}
		else
			msg = "Account ID Number " +  accountid + " is NOT found!";
		
		return msg;
	}
	
	

}
