package cn.saonan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.PolicyVerifyMapper;
import cn.saonan.pojo.PolicyVerify;
import cn.saonan.service.PolicyVerifyService;

@Service
public class PolicyVerifyServiceImpl implements PolicyVerifyService {

	@Autowired
	private PolicyVerifyMapper pvm;
	
	@Override
	public List<PolicyVerify> findPolicyVerifyByPolicyId(String policyId) {
		
		return pvm.findPolicyVerifyByPolicyId(policyId);
	}

}
