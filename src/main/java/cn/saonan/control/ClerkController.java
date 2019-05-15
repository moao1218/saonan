package cn.saonan.control;

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
import cn.saonan.pojo.Roless;
import cn.saonan.service.ClerkService;
import cn.saonan.service.RolessService;
import cn.saonan.service.UsersService;



@Controller
public class ClerkController {

	@Autowired
	private ClerkService clerkservice;
	
	@Autowired
	private UsersService usersService ;
	
	@Autowired
	private RolessService rolessservice;

	@RequestMapping(value="/findClerkSplits")
	public String findClerkSplits(Model model) {
		
		  Map<String,Object> map = new HashMap<String,Object>(); 
		  int cp = 1; 
		  int ps =5;
		  
		  map.put("cp", cp); 
		  map.put("ps", ps); 
		  clerkservice.findClerkSplit(map);
		  
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
		
		 
		return "server/clerk_findAll";

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
		  clerkservice.findClerkSplit(map);	
		  
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
		  
		  return "server/clerk_findAll";
	}
	
	//详情
	@RequestMapping(value="/clerkdetail")
	public String detallsclerk(Model model,HttpServletRequest request) {
		String pid = request.getParameter("pid");
		Integer magid = Integer.parseInt(pid);
		Clerk findaclerk = clerkservice.findaclerk(magid);
		model.addAttribute("findaclerk", findaclerk);
		return "server/clerk_Details";
	}
	
	//注册页面跳转
	@RequestMapping(value="/addclerk")
	public String addclerk(Model model) {
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("cityList", cityList);
			return "server/clerk_addClerk";
	}
	
	//注册
	@RequestMapping(value="/addclerkses")
	public String addclerkses(Model model,Clerk clerk ,HttpServletRequest request) {
		String rolei = request.getParameter("roleid");
		int roleid = Integer.parseInt(rolei);
		String job = rolessservice.findjob(roleid);
		clerk.setJob(job);
		String area = request.getParameter("area");
		City city = new City() ;
		city.setCode(area);
		clerk.setCity(city);
		boolean docreate = clerkservice.docreate(clerk);
		if(docreate==true) {
			return "forward:/findClerkSplits";
		}else {
			return "server/clerk_addClerk";
		}
	}
	
	
}