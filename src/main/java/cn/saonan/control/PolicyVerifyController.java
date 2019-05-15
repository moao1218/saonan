package cn.saonan.control;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Coverage;
import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.pojo.Items;
import cn.saonan.pojo.Pv;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.PolicyVerifyService;
import cn.saonan.service.PvService;
import cn.saonan.service.UsersService;
import cn.saonan.utils.Upload;

@Controller
public class PolicyVerifyController {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;

	@Autowired
	private PolicyVerifyService policyVerifyService;
	
	@Autowired
	private UsersService usersService ;
	
	@Autowired
	private PvService pvService;
	
	@GetMapping(value="/jumpScout")
	public String scoutSplit(HttpServletRequest request,Model model) throws ParseException {
		Map<String,Object> map = new HashMap<String,Object>();
		int cp = 1;
		int ps = 5;
		
		Clerk clerk = (Clerk) request.getSession().getAttribute("user");
		
		String cpp = request.getParameter("cp");
		
		if(cpp!=null&&!"".equals(cpp)){
			cp = Integer.parseInt(cpp);
		}
		
		String pss = request.getParameter("ps");
		if(pss!=null&&!"".equals(pss)){
			ps = Integer.parseInt(pss);
		}
		map.put("cp", cp);
		map.put("ps", ps);
		map.put("v_scout", clerk.getMagid()+"");
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
		Integer v_count = (Integer) map.get("v_count");
		int totalpage = (v_count-1)/ps + 1;
		
		List<Coverage> coverageList = insuranceSlipService.findAllCoverage();
		model.addAttribute("cp", cp);
		model.addAttribute("ps", ps);
		
		
		List<City> cityList = usersService.findAllCity();
		model.addAttribute("insureList", insureList);
		model.addAttribute("totalpage", totalpage);
		model.addAttribute("cityList", cityList);
		model.addAttribute("coverageList", coverageList);
		return "server/policy_verify_list";
	}
	
	@ResponseBody
	@PostMapping(value="/findAllItems")
	public List<Items> findAllItems(){
		List<Items> items = pvService.findAllItems();
		return items;
	}
	
	@PostMapping(value="/insertPv")
	public String insertPv(Pv pv,HttpServletRequest request) {
		Map<String,Object> map = new HashMap<String,Object>();
		Coverage c = new Coverage();
		c.setCoverageid(null);
		
		Items items = new Items();
		
		pv.setScout("");
		pv.setInsureid("");
		pv.setCoverage(c);
		pv.setDel_status("");
		
		MultipartRequest req = (MultipartRequest) request;	
		MultipartFile h_pic = req.getFile("h_pic");
		MultipartFile bu_pic = req.getFile("bud_pic");
		if(h_pic!=null) {
			String house_pic = Upload.upload(request, h_pic);
			pv.setHouse_pic(house_pic);
		}
		if(bu_pic!=null) {
			String building_pic = Upload.upload(request, bu_pic);
			pv.setBuilding_pic(building_pic);
		}
		
		
		String num = request.getParameter("num");
		System.out.println("num:"+num);
		for (int i = 1; i < Integer.parseInt(num); i++) {
			long currentTimeMillis = System.currentTimeMillis();
			int r = new Random().nextInt(8999)+1000;
			pv.setPol_ver_id(""+currentTimeMillis+r);
			
			if(req.getFile("a_pic"+i)!=null) {
				String site_photo = Upload.upload(request, req.getFile("a_pic"+i));
				items.setSite_photo(site_photo);
			}
			
			if(req.getFile("b_pic"+i)!=null) {
				String third_pic = Upload.upload(request, req.getFile("b_pic"+i));
				items.setThird_pic(third_pic);
			}
			if(req.getFile("c_pic"+i)!=null) {
				String invoice_pic = Upload.upload(request, req.getFile("c_pic"+i));
				items.setInvoice_pic(invoice_pic);
			}
			String itemid = request.getParameter("a"+i);
			String item_age = request.getParameter("b"+i);
			String invoice = request.getParameter("c"+i);
			String mark = request.getParameter("d"+i);
			String pmodel = request.getParameter("e"+i);
			
			items.setItemid(Integer.parseInt(itemid));
			items.setItem_age(item_age);
			items.setInvoice(invoice);
			items.setMark(mark);
			items.setPmodel(pmodel);
			
			map.put("pv", pv);
			map.put("items", items);
			
			boolean insertPv = pvService.insertPv(map);
			System.out.println("存入:"+insertPv);
		}
//		List<Items> items = pvService.findAllItems();
//		model.addAttribute("items", items);
		return "redirect:/jumpScout";
	}
}
