package cn.saonan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@MapperScan(value ="cn.saonan.mapper")
@EnableRedisHttpSession //开启session共享
public class SaonanProjectApplication {
  
	public static void main(String[] args) {
		SpringApplication.run(SaonanProjectApplication.class, args);
	}

}
