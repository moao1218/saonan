package cn.saonan.control;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.saonan.pojo.BlackList;
import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Coverage;
import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.pojo.PolicyVerify;
import cn.saonan.service.BlackListService;
import cn.saonan.service.ClerkService;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.PolicyVerifyService;
import cn.saonan.service.PvService;
import cn.saonan.service.UsersService;
import cn.saonan.utils.IdCard;
import cn.saonan.utils.JsonUtil;
import cn.saonan.utils.RedisUtil;

@Controller
public class InsureController {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;
	@Autowired
	private UsersService usersService ;
	@Autowired
	private ClerkService clerkService;
	
	@Autowired
	private PolicyVerifyService pvs;
	@Autowired
	private BlackListService bls;
	
	@Autowired
	private PvService pvService;
	
	@Autowired
	private RedisUtil redisUtil;
	
	private String change = "";

	//所有保单列表
	@RequestMapping(value="/jumpInsuranceList")
	public String goList(Model model,HttpServletRequest request) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		List<InsuranceSlip> insureList = new ArrayList<>();
		Integer v_count = null;
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
		
		if(v_status != null && !"".equals(v_status)) {
			map.put("v_status", Integer.parseInt(v_status));
		}
		
		map.put("v_property", v_property);
		map.put("v_property", v_property);
		map.put("v_order", v_order);
		
		//redis
		
//		Map<Object, Object> hmget = redisUtil.hmget("all");
//		Set<Entry<Object, Object>> entrySet = hmget.entrySet();
//		Iterator<Entry<Object, Object>> iterator = entrySet.iterator();
//		while(iterator.hasNext()) {
//			Entry<Object, Object> next = iterator.next();
//			InsuranceSlip value = (InsuranceSlip) next.getValue();
//			insureList.add(value);lGetListSize
//		}
		
		if(redisUtil.lGetListSize("plist")!=0) {
			List<Object> lGet = redisUtil.lGet("1",0,-1);
			for (Object object : lGet) {
				insureList.add(JsonUtil.jsonToPoJo(object.toString(), InsuranceSlip.class));
				v_count=(int)redisUtil.lGetListSize("plist");
				System.out.println("redis:"+insureList.get(0).getPolicyid());
			}
		}
		System.out.println(insureList.size());
		if(insureList.size()<1) {
			insuranceSlipService.findInsuranceSlipList(map);
			insureList = (List<InsuranceSlip>) map.get("insureList");
			
			for (int i = 0; i < insureList.size(); i++) {
				InsuranceSlip insuranceSlip = insureList.get(i);
				String policyid = insuranceSlip.getPolicyid();
				redisUtil.lSet("plist",JsonUtil.objectToJson(insuranceSlip));
			}
			
			v_count = (Integer) map.get("v_count");
//			for (InsuranceSlip insuranceSlip : insureList) {
//				String policyid = insuranceSlip.getPolicyid();
//				Map<String,Object> polmap = new HashMap<String,Object>();
//				
//				polmap.put(policyid, JsonUtil.objectToJson(insuranceSlip));
//				redisUtil.hmset("all", polmap);
//			}
		}else if(!"".equals(change)) {
			InsuranceSlip findOneInsurance = insuranceSlipService.findOneInsurance(change);
			redisUtil.lSet("plist", JsonUtil.objectToJson(findOneInsurance));
//			hmget.put(change, findOneInsurance);
//			redisUtil.hmset("all", hmget);
//			insureList.add(findOneInsurance);
		}
		
		
		
//		redisUtil.set("insure", JsonUtil.objectToJson(insureList));
//		List<InsuranceSlip> jsonToList = JsonUtil.jsonToList((String)redisUtil.get("insure"), new TypeReference<List<InsuranceSlip>>() {});
//		for (InsuranceSlip insuranceSlip : jsonToList) {
//			System.out.println(insuranceSlip.getInsure_name());
//		}
		
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
		
		System.out.println("v_count:"+v_count);
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
		return "server/insurance_slip_list";
	}
	
	//待处理投保单列表
	@RequestMapping(value="/jumpPending")
	public String pending(Model model,HttpServletRequest request,HttpServletResponse response) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		String v_city = clerk.getCity().getCode();
		//我是从登陆信息从拿到的角色ID
		Integer roleid = clerk.getRoleid();
		String v_role = "";
		String rList = "";
		//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
		if(roleid==1) {
			//v_role => 只能看1状态的
			v_role = "1";
			map.put("v_city", v_city);
			map.put("v_role", v_role);
		}else if(roleid==2) {
			v_role = "7";
			List<City> cityRegion = insuranceSlipService.findCityRegion(v_city);
			for (City city : cityRegion) {
				rList = rList  + city.getCode()  + ",";
			}
			String substring = rList.substring(0,rList.length()-1);
			map.put("v_city", substring);
			map.put("v_role", v_role);
		}else if(roleid==3) {
			v_role = "11";
			List<City> cityRegion = insuranceSlipService.findCityRegion(v_city);
			for (City city : cityRegion) {
				rList = rList + city.getCode() + ",";
			}
			String substring = rList.substring(0,rList.length()-1);
			map.put("v_city", substring);
			map.put("v_role", v_role);
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
		
		System.out.println(v_status);
		if(v_status != null && !"".equals(v_status)) {
			map.put("v_status", Integer.parseInt(v_status));
		}
		
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
		model.addAttribute("cp", cp);
		model.addAttribute("ps", ps);
		
		List<City> cityList = usersService.findAllCity();
		List<Coverage> coverageList = insuranceSlipService.findAllCoverage();
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
		model.addAttribute("v_order", v_order);
		return "server/pending_insurance";
	}
	
	//投保单详情页面
	@RequestMapping(value="/jumpDetails")
	public String details(String pid,Model model) {
		
		InsuranceSlip insurance = insuranceSlipService.findOneInsurance(pid);
		List<PolicyVerify> pvList = pvs.findPolicyVerifyByPolicyId(pid);
		model.addAttribute("insurance", insurance);
		model.addAttribute("pvList", pvList);
		return "server/insurance_Details";
	}
	
	
	/*
	 * @RequestMapping(value="/acceptPro") public String acceptPro(String pid,Model
	 * model,HttpServletRequest request) {
	 * 
	 * InsuranceSlip insurance = insuranceSlipService.findOneInsurance(pid);
	 * model.addAttribute("insurance", insurance); return
	 * "server/insurance_Details"; }
	 */
	
	//详情页面中受理后跳转投保单受理页面
	@PostMapping(value="/firstHandle")
	public String firstHandle(String pid,Model model,HttpServletRequest request) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("newstatus", 2);
		map.put("policyid", pid);
		
		boolean flag = insuranceSlipService.updateInsuranceStatus(map);
		InsuranceSlip insurance = insuranceSlipService.findOneInsurance(pid);
		//redis
		if(flag) {
//			redisUtil.del(pid);
//			redisUtil.set(pid,null);lRemove
			redisUtil.lRemove("plist", 1, JsonUtil.objectToJson(insurance));
			change = pid;
		}
		model.addAttribute("insurance", insurance);
		return "server/insurance_Accept";
	}
	
	//分派专业指导员
	@ResponseBody
	@PostMapping(value="/assignGuide")
	public List<Clerk> assignGuide(String pid,Model model) {
		Map<String,Object> insuranceMap = new HashMap<String,Object>();
		insuranceMap.put("newstatus", 0);
		insuranceMap.put("policyid", pid);
		insuranceSlipService.updateInsuranceStatus(insuranceMap);
		
		int roleid = 8;
		List<Clerk> clerks = clerkService.findClerkByRole(roleid);
		model.addAttribute("clerks", clerks);
		return clerks;
	}
	
	//分派现场勘察员
	@ResponseBody
	@PostMapping(value="/assignScout")
	public List<Clerk> assignScout(String pid,Model model) {
		
		
		int roleid = 9;
		List<Clerk> clerks = clerkService.findClerkByRole(roleid);
		model.addAttribute("clerks", clerks);
		return clerks;
	}
	
	//分派给勘察员
	@GetMapping(value="/toScout")
	public String toScout(String scout,String pid) {
		Map<String,Object> insuranceMap = new HashMap<String,Object>();
		insuranceMap.put("newstatus", 3);
		insuranceMap.put("policyid", pid);
		insuranceMap.put("scout", scout);
		boolean updateInsuranceStatus = insuranceSlipService.updateInsuranceStatus(insuranceMap);
		System.out.println(pid);
		System.out.println(updateInsuranceStatus);
		return "forward:/jumpPending";
	}
	
	//正在处理的保单
	@RequestMapping(value="/underway")
	public String underway(Model model,HttpServletRequest request,HttpServletResponse response) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		String v_city = clerk.getCity().getCode();
		//我是从登陆信息从拿到的角色ID
		Integer roleid = clerk.getRoleid();
		String v_role = "";
		String rList = "";
		//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
		if(roleid==1) {
			//v_role => 只能看1状态的
			v_role = "2,3,4";
			map.put("v_city", v_city);
			map.put("v_role", v_role);
		}else if(roleid==2) {
			v_role = "8";
			List<City> cityRegion = insuranceSlipService.findCityRegion(v_city);
			for (City city : cityRegion) {
				rList = rList  + city.getCode()  + ",";
			}
			String substring = rList.substring(0,rList.length()-1);
			map.put("v_city", substring);
			map.put("v_role", v_role);
		}else if(roleid==3) {
			v_role = "12";
			List<City> cityRegion = insuranceSlipService.findCityRegion(v_city);
			for (City city : cityRegion) {
				rList = rList + city.getCode() + ",";
			}
			String substring = rList.substring(0,rList.length()-1);
			map.put("v_city", substring);
			map.put("v_role", v_role);
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
		
		String cpp = request.getParameter("cp");
		
		if(cpp!=null&&!"".equals(cpp)){
			cp = Integer.parseInt(cpp);
		}
		
		String pss = request.getParameter("ps");
		if(pss!=null&&!"".equals(pss)){
			ps = Integer.parseInt(pss);
		}
		
		map.put("cp", cp);
		map.put("ps", ps);
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
		model.addAttribute("cp", cp);
		model.addAttribute("ps", ps);
		
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("insureList", insureList);
		model.addAttribute("totalpage", totalpage);
		model.addAttribute("cityList", cityList);
		return "server/pending_insurance";
	}
	
	//已完成的投保单
	public String hadDone(Model model,HttpServletRequest request,HttpServletResponse response) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		String v_city = clerk.getCity().getCode();
		//我是从登陆信息从拿到的角色ID
		Integer roleid = clerk.getRoleid();
		String v_role = "";
		String rList = "";
		//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
		if(roleid==1) {
			//v_role => 只能看1状态的
			v_role = "5,6,7,8,9,10,11,12,13,14";
			map.put("v_city", v_city);
			map.put("v_role", v_role);
		}else if(roleid==2) {
			v_role = "9,10,11,12,13,14";
			List<City> cityRegion = insuranceSlipService.findCityRegion(v_city);
			for (City city : cityRegion) {
				rList = rList  + city.getCode()  + ",";
			}
			String substring = rList.substring(0,rList.length()-1);
			map.put("v_city", substring);
			map.put("v_role", v_role);
		}else if(roleid==3) {
			v_role = "13,14";
			List<City> cityRegion = insuranceSlipService.findCityRegion(v_city);
			for (City city : cityRegion) {
				rList = rList + city.getCode() + ",";
			}
			String substring = rList.substring(0,rList.length()-1);
			map.put("v_city", substring);
			map.put("v_role", v_role);
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
		
		String cpp = request.getParameter("cp");
		
		if(cpp!=null&&!"".equals(cpp)){
			cp = Integer.parseInt(cpp);
		}
		
		String pss = request.getParameter("ps");
		if(pss!=null&&!"".equals(pss)){
			ps = Integer.parseInt(pss);
		}
		
		map.put("cp", cp);
		map.put("ps", ps);
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
		model.addAttribute("cp", cp);
		model.addAttribute("ps", ps);
		
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("insureList", insureList);
		model.addAttribute("totalpage", totalpage);
		model.addAttribute("cityList", cityList);
		return "server/pending_insurance";
	}
	
	@ResponseBody
	@RequestMapping(value="/checkIdCard")
	public String checkIdCard(HttpServletRequest request) {
		
		String idCrad = request.getParameter("idCard");
		String resource = IdCard.checkIdCard(idCrad);
		
		return resource;
	}
	
	@RequestMapping(value="/CheckBlack")
	@ResponseBody
	public String CheckBlack(HttpServletRequest request) {
		
		String userId = request.getParameter("userId");
		BlackList blackList = bls.findBlackListById(userId);
		
		if(blackList==null) {
			return "\""+"ture"+"\"";
		}else {
			return "\""+"false"+"\"";
		}

	}
	
	@RequestMapping(value="/goAdd")
	public String goAdd(Model model) {
//		List<Items> items = pvService.findAllItems();
//		model.addAttribute("items", items);
		return "server/add_verify";
	}
	
	//对应审核员已完成投保单查询并列出
	@RequestMapping(value="/completed")
	public String completed(HttpServletResponse response, HttpServletRequest request, Model model) throws ParseException {
			Map<String,Object> map = new HashMap<String,Object>();
			int cp = 1;
			int ps = 5;
			
			Clerk clerk = (Clerk) request.getSession().getAttribute("user");
			System.out.println(clerk.getMagid());
			//我是从登陆信息从拿到的角色ID
			Integer roleid = clerk.getRoleid();
			String v_role = "";
			//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
			if(roleid==1) {
				//v_role => 只能看1状态的
				v_role = "5,6";
				map.put("v_first", clerk.getMagid()+"");
				map.put("v_role", v_role);
			}else if(roleid==2) {
				v_role = "9,10";
				map.put("v_second", clerk.getMagid()+"");
				map.put("v_role", v_role);
			}else if(roleid==3) {
				v_role = "13,14";
				map.put("v_third", clerk.getMagid()+"");
				map.put("v_role", v_role);
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
			
			System.out.println(v_role);
			
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
		  
		  System.out.println(v_status); if(v_status != null && !"".equals(v_status)) {
		  map.put("v_status", Integer.parseInt(v_status)); }
		  
		  map.put("v_property", v_property); map.put("v_property", v_property);
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
//				System.out.println(date.format(new Date(parse.getTime()+12*60*60*1000)));
			}
			Integer v_count = (Integer) map.get("v_count");
			int totalpage = (v_count-1)/ps + 1;
			model.addAttribute("cp", cp);
			model.addAttribute("ps", ps);
			
			List<City> cityList = usersService.findAllCity();
			List<Coverage> coverageList = insuranceSlipService.findAllCoverage();
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
			return "server/insurance_completed_list";
		}
	
	
}

