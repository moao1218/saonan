package cn.saonan.utils;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Map;

public interface RSAInterface {
	/**加密
	 * 
	 * @param 原密码
	 * @return 加密后密码
	 * @throws Exception 
	 * @throws Exception 
	 */
	public String getCode(String original,String commKey) throws Exception, Exception;
	
	/**还原密码
	 * 
	 * @param 密文
	 * @return 原密码
	 * @throws Exception 
	 */
	public String getOriginal(String code,String privaKey) throws Exception;
	
	/**拿到公私钥对
	 * 
	 * @return 公钥
	 */
	public Map<Integer,String> getCommAndPrivaKey();
	
	/**获取摘要用
	 * 
	 * @param 原密码
	 * @return
	 */
	public String getMD5Hash(String original);
	
	/**
     * 签名
     * 
     * @param data 待签名数据
     * @param privateKey 私钥
     * @return 签名
	 * @throws Exception 
     */
	public String sign(String data, PrivateKey privateKey) throws Exception;
	
	/**
     * 获取私钥
     * 
     * @param privateKey 私钥字符串
     * @return
	 * @throws Exception 
     */
    public PrivateKey getPrivateKey(String privateKey) throws Exception;
    
    /**
     * 获取公钥
     * 
     * @param publicKey 公钥字符串
     * @return
     * @throws Exception 
     */
    public PublicKey getPublicKey(String publicKey) throws Exception;
    /**验签
     * 
     * @param srcData
     * @param publicKey
     * @param sign
     * @return
     * @throws Exception
     */
	boolean verify(String srcData, PublicKey publicKey, String sign) throws Exception;
}
