package cn.saonan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import cn.saonan.component.LoginInterceptor;
import cn.saonan.component.MyLocaleResolver;

@Configuration
public class MyMvcConfig implements WebMvcConfigurer{

	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
		WebMvcConfigurer adapter = new WebMvcConfigurer() {
			
			  @Override public void addViewControllers(ViewControllerRegistry registry) {
			  
			  registry.addViewController("/").setViewName("server/login");
			  registry.addViewController("/index.html").setViewName("server/login");
			  
			  }
			 
			@Override
			public void addInterceptors(InterceptorRegistry registry) {
				registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**")
					.excludePathPatterns("/","/index.html","/login");
			}
			
		};
		return adapter;
		
	}
	
	@Bean
	public LocaleResolver localeResolver() {
		return new MyLocaleResolver();
	}
}
