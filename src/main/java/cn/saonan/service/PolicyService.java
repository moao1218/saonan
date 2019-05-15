package cn.saonan.service;

import java.util.Map;

import cn.saonan.pojo.Policy;

public interface PolicyService {
	
	public void findPolicyByMoreCondition(Map<String, Object> map);
	
	public Policy findPolicyById(String policyId);

}
