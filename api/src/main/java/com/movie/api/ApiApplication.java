package com.movie.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.movie.api")
public class ApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(ApiApplication.class, args);
	}
}
