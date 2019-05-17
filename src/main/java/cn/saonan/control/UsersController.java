package cn.saonan.control;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.saonan.pojo.Clerk;
import cn.saonan.service.UsersService;
import cn.saonan.utils.RSAInterface;


@Controller
public class UsersController {
	
	@Autowired
	private UsersService usersService;
	@Autowired
	private RSAInterface rSAInterface;
	
	static Map<Integer,String> map;
	@GetMapping(value="/")
	public String login() {
		return "server/login";
	}
	
//	@GetMapping(value="/")
//	public String login() {
//		return "server/index";
//	}

	@PostMapping(value="/login")
	public String isLogin(Clerk user,HttpSession session) throws Exception {
//		System.out.println("公钥"+map.get(0));
//		System.out.println("私钥"+map.get(1));
		System.out.println(user.getUserpwd());
		boolean check = usersService.isLogin(user,map.get(1));
		if(check==true) {
			Clerk vo=usersService.getClerk(user);
			session.setAttribute("user", vo);
			return "server/index";
		}else {
			return "server/login";
		}
		
	}
	
	@GetMapping(value="/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("user");
		return "server/login";
	}
	
	@ResponseBody
	@PostMapping(value="/weather")
	public String weather(HttpServletRequest request) throws Exception {
		
		/*
		 * String city = IpAdrressUtil.getCity(); System.out.println(city);
		 * 
		 * String ipAdrress = IpAdrressUtil.getIpAdrress(request);
		 */
		
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
		return b.toString();
	}
	@ResponseBody
	@PostMapping("/getKeys")
	public String getKeys() {
		map=rSAInterface.getCommAndPrivaKey();
		String publicKeys=map.get(0);
		return "\""+publicKeys+"\"";
	}
}
