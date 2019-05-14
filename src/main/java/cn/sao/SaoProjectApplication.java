package cn.sao;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value="cn.sao.mapper")
@SpringBootApplication
public class SaoProjectApplication {
  
	public static void main(String[] args) {
		SpringApplication.run(SaoProjectApplication.class, args);
	}

}
