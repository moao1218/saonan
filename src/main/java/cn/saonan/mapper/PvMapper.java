package cn.saonan.mapper;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.Items;
import cn.saonan.pojo.Pv;

public interface PvMapper {

	public int insertPv(Map<String,Object> map);
	
	public List<Items> findAllItems();
}
