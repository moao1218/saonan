package cn.saonan.service;

import java.util.List;

import cn.saonan.pojo.PolicyVerify;

public interface PolicyVerifyService {
	
	/**
	 * 	通过保单号查询勘察单
	 * @param policyId
	 * @return
	 */
	public List<PolicyVerify> findPolicyVerifyByPolicyId(String policyId);

}
