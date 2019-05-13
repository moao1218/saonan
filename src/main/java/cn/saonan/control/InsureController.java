package cn.saonan.control;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.UsersService;

@Controller
public class InsureController {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;
	
	@Autowired
	private UsersService usersService;

	@RequestMapping(value="/jumpInsuranceList")
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
		return "server/insurance_slip_list";
	}
	
	
	@RequestMapping(value="/jumpPending")
	public String pending(Model model,HttpServletRequest request) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		String v_city = clerk.getCity().getCode();
		Integer roleid = clerk.getRoleid();
		String v_role = "";
		String rList = "";
		if(roleid==1) {
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
	
	@RequestMapping(value="/jumpDetails")
	public String details(String pid,Model model) {
		
		InsuranceSlip insurance = insuranceSlipService.findOneInsurance(pid);
		model.addAttribute("insurance", insurance);
		return "server/insurance_Details";
	}
	
	@RequestMapping(value="/acceptPro")
	public String acceptPro(String pid,Model model,HttpServletRequest request) {
		
		InsuranceSlip insurance = insuranceSlipService.findOneInsurance(pid);
		model.addAttribute("insurance", insurance);
		return "server/insurance_Details";
	}
}