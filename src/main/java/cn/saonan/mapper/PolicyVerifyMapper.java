package cn.saonan.mapper;

import java.util.List;

import cn.saonan.pojo.PolicyVerify;

public interface PolicyVerifyMapper {
	
	/**
	 * 	通过保单号查询勘察单
	 * @param policyId
	 * @return
	 */
	public List<PolicyVerify> findPolicyVerifyByPolicyId(String policyId);

}
