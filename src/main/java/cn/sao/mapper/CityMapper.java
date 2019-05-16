package cn.sao.mapper;

import java.util.List;

import cn.sao.pojo.City;

public interface CityMapper {
	public List<City> findallcity();
	
	public List<City> findstreet(String code);
}
