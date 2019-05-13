package cn.saonan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.UsersMapper;
import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService {
	
	@Autowired
	private UsersMapper usersMapper;

	@Override
	public Clerk isLogin(Clerk user) {
		if(user!=null&&!"".equals(user)) {
			return usersMapper.isLogin(user);
		}
		return null;
	}

	@Override
	public List<City> findAllCity() {
		return usersMapper.findAllCity();
	}

}
