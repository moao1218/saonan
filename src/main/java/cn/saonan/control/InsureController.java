package cn.saonan.control;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.service.InsuranceSlipService;

@Controller
public class InsureController {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;

	@ResponseBody
	@GetMapping(value="/jumpInsuranceList")
	public String goList(Model model) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
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
		Integer count = (Integer) map.get("v_count");
		model.addAttribute("insureList", insureList);
		return "server/insurance_slip_list";
	}
	
}
