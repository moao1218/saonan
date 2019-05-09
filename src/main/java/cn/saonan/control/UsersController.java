package cn.saonan.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import cn.saonan.mapper.UsersMapper;
import cn.saonan.pojo.Users;


@Controller
public class UsersController {
	
	@Autowired
	private UsersMapper usersMapper;
	
	@GetMapping(value="/")
	public String login() {
		return "server/login";
	}
	
//	@GetMapping(value="/")
//	public String login() {
//		return "server/index";
//	}

	@PostMapping(value="/login")
	public String isLogin(Users user) {
		if(usersMapper.isLogin(user)>0) {
			return "server/index";
		}
		return "server/login";
		
	}
}
