package cn.saonan.utils;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.List;
import java.util.Map;

public interface RSAInterface {
	/**����
	 * 
	 * @param ԭ����
	 * @return ���ܺ�����
	 * @throws Exception 
	 * @throws Exception 
	 */
	public String getCode(String original,String commKey) throws Exception, Exception;
	
	/**��ԭ����
	 * 
	 * @param ����
	 * @return ԭ����
	 * @throws Exception 
	 */
	public String getOriginal(String code,String privaKey) throws Exception;
	
	/**�õ���˽Կ��
	 * 
	 * @return ��Կ
	 */
	public Map<Integer,String> getCommAndPrivaKey();
	
	/**��ȡժҪ��
	 * 
	 * @param ԭ����
	 * @return
	 */
	public String getMD5Hash(String original);
	
	/**
     * ǩ��
     * 
     * @param data ��ǩ������
     * @param privateKey ˽Կ
     * @return ǩ��
	 * @throws Exception 
     */
	public String sign(String data, PrivateKey privateKey) throws Exception;
	
	/**
     * ��ȡ˽Կ
     * 
     * @param privateKey ˽Կ�ַ���
     * @return
	 * @throws Exception 
     */
    public PrivateKey getPrivateKey(String privateKey) throws Exception;
    
    /**
     * ��ȡ��Կ
     * 
     * @param publicKey ��Կ�ַ���
     * @return
     * @throws Exception 
     */
    public PublicKey getPublicKey(String publicKey) throws Exception;
    /**��ǩ
     * 
     * @param srcData
     * @param publicKey
     * @param sign
     * @return
     * @throws Exception
     */
	boolean verify(String srcData, PublicKey publicKey, String sign) throws Exception;
}
