package cn.sao.control;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.sao.pojo.Users;
import cn.sao.service.impl.UsersServiceImpl;

@Controller
public class UsersController {
	
	@Autowired
	private UsersServiceImpl userServiceImpl;
	
	@RequestMapping(value = "/")
	public String login() {
		return "client/login";
	}
	
	@RequestMapping("/islogin")
	public String isLogin(Users users,HttpServletRequest request) {
		Users u = userServiceImpl.isLogin(users);
		if (u!=null) {
			request.getSession().setAttribute("users",u);
			return "forward:/shouyemes";
		}else {
			return "client/login";
		}
	}
	
	@RequestMapping(value = "/login")
	public String login(Users users,HttpServletRequest request) {
		Users u = userServiceImpl.Login(users);
		if (u!=null) {
			request.getSession().setAttribute("users", u);
			return "client/index";
		}
		return "client/login";
	}
	
	//预注册
	@RequestMapping(value="/prereg")
	public String prereg() {
		return "client/reg";
	}
	
	@RequestMapping("/reg")
	public String reg(Users users,HttpServletRequest request) {
		System.out.println("users:"+users);
		boolean flag = userServiceImpl.addUser(users);
		if (flag) {
			return "client/login";
		}
		return "client/reg";
	}
	
	@RequestMapping(value="/claim")
	public String claim() {
		return "client/claim";
	}
	
	@RequestMapping(value = "/myorder")
	public String myorder() {
		return "client/myorder";
	}
}


