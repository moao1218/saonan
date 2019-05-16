package cn.sao.service;

import java.util.List;

import cn.sao.pojo.InsuranceSlip;

public interface InsuranceSlipService {

	/**
	 * 查询所有投保单信息
	 * @return
	 */
	public List<InsuranceSlip> findAllInsuranceSlip();
}
