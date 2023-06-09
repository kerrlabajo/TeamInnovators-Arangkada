package com.innovators.Arangkada;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@ComponentScan(basePackages = {"com.innovators.Arangkada.Controller", "com.innovators.Arangkada.Service", "com.innovators.Arangkada.Repository", "com.innovators.Arangkada.Entity"})
@Import(WebConfig.class)
@SpringBootApplication
public class ArangkadaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArangkadaApplication.class, args);
//		 System.out.println("Hello !");
	}

}
