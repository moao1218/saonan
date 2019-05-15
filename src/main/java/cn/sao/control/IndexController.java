package cn.sao.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
	@GetMapping("/indexone")
	public String index() {
		return "client/indexOne";
	}
	@GetMapping("/indextwo")
	public String indexTwo() {
		return "client/indexTwo";
	}
	@GetMapping("/shouye")
	public String shoye() {
		return "client/shouye";
	}
}
