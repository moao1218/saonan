package cn.sao.mapper;

import cn.sao.pojo.Users;

public interface UsersMapper {

	/**
	 * 用户账号密码登录
	 * @param users
	 * @return
	 */
	public Users isLogin(Users users);
	
	/**
	 * 用户短信验证码登录
	 * @param users
	 * @return
	 */
	public Users Login(Users users);

	/**
	 * 注册方法
	 * @param users
	 * @return
	 */
	public boolean addUser(Users users);
	
	
	
}

