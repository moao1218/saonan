package cn.saonan.service;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.City;
import cn.saonan.pojo.InsuranceSlip;


public interface InsuranceSlipService {

	/**保单多条件查询
	 *
	 */
	public void findInsuranceSlipList(Map<String,Object> map);
	
	/**通过父级ID查找省份下的所有城市
	 * @param code
	 * @return
	 */
	public List<City> findCityRegion(String code);
	
	/**根据投保单ID查找
	 * @param pid
	 * @return
	 */
	public InsuranceSlip findOneInsurance(String pid);
}
