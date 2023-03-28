package com.innovators.Arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innovators.Arangkada.Entity.AccountEntity;

@Repository

public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
	
	AccountEntity findByUsername(String username);

}
