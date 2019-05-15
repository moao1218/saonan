package cn.saonan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.RolessMapper;
import cn.saonan.pojo.Roless;
import cn.saonan.service.RolessService;

@Service
public class RolessServiceImpl implements RolessService {

	@Autowired
	private RolessMapper rm;
	
	@Override
	public String findjob(Integer roleid) {
		
		return rm.findjob(roleid);
	}

}
