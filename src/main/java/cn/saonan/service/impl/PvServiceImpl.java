package cn.saonan.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.PvMapper;
import cn.saonan.pojo.Items;
import cn.saonan.pojo.Pv;
import cn.saonan.service.PvService;

@Service
public class PvServiceImpl implements PvService {
	
	@Autowired
	private PvMapper pvmapper;

	@Override
	public boolean insertPv(Map<String,Object> map) {
		return pvmapper.insertPv(map)>0;
	}

	@Override
	public List<Items> findAllItems() {
		return pvmapper.findAllItems();
	}

}