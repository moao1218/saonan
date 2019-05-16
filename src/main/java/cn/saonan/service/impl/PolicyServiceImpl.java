package cn.saonan.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.PolicyMapper;
import cn.saonan.pojo.Policy;
import cn.saonan.service.PolicyService;

@Service
public class PolicyServiceImpl implements PolicyService {

	@Autowired
	private PolicyMapper policyMapper;
	
	@Override
	public void findPolicyByMoreCondition(Map<String, Object> map) {
		policyMapper.findPolicyByMoreCondition(map);
		
	}

	@Override
	public Policy findPolicyById(String policyId) {
		
		return policyMapper.findPolicyById(policyId);
	}

}
