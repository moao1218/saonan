package cn.sao.service;

import java.util.List;

import cn.sao.pojo.City;

public interface CityService {
	public List<City> findallcity();
	
	public List<City> findstreet(String code);
}
