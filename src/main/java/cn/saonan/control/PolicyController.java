package cn.saonan.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Coverage;
import cn.saonan.pojo.Policy;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.PolicyService;
import cn.saonan.service.UsersService;

@Controller
public class PolicyController {
	@Autowired
	private PolicyService policyService;
	@Autowired
	private UsersService usersService ;
	@Autowired
	private InsuranceSlipService insuranceSlipService ;

	@RequestMapping(value="/goPolicyList")
	public String goPolicyList(Model model,HttpServletRequest request) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		int cp = 1;
		int ps = 4;
		
		String ccp = request.getParameter("cp");
		if(ccp != null && !"".equals(ccp)) {
			cp = Integer.parseInt(ccp);
		}
		
		String v_id = request.getParameter("v_id");
		String v_name = request.getParameter("v_name");
		String v_lopremium = request.getParameter("v_lopremium");
		String v_hipremium = request.getParameter("v_hipremium");
		String v_area = request.getParameter("v_area");
		String v_lojoindate = request.getParameter("v_lojoindate");
		String v_hijoindate = request.getParameter("v_hijoindate");
		String v_coverageid = request.getParameter("v_coverageid");
		String v_date = request.getParameter("v_date");
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
		map.put("v_date", v_date);
		map.put("v_property", v_property);
		map.put("v_property", v_property);
		map.put("v_order", v_order);
		
		map.put("cp", cp);
		map.put("ps", ps);
		
		policyService.findPolicyByMoreCondition(map);
		
		//获得所有城市
		List<City> cityList = usersService.findAllCity();
		//获得所有险种
		List<Coverage> coverageList = insuranceSlipService.findAllCoverage();
		
		
		Integer count = (Integer) map.get("v_count");
		Integer totalPage = (Integer) map.get("totalPage");
		List<Policy> policyList = (List<Policy>) map.get("resource_list");
		
		model.addAttribute("count", count);
		model.addAttribute("totalPage", totalPage);
		model.addAttribute("policyList", policyList);
		model.addAttribute("cityList", cityList);
		model.addAttribute("coverageList", coverageList);
		model.addAttribute("cp", cp);
		
		model.addAttribute("v_id", v_id);
		model.addAttribute("v_name", v_name);
		model.addAttribute("v_lopremium", v_lopremium);
 		model.addAttribute("v_hipremium", v_hipremium);
		model.addAttribute("v_area", v_area);
		model.addAttribute("v_lojoindate", v_lojoindate);
		model.addAttribute("v_hijoindate", v_hijoindate);
		model.addAttribute("v_coverageid", v_coverageid);
		model.addAttribute("v_date", v_date);
		model.addAttribute("v_property", v_property);
		model.addAttribute("v_property", v_property);
		model.addAttribute("v_order", v_order);
		
		return "server/policy_list";
	}
	
	@RequestMapping(value="/goPolicyDetails")
	public String goPolicyDetails(String policyId, Model model) {
		
		Policy policy = policyService.findPolicyById(policyId);
		model.addAttribute("policy", policy);
		
		return "server/policy_Detail";
	}
	
}
