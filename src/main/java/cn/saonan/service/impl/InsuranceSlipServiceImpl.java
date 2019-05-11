package cn.saonan.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.InsuranceSlipMapper;
import cn.saonan.service.InsuranceSlipService;

@Service
public class InsuranceSlipServiceImpl implements InsuranceSlipService {
	
	@Autowired
	private InsuranceSlipMapper insuranceMapper;

	@Override
	public void findInsuranceSlipList(Map<String, Object> map) {
		insuranceMapper.findInsuranceSlipList(map);
	}

}
