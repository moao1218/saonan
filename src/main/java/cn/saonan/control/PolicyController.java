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

import cn.saonan.pojo.Policy;
import cn.saonan.service.PolicyService;

@Controller
public class PolicyController {
	@Autowired
	private PolicyService policyService;

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
		
		Integer count = (Integer) map.get("v_count");
		Integer totalPage = (Integer) map.get("totalPage");
		List<Policy> policyList = (List<Policy>) map.get("resource_list");
		
		model.addAttribute("count", count);
		model.addAttribute("totalPage", totalPage);
		model.addAttribute("policyList", policyList);
		model.addAttribute("cp", cp);
		
		System.out.println("====================================================================");
		//System.out.println(policyList.get(0).getCity());
		System.out.println(policyList.size());
		System.out.println(count);
		System.out.println(totalPage);
		
		
		
		return "server/policy_list";
	}
	
}
