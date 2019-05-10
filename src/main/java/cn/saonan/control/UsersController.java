package cn.saonan.control;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public String isLogin(Users user,HttpSession session) {
		Users vo = usersMapper.isLogin(user);
		if(vo!=null) {
			session.setAttribute("user", vo);
			System.out.println(vo.getRealname());
			return "server/index";
		}
		return "server/login";
		
	}
	
	@GetMapping(value="/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("user");
		return "server/login";
	}
	
	@ResponseBody
	@PostMapping(value="/weather")
	public String weather() {
		StringBuffer b = new StringBuffer();
		try {
			URL u = new URL("https://way.jd.com/jisuapi/weather?city=深圳&appkey=3aa9dfcfc136e1953edb18c45d1835f6");
			URLConnection openConnection = u.openConnection();
			InputStream inputStream = openConnection.getInputStream();
			InputStreamReader is = new InputStreamReader(inputStream);
			BufferedReader bis = new BufferedReader(is);
			String readLine = bis.readLine();
			for(;readLine!=null;) {
				b.append(readLine);
				readLine = bis.readLine();
				String str = b.toString();
			}
			
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(b.toString());
		return b.toString();
	}
}
