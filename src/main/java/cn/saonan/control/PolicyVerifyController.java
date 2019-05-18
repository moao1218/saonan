package cn.saonan.control;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Coverage;
import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.pojo.Items;
import cn.saonan.pojo.Pv;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.PolicyVerifyService;
import cn.saonan.service.PvService;
import cn.saonan.service.UsersService;
import cn.saonan.utils.RedisUtil;
import cn.saonan.utils.Upload;

@Controller
public class PolicyVerifyController {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;

	@Autowired
	private PolicyVerifyService policyVerifyService;
	
	@Autowired
	private UsersService usersService ;
	
	@Autowired
	private PvService pvService;
	
	//跳转待处理勘察页面
	@GetMapping(value="/jumpScout")
	public String scoutSplit(HttpServletRequest request,Model model, HttpServletResponse response) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		//获取城市信息
		String v_city = clerk.getCity().getCode();
		
		//我是从登陆信息从拿到的角色ID
		Integer roleid = clerk.getRoleid();
		String v_role = "";
		//roleid 角色  比如:一审人员=>1  二审=>7 三审=>11
		if(roleid==9) {
			//v_role => 只能看1状态的
			v_role = "2,3";
			map.put("v_city", v_city);
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
		
		return "server/policy_verify_list";
	}
	
	@ResponseBody
	@PostMapping(value="/findAllItems")
	public List<Items> findAllItems(){
		List<Items> items = pvService.findAllItems();
		return items;
	}
	
	@PostMapping(value="/insertPv")
	public String insertPv(Pv pv,HttpServletRequest request) {
		Map<String,Object> map = new HashMap<String,Object>();
		
		Items items = new Items();
		Coverage coverage = new Coverage();
		
		String cid = request.getParameter("coverageid");
		System.out.println(cid);
		if(cid!=null&&!"".equals(cid)) {
			coverage.setCoverageid(Integer.parseInt(cid));
			pv.setCoverage(coverage);
		}else {
			coverage.setCoverageid(null);
			pv.setCoverage(coverage);
		}
		
		pv.setDel_status("0");
		
		MultipartRequest req = (MultipartRequest) request;	
		MultipartFile h_pic = req.getFile("h_pic");
		MultipartFile bu_pic = req.getFile("bud_pic");
		if(h_pic!=null&&!"".equals(h_pic)) {
			String house_pic = Upload.upload(request, h_pic);
			pv.setHouse_pic(house_pic);
		}
		if(bu_pic!=null&&!"".equals(bu_pic)) {
			String building_pic = Upload.upload(request, bu_pic);
			pv.setBuilding_pic(building_pic);
		}
		
		
		String num = request.getParameter("num");
		for (int i = 1; i < Integer.parseInt(num); i++) {
			long currentTimeMillis = System.currentTimeMillis();
			int r = new Random().nextInt(3999)+1000;
			pv.setPol_ver_id(""+currentTimeMillis+r);
			
			if(req.getFile("a_pic"+i)!=null&&!"".equals(req.getFile("a_pic"+i))) {
				String site_photo = Upload.upload(request, req.getFile("a_pic"+i));
				items.setSite_photo(site_photo);
			}
			
			if(req.getFile("b_pic"+i)!=null&&!"".equals(req.getFile("b_pic"+i))) {
				String third_pic = Upload.upload(request, req.getFile("b_pic"+i));
				items.setThird_pic(third_pic);
			}
			if(req.getFile("c_pic"+i)!=null&&!"".equals(req.getFile("c_pic"+i))) {
				String invoice_pic = Upload.upload(request, req.getFile("c_pic"+i));
				items.setInvoice_pic(invoice_pic);
			}
			String itemid = request.getParameter("a"+i);
			String item_age = request.getParameter("b"+i);
			String invoice = request.getParameter("c"+i);
			String mark = request.getParameter("d"+i);
			String pmodel = request.getParameter("e"+i);
			
			items.setItemid(Integer.parseInt(itemid));
			items.setItem_age(item_age);
			items.setInvoice(invoice);
			items.setMark(mark);
			items.setPmodel(pmodel);
			
			map.put("pv", pv);
			map.put("items", items);
			
			pvService.insertPv(map);
		}
//		List<Items> items = pvService.findAllItems();
//		model.addAttribute("items", items);
		return "redirect:/jumpScout";
	}
	
	//跳转正在处理页面
	@GetMapping(value="/jumpDoing")
	public String jumpDoing(HttpServletRequest request,Model model) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		
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
		map.put("v_scout", clerk.getMagid()+"");
		map.put("v_status",3);
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
		return "server/doing_verify_list";
	}
	
	@RequestMapping(value="/goAdd_verify")
	public String goAdd(String pid,String cid,Model model) {
		Coverage vo = insuranceSlipService.findCoverageid(cid);
		Integer coverageid = vo.getCoverageid();
		model.addAttribute("pid", pid);
		model.addAttribute("cid", coverageid);
		return "server/add_verify";
	}
	
	//正在进行中的投保单,在投保单所有险种都勘察完的情况下,可以点击勘察完毕
	@RequestMapping(value="/doingAdd")
	public String doingAdd(String pid,String cid,Model model) {
		Coverage vo = insuranceSlipService.findCoverageid(cid);
		Integer coverageid = vo.getCoverageid();
		model.addAttribute("pid", pid);
		model.addAttribute("cid", coverageid);
		model.addAttribute("abc", 1);
		return "server/add_verify";
	}
	
	@GetMapping(value="/succ")
	public String succ(String pid) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("newstatus", 4);
		map.put("policyid", pid);
		insuranceSlipService.updateInsuranceStatus(map);
		return "forward:/jumpDoing";
	}
	
	@GetMapping(value="/done")
	public String done(HttpServletRequest request,Model model) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		
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
		map.put("v_scout", clerk.getMagid()+"");
		map.put("v_status",4);
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
		return "server/succ_verify_list";
	}
}
