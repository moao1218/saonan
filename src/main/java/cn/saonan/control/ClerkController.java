package cn.saonan.control;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.service.ClerkService;
import cn.saonan.service.UsersService;

@Controller
public class ClerkController {

	@Autowired
	private ClerkService clerkservice;
	
	@Autowired
	private UsersService usersService ;

	@RequestMapping(value="/findClerkSplits")
	public String findClerkSplits(Model model) {
		
		  Map<String,Object> map = new HashMap<String,Object>(); 
		  int cp = 1; 
		  int ps =5;
		  
		  map.put("cp", cp); 
		  map.put("ps", ps); 
		  clerkservice.findClerkSplits(map);
		  
		  List<Clerk> clerklist =(List<Clerk>) map.get("clerks"); 
		  int count = (Integer)map.get("c_count"); 
		  int totalpage = (Integer) map.get("totalpage"); 
		 
		  List<City> cityList = usersService.findAllCity();
		  
		
		  model.addAttribute("cityList", cityList);
		  model.addAttribute("cp", cp);
		  model.addAttribute("ps", ps); 
		  model.addAttribute("count",count);
		  model.addAttribute("totalpage", totalpage);
		  model.addAttribute("clerklist", clerklist);
		
		 
		return "server/findAllClerk";

	}
	
	@RequestMapping(value="/clerksplic")
	public String clerksplic(Model model,HttpServletRequest request,Clerk clerk) throws Exception {
		
		  Map<String,Object> map = new HashMap<String,Object>(); 
		  int cp = 1; 
		  int ps =5;
		  
		  String cpp = request.getParameter("cp");
			
			if(cpp!=null&&!"".equals(cpp)){
				cp = Integer.parseInt(cpp);
			}
			
			String pss = request.getParameter("ps");
			if(pss!=null&&!"".equals(pss)){
				ps = Integer.parseInt(pss);
			}
			
			String kw = request.getParameter("kw");
			if(kw!=null&&!kw.equals("")){
				map.put("kw", kw);
			}
			
			String card =request.getParameter("card");
			if(card!=null&&!card.equals("")){
				map.put("card", card);
			}
			
			String rol = request.getParameter("rol");
			if(rol!=null&&!rol.equals("")){
				map.put("rol", rol);
			}
			
			String area = request.getParameter("area");
			if(area!=null&&!area.equals("")){
				map.put("are", area);
			}
			
			System.out.println(area);
			
		  
		  map.put("cp", cp); 
		  map.put("ps", ps); 
		  clerkservice.findClerkSplits(map);	
		  
		  List<Clerk> clerklist =(List<Clerk>) map.get("clerks"); 
		  int count = (Integer)map.get("c_count"); 
		  int totalpage = (Integer) map.get("totalpage"); 
		  

		  List<City> cityList = usersService.findAllCity();
		  model.addAttribute("cityList", cityList);
		  model.addAttribute("cp", cp);
		  model.addAttribute("ps", ps); 
		  model.addAttribute("count",count);
		  model.addAttribute("totalpage", totalpage);
		  model.addAttribute("clerklist", clerklist);
		  
		  return "server/findAllClerk";

	}
	
	
	
	
}