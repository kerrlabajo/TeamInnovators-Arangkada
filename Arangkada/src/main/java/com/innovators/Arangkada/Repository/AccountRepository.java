package com.innovators.arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.arangkada.Entity.AccountEntity;

@Repository

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
	
	AccountEntity findByUsername(String username);

}
