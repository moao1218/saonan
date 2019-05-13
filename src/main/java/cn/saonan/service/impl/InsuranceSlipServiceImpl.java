package cn.saonan.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.InsuranceSlipMapper;
import cn.saonan.pojo.City;
import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.service.InsuranceSlipService;

@Service
public class InsuranceSlipServiceImpl implements InsuranceSlipService {
	
	@Autowired
	private InsuranceSlipMapper insuranceMapper;

	@Override
	public void findInsuranceSlipList(Map<String, Object> map) {
		insuranceMapper.findInsuranceSlipList(map);
	}

	@Override
	public List<City> findCityRegion(String code) {
		return insuranceMapper.findCityRegion(code);
	}

	@Override
	public InsuranceSlip findOneInsurance(String pid) {
		if(pid==null&&"".equals(pid)) {
			return null;
		}
		return insuranceMapper.findOneInsurance(pid);
	}

}
