package cn.sao.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.sao.mapper.UsersMapper;
import cn.sao.pojo.Users;
import cn.sao.service.UsersService;
@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersMapper usersMapper;
	
	@Override
	public Users isLogin(Users users) {
		if (users==null||users.equals("")) {
			return null;
		}
		return usersMapper.isLogin(users);
	}

	@Override
	public Users Login(Users users) {
		if (users==null||users.equals("")) {
			return null;
		}
		return usersMapper.Login(users);
	}

	@Override
	public boolean addUser(Users users) {
		if (users==null||users.equals("")) {
			return false;
		}
		return usersMapper.addUser(users);
	}

}
