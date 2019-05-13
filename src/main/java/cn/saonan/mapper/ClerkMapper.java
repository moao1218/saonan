package cn.saonan.mapper;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.Clerk;

public interface ClerkMapper {

	/*
	 * 登录
	 */
	public Clerk Clerklogin(Clerk user);
	
	/*
	 * 分页查询员工表
	 */
	public List<Clerk> findClerkSplit(Map<String,Object> map);
	
	/*
	 * 总页数
	 */
	public int getCount(Map<String,Object> map);
	
	
	/*
	 * 员工的添加
	 */
	public boolean docreate(Clerk ck);
	
	/*
	 * 用户名验证
	 */
	public boolean checkname(String username);
	
		
	/*
	 * 员工修改
	 */
	 public boolean clerkupdate(Clerk ck);
	
	/*
	 * 员工删除
	 */
	
	public boolean clerkupddele(Clerk ck);
	
	/*
	 * 员工注销
	 */
	 public boolean clerkdelete(Clerk ck);
	
	
	
	
}
