package cn.sao.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.sao.pojo.City;
import cn.sao.service.CityService;

@Controller
public class CityController {
	@Autowired
	CityService CityServiceImpl;
	@GetMapping("/ui")
	public String findcity(HttpServletRequest request) {
		 List<City> findallcity = CityServiceImpl.findallcity();
		 
		 request.setAttribute("findallcity", findallcity);
		 return "client/indexOne";
	}
	@ResponseBody
	@PostMapping("/u")
	public List findstreetbyid(HttpServletResponse response,String code) {
		System.out.println("code="+code);
		List<City> findstreet = CityServiceImpl.findstreet(code);
		return findstreet;
		
	}
}
