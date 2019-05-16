package cn.saonan.utils;

public interface BCryptInterface {
	/**获取密文
	 * 
	 * @param 原密码
	 * @param 盐
	 * @return
	 */
	public String getCode(String original,Integer salt);
	
	/**
	 * 
	 * @param 测试密码
	 * @param 密码密文
	 * @return
	 */
	public boolean checkMatch(String testCode,String Code);
}
