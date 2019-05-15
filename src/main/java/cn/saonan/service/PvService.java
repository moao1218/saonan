package cn.saonan.service;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.Items;
import cn.saonan.pojo.Pv;

public interface PvService {

	public boolean insertPv(Map<String,Object> map);
	
	public List<Items> findAllItems();
}
