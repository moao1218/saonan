package cn.saonan.service;

import java.util.Map;

import cn.saonan.pojo.Clerk;


public interface UsersService {

	/**
	 * 职员用户登录
	 *
	 */
	public Clerk isLogin(Clerk user);
}
