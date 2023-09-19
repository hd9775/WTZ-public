package com.chibbol.wtz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class WtzApplication {

	public static void main(String[] args) {
		SpringApplication.run(WtzApplication.class, args);
	}

}
