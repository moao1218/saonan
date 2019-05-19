package cn.saonan.mapper;

import java.util.List;

import cn.saonan.pojo.City;
import cn.saonan.pojo.Clerk;
import cn.saonan.pojo.Users;

public interface UsersMapper {

	
	/**职员登录验证
	 * @param user
	 * @return
	 */
	public Clerk isLogin(Clerk user);
	
	
	/**查找广东省下的所有城市
	 * @return
	 */
	public List<City> findAllCity();
	
	/**通过id查找用户
	 * @param userid
	 * @return
	 */
	public Users findUserByUserId(String userid);
}
