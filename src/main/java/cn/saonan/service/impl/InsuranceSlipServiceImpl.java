package cn.saonan.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.InsuranceSlipMapper;
import cn.saonan.pojo.City;
import cn.saonan.pojo.Coverage;
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

	@Override
	public List<Coverage> findAllCoverage() {
		return insuranceMapper.findAllCoverage();
	}

	@Override
	public boolean updateInsuranceStatus(Map<String, Object> map) {
		if(insuranceMapper.updateInsuranceStatus(map)>0) {
			return true;
		}
		return false;
	}

	@Override
	public Coverage findCoverageid(String coverage_name) {
		if(coverage_name==null&&"".equals(coverage_name)) {
			return null;
		}
		return insuranceMapper.findCoverageid(coverage_name);
	}

}
