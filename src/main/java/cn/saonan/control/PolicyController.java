package cn.saonan.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import cn.saonan.pojo.Policy;
import cn.saonan.service.PolicyService;

@Controller
public class PolicyController {
	@Autowired
	private PolicyService policyService;

	@GetMapping("/goPolicyList")
	public String goPolicyList(Model model) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		int cp = 1;
		int ps = 5;
		map.put("cp", cp);
		map.put("ps", ps);
		
		policyService.findPolicyByMoreCondition(map);
		
		Integer count = (Integer) map.get("v_count");
		Integer totalPage = (Integer) map.get("totalPage");
		List<Policy> policyList = (List<Policy>) map.get("resource_list");
		
		model.addAttribute("count", count);
		model.addAttribute("totalPgage", totalPage);
		model.addAttribute("policyList", policyList);
		
		System.out.println("====================================================================");
		System.out.println(policyList.get(0).getCity());
		
		
		return "server/policy_list";
	}
	
}
