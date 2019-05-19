package cn.saonan.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Coverage;
import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.service.ClerkService;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.PolicyVerifyService;
import cn.saonan.service.RolessService;
import cn.saonan.service.UsersService;
import cn.saonan.utils.impl.BCryptImpl;
import cn.saonan.utils.impl.RSAImpl;



@Controller
public class ClerkController {
	@Autowired
	private InsuranceSlipService insuranceSlipService ;

	@Autowired
	private ClerkService clerkservice;
	
	@Autowired
	private PolicyVerifyService pvs;
	
	@Autowired
	private UsersService usersService ;
	
	@Autowired
	private RolessService rolessservice;

	//分页展示
	@RequestMapping(value="/findClerkSplits")
	public String findClerkSplits(Model model,HttpServletRequest request,HttpServletResponse response) {
		  Map<String,Object> map = new HashMap<String,Object>(); 
		  
		  Clerk clerk = (Clerk) request.getSession().getAttribute("user");
			//获取城市信息
			String v_city = clerk.getCity().getCode();
			
			//我是从登陆信息从拿到的角色ID
			Integer roleid = clerk.getRoleid();
			//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
			if(roleid==12) {
				//v_role => 只能看1状态的
				map.put("v_city", v_city);
			}else {
				try {
					
					response.setContentType("text/html;charset=utf-8");
					response.getWriter().write( "<script>alert('您没有访问的权限！');"
							+ "window.location='/jumpInsuranceList';window.close();</script>"); 
					response.getWriter().flush();
					
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		  
		  
		  
		  
		  
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
	//分页调用
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
	public String detallsclerk(Model model,HttpServletRequest request,HttpServletResponse response) {
		 
		
		
		String pid = request.getParameter("pid");
		Integer magid = Integer.parseInt(pid);
		Clerk findaclerk = clerkservice.findaclerk(magid);
		model.addAttribute("findaclerk", findaclerk);
		return "server/clerk_Details";
	}
	
	//注册页面跳转
	@RequestMapping(value="/addclerk")
	public String addclerk(Model model,HttpServletRequest request,HttpServletResponse response) {
		 Map<String,Object> map = new HashMap<String,Object>(); 

		 Clerk clerk = (Clerk) request.getSession().getAttribute("user");
			//获取城市信息
			String v_city = clerk.getCity().getCode();
			
			//我是从登陆信息从拿到的角色ID
			Integer roleid = clerk.getRoleid();
			//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
			if(roleid==11) {
				//v_role => 只能看1状态的
				map.put("v_city", v_city);
			}else {
				try {
					
					response.setContentType("text/html;charset=utf-8");
					response.getWriter().write( "<script>alert('您没有访问的权限！');"
							+ "window.location='/jumpInsuranceList';window.close();</script>"); 
					response.getWriter().flush();
					
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("cityList", cityList);
			return "server/clerk_addClerk";
	}
	
	//注册
	@RequestMapping(value="/addclerkses")
	public void addclerkses(Model model,Clerk clerk ,HttpServletRequest request,HttpServletResponse response) throws Exception {
		String pwd = request.getParameter("userpwd");
//		System.out.println("注册获取密码："+pwd);
		RSAImpl rsa=new RSAImpl();
		BCryptImpl bc=new BCryptImpl();
		String userpwd=bc.getCode(pwd, 12);
		clerk.setUserpwd(userpwd);
//		System.out.println("密文："+userpwd);
		
		String rolei = request.getParameter("roleid");
		int roleid = Integer.parseInt(rolei);
		String job = rolessservice.findjob(roleid);
		clerk.setJob(job);
		String area = request.getParameter("area");
		City city = new City() ;
		city.setCode(area);
		clerk.setCity(city);
		boolean docreate = clerkservice.docreate(clerk);
//		System.out.println("注册："+docreate);
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		if(docreate==true) {
			out.write("<script>alert('注册成功');location='/findClerkSplits';</script>");
		}else {
			out.write("<script>alert('注册失败');location='server/clerk_addClerk';</script>");
		}
		out.flush();
		out.close();
	}
	
	
	
	//删除
	@RequestMapping(value="/deleteClerk")
	public void deleteClerk(HttpServletRequest request,HttpServletResponse response) throws IOException {
		String magidd = request.getParameter("magid");
		String [] split = magidd.split(",");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		for (int i = 0; i < split.length; i++) {
			boolean dd = clerkservice.clerkupddele(Integer.parseInt(split[i]));
			
			if(dd==true) {
				out.write("<script>alert('删除成功');location='/findClerkSplits';</script>");
			}else {
				out.write("<script>alert('删除失败');location='/findClerkSplits';</script>");
			}
		}
		out.flush();
		out.close();
	}
	
	
	//用户名是否重复
	@RequestMapping(value="/checkname")
	@ResponseBody
	public Integer checkname(Model model,HttpServletRequest request,HttpServletResponse response) throws IOException {
		String username = request.getParameter("username");
		Integer flag = clerkservice.checkname(username);
		return flag;
	}
	
	
	//注销
	@RequestMapping(value="/fulldeleteclerk")
	public void deleteClek(HttpServletRequest request,HttpServletResponse response) throws IOException {
		
		String magidd = request.getParameter("magid");
		String [] split = magidd.split(",");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		for (int i = 0; i < split.length; i++) {
			boolean dd = clerkservice.clerkdelete(Integer.parseInt(split[i]));
			
			if(dd==true) {
				out.write("<script>alert('删除成功');location='/findClerkSplits';</script>");
			}else {
				out.write("<script>alert('删除失败');location='/findClerkSplits';</script>");
			}
		}
		out.flush();
		out.close();
		/*
		 * String magidd = request.getParameter("magid"); Integer magid =
		 * Integer.parseInt(magidd); System.out.println("注销得到"+magid); boolean dd =
		 * clerkservice.clerkdelete(magid);
		 * 
		 * PrintWriter out = response.getWriter(); System.out.println("注销"+dd);
		 * out.write(dd+""); out.flush(); out.close();
		 */
	}
	
	//修改页面
	
	@RequestMapping(value="/update")
	public String update(Model model,HttpServletRequest request) {
		String pid = request.getParameter("pid");
		Integer magid = Integer.parseInt(pid);
		Clerk findaclerk = clerkservice.findaclerk(magid);
		String code = findaclerk.getCity().getCode();
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("cityList", cityList);
		model.addAttribute("findaclerk", findaclerk);
		return "server/clerk_update.html";
	}
	
	//新旧密码验证
	@ResponseBody
	@RequestMapping(value="/checkoldpwd")
	public boolean checkoldpwd(HttpServletRequest request) {
		String magidd = request.getParameter("magid");
		
		Integer magid = Integer.parseInt(magidd);
		Clerk clerk = clerkservice.findaclerk(magid);
		
		
		String userpwd = clerk.getUserpwd();
//		System.out.println("得到旧密码："+userpwd);
		
		
		String oldpwd = request.getParameter("oldpwd");
//		System.out.println("拿到页面的pwd："+oldpwd);
		RSAImpl rsa=new RSAImpl();
		BCryptImpl bc=new BCryptImpl();
		boolean checkMatch = bc.checkMatch(oldpwd, userpwd);
		return checkMatch;
	}
	
	//修改
	@RequestMapping(value="/xiugai")
	public void xiugai( Clerk clerk,Model model,HttpServletRequest request,HttpServletResponse response) throws IOException {
		
		
		String magidd = request.getParameter("magid");
		Integer magid = Integer.parseInt(magidd);
		clerk.setMagid(magid);
		String rolei = request.getParameter("roleid");
		int roleid = Integer.parseInt(rolei);
		String job = rolessservice.findjob(roleid);
		clerk.setJob(job);
		String area = request.getParameter("area");
		City city = new City() ;
		city.setCode(area);
		clerk.setCity(city);
		
		String pwd = request.getParameter("userpwd");
		RSAImpl rsa=new RSAImpl();
		BCryptImpl bc=new BCryptImpl();
		String userpwd=bc.getCode(pwd, 12);
		clerk.setUserpwd(userpwd);
		
		
		boolean clerkupdate = clerkservice.clerkupdate(clerk);
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		if(clerkupdate==true) {
			out.write("<script>alert('修改成功'); location.href ='/findClerkSplits';</script>");
		}else {
			out.write("<script>alert('修改失败');location='/xiugai';</script>");
		}
		out.flush();
		out.close();
	}
	
	//投保单查询
	@RequestMapping(value="/jumpIscList")
	public String goList(Model model,HttpServletRequest request) throws ParseException {
		
		
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		String cpp = request.getParameter("cp");
		
		if(cpp!=null&&!"".equals(cpp)){
			cp = Integer.parseInt(cpp);
		}
		
		String pss = request.getParameter("ps");
		if(pss!=null&&!"".equals(pss)){
			ps = Integer.parseInt(pss);
		}
		
		String v_id = request.getParameter("v_id");
		String v_name = request.getParameter("v_name");
		String v_lopremium = request.getParameter("v_lopremium");
		String v_hipremium = request.getParameter("v_hipremium");
		String v_area = request.getParameter("v_area");
		String v_lojoindate = request.getParameter("v_lojoindate");
		String v_hijoindate = request.getParameter("v_hijoindate");
		String v_coverageid = request.getParameter("v_coverageid");
		String v_status = request.getParameter("v_status");
		String v_property = request.getParameter("v_property");
		String v_order = request.getParameter("v_order");
		
//		System.out.println(v_area);
		
		map.put("cp", cp);
		map.put("ps", ps);
		map.put("v_id", v_id);
		map.put("v_name", v_name);
		map.put("v_lopremium", v_lopremium);
 		map.put("v_hipremium", v_hipremium);
		map.put("v_area", v_area);
		map.put("v_lojoindate", v_lojoindate);
		map.put("v_hijoindate", v_hijoindate);
		map.put("v_coverageid", v_coverageid);
		
//		System.out.println(v_status);
		if(v_status != null && !"".equals(v_status)) {
			map.put("v_status", Integer.parseInt(v_status));
		}
		
		map.put("v_property", v_property);
		map.put("v_property", v_property);
		map.put("v_order", v_order);
		insuranceSlipService.findInsuranceSlipList(map);
		List<InsuranceSlip> insureList = (List<InsuranceSlip>) map.get("insureList");
		
		Date d = new Date();
		SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");
		for (InsuranceSlip insuranceSlip : insureList) {
			Date parse = date.parse(insuranceSlip.getInsure_date());
			if(d.getTime()<parse.getTime()+12*60*60*1000) {
				insuranceSlip.setUrg("正常");
			}else if(d.getTime()<parse.getTime()+24*60*60*1000) {
				insuranceSlip.setUrg("预警");
			}else {
				insuranceSlip.setUrg("报警");
			}
//			System.out.println(date.format(new Date(parse.getTime()+12*60*60*1000)));
		}
		Integer v_count = (Integer) map.get("v_count");
		int totalpage = (v_count-1)/ps + 1;
		
		List<Coverage> coverageList = insuranceSlipService.findAllCoverage();
		model.addAttribute("cp", cp);
		model.addAttribute("ps", ps);
		
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("insureList", insureList);
		model.addAttribute("totalpage", totalpage);
		model.addAttribute("cityList", cityList);
		model.addAttribute("coverageList", coverageList);
		
		model.addAttribute("v_id", v_id);
		model.addAttribute("v_name", v_name);
		model.addAttribute("v_lopremium", v_lopremium);
 		model.addAttribute("v_hipremium", v_hipremium);
		model.addAttribute("v_area", v_area);
		model.addAttribute("v_lojoindate", v_lojoindate);
		model.addAttribute("v_hijoindate", v_hijoindate);
		model.addAttribute("v_coverageid", v_coverageid);
		model.addAttribute("v_status", v_status);
		model.addAttribute("v_property", v_property);
		model.addAttribute("v_property", v_property);
		model.addAttribute("v_order", v_order);
		return "server/clerk_insurance_slip_list";
	}
	
	
		
	
	//身份验证
	/*
	 * @ResponseBody
	 * 
	 * @RequestMapping(value="/checkinIdCard") public String
	 * checkIdCard(HttpServletRequest request) {
	 * 
	 * String idCrad = request.getParameter("idCard"); String resource =
	 * IdCard.checkIdCard(idCrad);
	 * 
	 * return resource; }
	 */
	

	
	
	
}