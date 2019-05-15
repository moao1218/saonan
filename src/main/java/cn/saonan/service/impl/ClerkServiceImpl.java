package cn.saonan.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.saonan.mapper.ClerkMapper;
import cn.saonan.pojo.Clerk;
import cn.saonan.service.ClerkService;

@Service
public class ClerkServiceImpl implements ClerkService {
	
	@Autowired
	private ClerkMapper clerkmapper;

	//登录
	@Override
	public Clerk Clerklogin(Clerk ck) {
		// TODO Auto-generated method stub
		return clerkmapper.Clerklogin(ck);
	}

	//员工查询分页
	@Override
	public void  findClerkSplit(Map<String,Object> map) {
			
		clerkmapper.findClerkSplits(map);
	}

	
	// 员工详情的查找
		@Override
		public Clerk findaclerk(Integer magid) {
				
			return clerkmapper.findaclerk(magid);
		}
	

	//员工添加
	@Override
	public boolean docreate(Clerk ck) {
		// TODO Auto-generated method stub
		return clerkmapper.docreate(ck);
	}

	//员工注册名验证
	@Override
	public Integer checkname(String username) {
		// TODO Auto-generated method stub
		return clerkmapper.checkname(username);
	}

	//员工修改
	@Override
	public boolean clerkupdate(Clerk ck) {
		// TODO Auto-generated method stub
		return clerkmapper.clerkupdate(ck);
	}

	//员工删除
	@Override
	public boolean clerkupddele(Integer magid) {
		// TODO Auto-generated method stub
		return clerkmapper.clerkupddele(magid);
	}

	//员工注销
	@Override
	public boolean clerkdelete(Integer magid) {
		// TODO Auto-generated method stub
		return clerkmapper.clerkdelete(magid);
	}

	@Override
	public List<Clerk> findClerkByRole(Integer roleid) {
		return clerkmapper.findClerkByRole(roleid);
	}

}
