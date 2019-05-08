package cn.saonan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value="cn.saonan.mapper")
@SpringBootApplication
public class SaonanProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SaonanProjectApplication.class, args);
	}

}
