package cn.saonan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.PvMapper;
import cn.saonan.pojo.Pv;
import cn.saonan.service.PvService;

@Service
public class PvServiceImpl implements PvService {
	
	@Autowired
	private PvMapper pvmapper;

	@Override
	public boolean insertPv(Pv pv) {
		return pvmapper.insertPv(pv)>0;
	}

}
