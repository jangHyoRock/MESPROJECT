package kr.co.tipsvalley.sf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;

@SpringBootApplication
@Controller
public class MesFrontApplication {

	public static void main(String[] args) {
		SpringApplication.run(MesFrontApplication.class, args);
	}

}