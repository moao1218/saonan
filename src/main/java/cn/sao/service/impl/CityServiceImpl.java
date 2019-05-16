package cn.sao.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.sao.mapper.CityMapper;
import cn.sao.pojo.City;
import cn.sao.service.CityService;
@Service
public class CityServiceImpl implements CityService{
	@Autowired
	CityMapper cityMapper;

	@Override
	public List<City> findallcity() {
		return cityMapper.findallcity();
	}

	@Override
	public List<City> findstreet(String code) {
		return cityMapper.findstreet(code);
	}

}
