package cn.sao.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.sao.mapper.InsuranceSlipMapper;
import cn.sao.pojo.InsuranceSlip;
import cn.sao.service.InsuranceSlipService;

@Service
public class InsuranceSlipServiceImpl implements InsuranceSlipService {

	@Autowired
	private InsuranceSlipMapper insuranceSlipMapper;

	@Override
	public List<InsuranceSlip> findAllInsuranceSlip() {
		return insuranceSlipMapper.findAllInsuranceSlip();
	}

}
