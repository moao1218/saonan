package cn.saonan.mapper;

import java.util.Map;

import cn.saonan.pojo.Policy;

public interface PolicyMapper {
	
	public void findPolicyByMoreCondition(Map<String, Object> map);
	
	public Policy findPolicyById(String policyId);

}
