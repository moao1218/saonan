package cn.saonan.mapper;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Coverage;
import cn.saonan.pojo.InsuranceSlip;

public interface InsuranceSlipMapper {

	public void findInsuranceSlipList(Map<String,Object> map);
	
	public List<City> findCityRegion(String code);
	
	public InsuranceSlip findOneInsurance(String pid);
	
	public List<Coverage> findAllCoverage();
}
