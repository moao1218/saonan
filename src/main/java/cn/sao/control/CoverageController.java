package cn.sao.control;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import cn.sao.mapper.PolicyMapper;
import cn.sao.pojo.Coverage;
import cn.sao.service.CoverageService;
import cn.sao.service.PolicyService;

@Controller
public class CoverageController {
	@Autowired
	CoverageService coverageServiceImpl;
	@GetMapping("/shouyemes")
	public String shouye(HttpServletRequest request) {
		 List<Coverage> findConverage = coverageServiceImpl.findConverage();
		request.setAttribute("findlist", findConverage);
		return "client/shouye";
	}
}
