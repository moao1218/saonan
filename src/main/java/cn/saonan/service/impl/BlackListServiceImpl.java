package cn.saonan.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.pojo.BlackList;
import cn.saonan.service.BlackListService;

@Service
public class BlackListServiceImpl implements BlackListService {
	
	@Autowired
	private BlackListService blackListService;

	@Override
	public BlackList findBlackListById(String userId) {
		// TODO Auto-generated method stub
		return blackListService.findBlackListById(userId);
	}

}
