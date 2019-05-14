package cn.sao.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsersController {
	
	@GetMapping(value="/")
	public String login() {
		return "client/login";
	}
	
	@GetMapping(value="reg")
	public String reg() {
		return "client/reg";
	}
	
	@GetMapping(value="claim")
	public String claim() {
		return "client/claim";
	}
	
	@GetMapping(value = "myorder")
	public String myorder() {
		return "client/myorder";
	}
}


