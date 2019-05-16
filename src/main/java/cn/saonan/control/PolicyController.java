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
		
		return "server/policy_list";
	}
	
	@RequestMapping(value="/goPolicyDetails")
	public String goPolicyDetails(String policyId, Model model) {
		
		Policy policy = policyService.findPolicyById(policyId);
		model.addAttribute("policy", policy);
		
		return "server/policy_Detail";
	}
	
}
