package cn.saonan.service;

import java.util.List;

import cn.saonan.pojo.InsuranceSlip;
import cn.saonan.pojo.PolicyVerify;

public interface PolicyVerifyService {
	
	/**
	 * 	通过保单号查询勘察单
	 * @param policyId
	 * @return
	 */
	public List<PolicyVerify> findPolicyVerifyByPolicyId(String policyId);
	
	/**根据勘察员ID查询属于自己范围的投保单 
	 * @param scout
	 * @return
	 */
	public List<InsuranceSlip> findInsuranceByScout(String scout);

}
