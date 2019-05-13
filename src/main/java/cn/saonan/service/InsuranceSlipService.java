package cn.saonan.service;

import java.util.Map;


public interface InsuranceSlipService {

	/**
	 * 保单多条件查询
	 *
	 */
	public void findInsuranceSlipList(Map<String,Object> map);
}
