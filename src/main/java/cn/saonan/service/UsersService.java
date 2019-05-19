package cn.saonan.service;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Users;


public interface UsersService {

	/**职员用户登录
	 * @throws Exception 
	 *
	 */
	public boolean isLogin(Clerk user,String privateKeys) throws Exception;
	
	/**查找广东省下的所有城市
	 * @return
	 */
	public List<City> findAllCity();
	/**
	 * 
	 * @param clerk
	 * @return
	 */
	public Clerk getClerk(Clerk clerk);
	
	/**通过id查找用户
	 * @param userid
	 * @return
	 */
	public Users findUserByUserId(String userid);
	
}
