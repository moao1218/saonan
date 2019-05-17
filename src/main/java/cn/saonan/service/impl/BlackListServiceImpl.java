package cn.saonan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.BlackListMapper;
import cn.saonan.service.BlackListService;

@Service
public class BlackListServiceImpl implements BlackListService {
	
	@Autowired
	private BlackListMapper blackListMapper;

	@Override
	public boolean findBlackListById(String userId) {
		// TODO Auto-generated method stub
		return blackListMapper.findBlackListById(userId)!=null;
	}

}
