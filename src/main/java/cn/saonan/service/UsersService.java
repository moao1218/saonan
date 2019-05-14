package cn.saonan.service;

import java.util.List;
import java.util.Map;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;


public interface UsersService {

	/**职员用户登录
	 *
	 */
	public Clerk isLogin(Clerk user);
	
	/**查找广东省下的所有城市
	 * @return
	 */
	public List<City> findAllCity();
	
}
