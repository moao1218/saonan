package cn.saonan.test;

import org.mindrot.bcrypt.BCrypt;

import cn.saonan.utils.BCryptInterface;
import cn.saonan.utils.RSAInterface;
import cn.saonan.utils.impl.BCryptImpl;
import cn.saonan.utils.impl.RSAImpl;

public class Test {
	
	public static void main(String[] args) {
		BCryptInterface bcrypt=new BCryptImpl();
		RSAInterface rsa=new RSAImpl();
		String code = bcrypt.getCode("123",12);
		String code1 = bcrypt.getCode("123",1);
		System.out.println(code);
		System.out.println(code1);
	}
}
