package cn.saonan.mapper;

import cn.saonan.pojo.BlackList;

public interface BlackListMapper {
	
	/**通过传入用户编号来判断是否在黑名单
	 * @param userId
	 * @return
	 */
	public BlackList findBlackListById(String userId);

}
