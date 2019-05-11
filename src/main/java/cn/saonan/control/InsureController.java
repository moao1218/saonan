package cn.saonan.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.service.InsuranceSlipService;

@Controller
public class InsureController {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;

	@GetMapping(value="/jumpInsuranceList")
	public String goList(Model model) {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		map.put("cp", cp);
		map.put("ps", ps);
		insuranceSlipService.findInsuranceSlipList(map);
		List<InsuranceSlip> insureList = (List<InsuranceSlip>) map.get("insureList");
		Integer count = (Integer) map.get("v_count");
		System.out.println(count);
		model.addAttribute("insureList", insureList);
		return "server/insurance_slip_list";
	}
	
}
