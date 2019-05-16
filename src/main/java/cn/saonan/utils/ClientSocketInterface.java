package cn.saonan.utils;

public interface ClientSocketInterface {
	/**
	 * 
	 * @param 命令json
	 * @return 返回的数据包
	 */
	public String sendAndGet(String cmd);
}
