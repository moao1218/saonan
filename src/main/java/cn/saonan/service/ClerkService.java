package cn.saonan.service;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.Clerk;

public interface ClerkService {

	/*
	 * 登录
	 */
	public Clerk Clerklogin(Clerk ck);
	
	/*
	 * 分页查询员工表
	 */
	public void  findClerkSplit(Map<String,Object> map);
	
	
	/*
	 * 员工详情的查找
	 */
	public Clerk findaclerk(Integer magid);
	
	
	/*
	 * 员工的添加
	 */
	public boolean docreate(Clerk ck);
	
	/*
	 * 用户名验证
	 */
	public Integer checkname(String username);
	
		
	/*
	 * 员工修改
	 */
	 public boolean clerkupdate(Clerk ck);
	
	/*
	 * 员工删除
	 */
	
	 public boolean clerkupddele(Integer magid);
	
	/*
	 * 员工注销
	 */
	 public boolean clerkdelete(Integer magid);
	
	 /*
		 * 根据角色查找员工
		 */
	 public List<Clerk> findClerkByRole(Integer roleid);
}
