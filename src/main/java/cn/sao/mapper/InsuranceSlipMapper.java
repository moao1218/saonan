package cn.sao.mapper;

import java.util.List;

import cn.sao.pojo.InsuranceSlip;

public interface InsuranceSlipMapper {

	/**
	 *  查询所有投保单信息
	 * @return
	 */
	public List<InsuranceSlip> findAllInsuranceSlip();
	
}
