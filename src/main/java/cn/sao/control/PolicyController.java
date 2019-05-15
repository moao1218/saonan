package cn.sao.control;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import cn.sao.mapper.PolicyMapper;
import cn.sao.service.PolicyService;

@Controller
public class PolicyController {
	@Autowired
	PolicyService PolicyServiceImpl;
	@GetMapping("/shouyemes")
	public String shouye(HttpServletRequest request) {
		List<PolicyMapper> findPolicy = PolicyServiceImpl.findPolicy();
		request.setAttribute("findlist", findPolicy);
		return "client/shouye";
	}
}
