package cn.saonan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value ="cn.saonan.mapper")
public class SaonanProjectApplication {
  
	public static void main(String[] args) {
		SpringApplication.run(SaonanProjectApplication.class, args);
	}

}
