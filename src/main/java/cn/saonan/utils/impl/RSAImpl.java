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

import cn.saonan.utils.RSAInterface;


public class RSAImpl implements RSAInterface{
	
	
	/**����
	 * 
	 */

	public String getCode1(String original, String commKey) {
		byte[] decoded = Base64.decodeBase64(commKey);
		RSAPublicKey pubKey;
		String outStr="";
		try {
			pubKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decoded));
			//RSA����
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
     * RSA����
     * 
     * @param data ����������
     * @param publicKey ��Կ
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
        // �����ݷֶμ���
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
        // ��ȡ��������ʹ��base64���б���,����UTF-8Ϊ��׼ת�����ַ���
        // ���ܺ���ַ���
        return new String(Base64.encodeBase64String(encryptedData));
    }
	/**����
	 * 
	 */

	public String getOriginal1(String code, String privaKey)throws Exception {
		//64λ������ܺ���ַ���
		byte[] inputByte = null; 
		inputByte=Base64.decodeBase64(code.getBytes("UTF-8"));
		//base64�����˽Կ
		byte[] decoded = Base64.decodeBase64(privaKey);  
        RSAPrivateKey priKey = (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decoded));  
		//RSA����
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, priKey);
		String outStr = new String(cipher.doFinal(inputByte));
		return outStr;
	}
	/**
     * RSA����
     * 
     * @param data ����������
     * @param privateKey ˽Կ
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
        // �����ݷֶν���
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
        // ���ܺ������ 
        return new String(decryptedData, "UTF-8");
    }
	/**��ȡԿ��
	 * 
	 */
	@Override
	public Map<Integer, String> getCommAndPrivaKey() {
		Map<Integer, String> keyMap = new HashMap<Integer, String>();
		// KeyPairGenerator���������ɹ�Կ��˽Կ�ԣ�����RSA�㷨���ɶ���  
		KeyPairGenerator keyPairGen;
		try {
			keyPairGen = KeyPairGenerator.getInstance("RSA");
			// ��ʼ����Կ������������Կ��СΪ96-1024λ  
			keyPairGen.initialize(1024,new SecureRandom());  
			// ����һ����Կ�ԣ�������keyPair��  
			KeyPair keyPair = keyPairGen.generateKeyPair();  
			RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();   // �õ�˽Կ  
			RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();  // �õ���Կ  
			String publicKeyString = new String(Base64.encodeBase64(publicKey.getEncoded()));  
			// �õ�˽Կ�ַ���  
			String privateKeyString = new String(Base64.encodeBase64((privateKey.getEncoded())));  
			// ����Կ��˽Կ���浽Map
			keyMap.put(0,publicKeyString);  //0��ʾ��Կ
			keyMap.put(1,privateKeyString);  //1��ʾ˽Կ
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		return keyMap;
	}
	/**
     * ǩ��
     * 
     * @param data ��ǩ������
     * @param privateKey ˽Կ
     * @return ǩ��
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
     * ��ǩ
     * 
     * @param srcData ԭʼ�ַ���
     * @param publicKey ��Կ
     * @param sign ǩ��
     * @return �Ƿ���ǩͨ��
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
     * ��ȡ˽Կ
     * 
     * @param privateKey ˽Կ�ַ���
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
     * ��ȡ��Կ
     * 
     * @param publicKey ��Կ�ַ���
     * @return
     */
	@Override
    public PublicKey getPublicKey(String publicKey) throws Exception {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] decodedKey = Base64.decodeBase64(publicKey.getBytes());
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decodedKey);
        return keyFactory.generatePublic(keySpec);
    }
	/**ͨ��MD5��ȡ���ĵ�ժҪ
	 * 
	 */
	@Override
	public String getMD5Hash(String original) {
		
		return DigestUtils.md5Hex(original);
	}
	



	

}
