package cn.saonan.utils;

public interface BCryptInterface {
	/**��ȡ����
	 * 
	 * @param ԭ����
	 * @param ��
	 * @return
	 */
	public String getCode(String original,Integer salt);
	
	/**
	 * 
	 * @param ��������
	 * @param ��������
	 * @return
	 */
	public boolean checkMatch(String testCode,String Code);
}
