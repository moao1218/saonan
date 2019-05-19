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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.saonan.pojo.Clerk;
import cn.saonan.service.UsersService;
import cn.saonan.utils.JsonUtil;
import cn.saonan.utils.RSAInterface;
import cn.saonan.utils.RedisUtil;


@Controller
public class UsersController {
	
	@Autowired
	private UsersService usersService;
	@Autowired
	private RSAInterface rSAInterface;
	@Autowired
	private RedisUtil redisUtil;
	
	@RequestMapping(value="/")
	public String login() {
		return "server/login";
	}
	
//	@GetMapping(value="/")
//	public String login() {
//		return "server/index";
//	}

	@RequestMapping(value="/login")
	public String isLogin(Clerk user,HttpSession session) throws Exception {
//		System.out.println("公钥"+map.get(0));
//		System.out.println("私钥"+map);
//		System.out.println(user.getUserpwd());
		String privatekey = (String) redisUtil.get("privatekey");
//		System.out.println("redis拿到的私钥:"+privatekey);
		boolean check = usersService.isLogin(user,privatekey);
//		System.out.println("check:"+check);
		if(check==true) {
			Clerk vo=usersService.getClerk(user);
			session.setAttribute("user", vo);
			return "server/index";
		}else {
			return "server/login";
		}
		
	}
	
	@RequestMapping(value="/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("user");
		return "server/login";
	}
	
	@ResponseBody
	@RequestMapping(value="/weather")
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
	@RequestMapping("/getKeys")
	public String getKeys() {
		Map<Integer, String> commAndPrivaKey = rSAInterface.getCommAndPrivaKey();
//		System.out.println("最开始创建的公钥"+commAndPrivaKey.get(0));
//		System.out.println("最开始创建的私钥"+commAndPrivaKey.get(1));
		redisUtil.set("publickey",commAndPrivaKey.get(0));
		redisUtil.set("privatekey",commAndPrivaKey.get(1));
		String publicKeys=commAndPrivaKey.get(0);
		return "\""+publicKeys+"\"";
	}
}
