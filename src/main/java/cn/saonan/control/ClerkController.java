package cn.saonan.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.saonan.pojo.Clerk;
import cn.saonan.service.ClerkService;

@Controller
public class ClerkController {

	@Autowired
	private ClerkService clerkservice;
	
	@ResponseBody
	@GetMapping(value="/findClerkSplit")

	public String findClerkSplit(Model model,Clerk clerk) {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		map.put("cp", cp);
		map.put("ps", ps);
		clerkservice.findClerkSplits(map);
		List<Clerk> list = new ArrayList<Clerk>();
		List<Clerk> clerklist = (List<Clerk>) map.get("clerks");
		int count = (Integer)map.get("c_count");
		int totalpage=(Integer)map.get("totalpage");
		model.addAttribute("cp", cp);
		model.addAttribute("ps", ps);
		model.addAttribute("totalpage", totalpage);
		model.addAttribute("clerklist", clerklist);
		
		return "server/findAllClerk";
		
	}
}
