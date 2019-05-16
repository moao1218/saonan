package cn.sao.control;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import cn.sao.pojo.InsuranceSlip;
import cn.sao.service.impl.InsuranceSlipServiceImpl;

@Controller
public class InsuranceSlipController {

	@Autowired
	private InsuranceSlipServiceImpl InsuranceSlipServiceImpl;
	
	@GetMapping("/InsueanceSlip")
	public String findAllInsuranceSlip(InsuranceSlip insuranceSlip,Model model) {
		List<InsuranceSlip> insurancelist = InsuranceSlipServiceImpl.findAllInsuranceSlip();
		model.addAttribute("insuranceList", insurancelist);
		System.out.println("ssssss"+insurancelist.toString());
		return "client/myorder";
	}
}
