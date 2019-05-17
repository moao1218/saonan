package cn.saonan.utils.impl;

import java.io.ByteArrayOutputStream;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import cn.saonan.utils.RSAInterface;
@Component
public class RSAImpl implements RSAInterface{
	
	
	/**加密
	 * 
	 */

	public String getCode1(String original, String commKey) {
		byte[] decoded = Base64.decodeBase64(commKey);
		RSAPublicKey pubKey;
		String outStr="";
		try {
			pubKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decoded));
			//RSA加密
			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, pubKey);
			outStr = Base64.encodeBase64String(cipher.doFinal(original.getBytes("UTF-8")));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return outStr;
	}
	/**
     * RSA加密
     * 
     * @param data 待加密数据
     * @param publicKey 公钥
     * @return
     */
    public String getCode(String data, String publicKeys) throws Exception {
    	PublicKey publicKey=this.getPublicKey(publicKeys);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        int inputLen = data.getBytes().length;
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        int offset = 0;
        byte[] cache;
        int i = 0;
        // 对数据分段加密
        while (inputLen - offset > 0) {
            if (inputLen - offset > 117) {
                cache = cipher.doFinal(data.getBytes(), offset, 117);
            } else {
                cache = cipher.doFinal(data.getBytes(), offset, inputLen - offset);
            }
            out.write(cache, 0, cache.length);
            i++;
            offset = i * 117;
        }
        byte[] encryptedData = out.toByteArray();
        out.close();
        // 获取加密内容使用base64进行编码,并以UTF-8为标准转化成字符串
        // 加密后的字符串
        return new String(Base64.encodeBase64String(encryptedData));
    }
	/**解密
	 * 
	 */

	public String getOriginal1(String code, String privaKey)throws Exception {
		//64位解码加密后的字符串
		byte[] inputByte = null; 
		inputByte=Base64.decodeBase64(code.getBytes("UTF-8"));
		//base64编码的私钥
		byte[] decoded = Base64.decodeBase64(privaKey);  
        RSAPrivateKey priKey = (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decoded));  
		//RSA解密
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, priKey);
		String outStr = new String(cipher.doFinal(inputByte));
		return outStr;
	}
	/**
     * RSA解密
     * 
     * @param data 待解密数据
     * @param privateKey 私钥
     * @return
     */
    public String getOriginal(String data, String privateKeys) throws Exception {
    	PrivateKey privateKey = this.getPrivateKey(privateKeys);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] dataBytes = Base64.decodeBase64(data);
        int inputLen = dataBytes.length;
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        int offset = 0;
        byte[] cache;
        int i = 0;
        // 对数据分段解密
        while (inputLen - offset > 0) {
            if (inputLen - offset > 128) {
                cache = cipher.doFinal(dataBytes, offset, 128);
            } else {
                cache = cipher.doFinal(dataBytes, offset, inputLen - offset);
            }
            out.write(cache, 0, cache.length);
            i++;
            offset = i * 128;
        }
        byte[] decryptedData = out.toByteArray();
        out.close();
        // 解密后的内容 
        System.out.println("new String(decryptedData, \"UTF-8\"):"+new String(decryptedData, "UTF-8"));
        return new String(decryptedData, "UTF-8");
    }
	/**获取钥对
	 * 
	 */
	@Override
	public Map<Integer, String> getCommAndPrivaKey() {
		Map<Integer, String> keyMap = new HashMap<Integer, String>();
		// KeyPairGenerator类用于生成公钥和私钥对，基于RSA算法生成对象  
		KeyPairGenerator keyPairGen;
		try {
			keyPairGen = KeyPairGenerator.getInstance("RSA");
			// 初始化密钥对生成器，密钥大小为96-1024位  
			keyPairGen.initialize(1024,new SecureRandom());  
			// 生成一个密钥对，保存在keyPair中  
			KeyPair keyPair = keyPairGen.generateKeyPair();  
			RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();   // 得到私钥  
			RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();  // 得到公钥  
			String publicKeyString = new String(Base64.encodeBase64(publicKey.getEncoded()));  
			// 得到私钥字符串  
			String privateKeyString = new String(Base64.encodeBase64((privateKey.getEncoded())));  
			// 将公钥和私钥保存到Map
			keyMap.put(0,publicKeyString);  //0表示公钥
			keyMap.put(1,privateKeyString);  //1表示私钥
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		return keyMap;
	}
	/**
     * 签名
     * 
     * @param data 待签名数据
     * @param privateKey 私钥
     * @return 签名
     */
	@Override
    public String sign(String data, PrivateKey privateKey) throws Exception {
        byte[] keyBytes = privateKey.getEncoded();
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey key = keyFactory.generatePrivate(keySpec);
        Signature signature = Signature.getInstance("MD5withRSA");
        signature.initSign(key);
        signature.update(data.getBytes());
        return new String(Base64.encodeBase64(signature.sign()));
    }

    /**
     * 验签
     * 
     * @param srcData 原始字符串
     * @param publicKey 公钥
     * @param sign 签名
     * @return 是否验签通过
     */
	@Override
    public boolean verify(String srcData, PublicKey publicKey, String sign) throws Exception {
        byte[] keyBytes = publicKey.getEncoded();
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey key = keyFactory.generatePublic(keySpec);
        Signature signature = Signature.getInstance("MD5withRSA");
        signature.initVerify(key);
        signature.update(srcData.getBytes());
        return signature.verify(Base64.decodeBase64(sign.getBytes()));
    }

    /**
     * 获取私钥
     * 
     * @param privateKey 私钥字符串
     * @return
     */
	@Override
    public PrivateKey getPrivateKey(String privateKey) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] decodedKey = Base64.decodeBase64(privateKey.getBytes());
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decodedKey);
        return keyFactory.generatePrivate(keySpec);
    }

    /**
     * 获取公钥
     * 
     * @param publicKey 公钥字符串
     * @return
     */
	@Override
    public PublicKey getPublicKey(String publicKey) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] decodedKey = Base64.decodeBase64(publicKey.getBytes());
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decodedKey);
        return keyFactory.generatePublic(keySpec);
    }
	/**通过MD5获取明文的摘要
	 * 
	 */
	@Override
	public String getMD5Hash(String original) {
		
		return DigestUtils.md5Hex(original);
	}
	



	

}
