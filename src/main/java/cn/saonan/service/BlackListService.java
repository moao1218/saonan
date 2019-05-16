package cn.saonan.service;

import cn.saonan.pojo.BlackList;

public interface BlackListService {
	
	/**通过传入用户编号来判断是否在黑名单
	 * @param userId
	 * @return
	 */
	public BlackList findBlackListById(String userId);

}
