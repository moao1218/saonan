package cn.saonan.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.UsersMapper;
import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Users;
import cn.saonan.service.UsersService;
import cn.saonan.utils.BCryptInterface;
import cn.saonan.utils.RSAInterface;

@Service
public class UsersServiceImpl implements UsersService {
	
	@Autowired
	private UsersMapper usersMapper;
	@Autowired
	private BCryptInterface bCryptInterface;
	@Autowired
	private RSAInterface rSAInterface;
	
	@Override
	public boolean isLogin(Clerk user,String privateKeys) throws Exception {
		if(user!=null&&!"".equals(user)) {
			String pwd=usersMapper.isLogin(user).getUserpwd();
			System.out.println("后台拿的私钥"+privateKeys);
			System.out.println("后台拿的密文"+user.getUserpwd());
			String original = rSAInterface.getOriginal(user.getUserpwd(), privateKeys);
			System.out.println("解完密后的密文:"+original);
			boolean checkMatch = bCryptInterface.checkMatch(original, pwd);
			return checkMatch;
		}
		return false;
	}

	@Override
	public List<City> findAllCity() {
		return usersMapper.findAllCity();
	}

	@Override
	public Clerk getClerk(Clerk clerk) {
		Clerk login = usersMapper.isLogin(clerk);
		return login;
	}

	@Override
	public Users findUserByUserId(String userid) {
		// TODO Auto-generated method stub
		return usersMapper.findUserByUserId(userid);
	}

}
