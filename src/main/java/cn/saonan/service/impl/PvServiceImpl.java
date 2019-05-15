package cn.saonan.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.PvMapper;
import cn.saonan.pojo.Items;
import cn.saonan.pojo.Pv;
import cn.saonan.service.InsuranceSlipService;
import cn.saonan.service.PvService;

@Service
public class PvServiceImpl implements PvService {
	
	@Autowired
	private InsuranceSlipService insuranceSlipService ;
	
	@Autowired
	private PvMapper pvmapper;

	@Override
	public boolean insertPv(Map<String,Object> map) {
		if(pvmapper.insertPv(map)>0) {
			Map<String,Object> upmap = new HashMap<String,Object>();
			Pv pv = (Pv) map.get("pv");
			//4==>勘察中,需要将所有险种全部勘察完
			upmap.put("newstatus", 3);
			upmap.put("policyid", pv.getInsureid());
			insuranceSlipService.updateInsuranceStatus(upmap);
			return true;
		}
		return pvmapper.insertPv(map)>0;
	}

	@Override
	public List<Items> findAllItems() {
		return pvmapper.findAllItems();
	}

}
