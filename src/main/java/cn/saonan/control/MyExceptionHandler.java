package cn.saonan.control;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class MyExceptionHandler {

//	@ResponseBody
//	@ExceptionHandler
//	public Map<String,Object> handleException(Exception e) {
//		Map<String,Object> map = new HashMap<String,Object>();
//		map.put("code", "user not exist");
//		map.put("message",e.getMessage());
//		return map;
//	}
	
	@ExceptionHandler
	public String handleException(Exception e) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("code", "user not exist");
		map.put("message",e.getMessage());
		return "forward:/error";
	}
}
