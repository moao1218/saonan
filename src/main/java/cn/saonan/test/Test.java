package cn.saonan.test;

import org.mindrot.bcrypt.BCrypt;

import cn.saonan.utils.BCryptInterface;
import cn.saonan.utils.RSAInterface;
import cn.saonan.utils.impl.BCryptImpl;
import cn.saonan.utils.impl.RSAImpl;

public class Test {
	
	public static void main(String[] args) throws Exception {
		BCryptInterface bcrypt=new BCryptImpl();
		RSAInterface rsa=new RSAImpl();
		String code = bcrypt.getCode("123", 5);
		String code2 = bcrypt.getCode("123", 6);
		String code3 = bcrypt.getCode("123", 7);
		String code4 = bcrypt.getCode("123", 8);
		String code5 = bcrypt.getCode("123", 9);
//		String ora=rsa.getOriginal("123", privaKey)
//		String ora=rsa.getOriginal("cjn0FILO8Edi9otpGmbBu8Y9evtpZRC27tYRBmRG2ltZmFGXcwncURyJRgK/2gSwH109RcCy4Ml2hPL8R1OzUq5228WYWtwmgbEj9rgDs0X9HEPi9ujwLLcdr8Yk1z4Vv4ide2OZk21mvJkspnj37WjfFk8xnYmBTONBbvLTj1s=", "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAI5WaxQy8Q2UMgYeBBx+Ltc1ACzECAfFvaHWr7pdnbZPAQTXo+JP4I4QO27Q40ggMOU8CyYNApkR1lcwB15l6Z8uIxph45BeOZnCr++frL83Qg92LlAeCIaEgjZFSqYCs42gsWawvMBDmck2OhUnZB+aViBUIpWttbe4gMG6ZCo9AgMBAAECgYANQc9HWldJRHxERZdsb/Q85xrVEI0O7EP1RuGnIgEGceVOZidFdNsdYDWo5JvGo/jp4OXI7X1IdHjaNgb5q9ROc4OBHQhipK3FCkDNjr5MBKx4KTZmMoT4sonyAf6IuK9R7E0qdiOAmPyKULOBBJNyPLPozeM7l7g2nh/aBSsjAQJBAMusB7IYiTKWiHUXbbHH5uxKYlat9LykfwSPPg8ikNc8Tt9/ickpbgDC83O3QFqXxvVgqQoE6+2Z+znX6Z91sjUCQQCy6EiuuUJYPlcW/y8TT2x3kiWrzuSRkogGC5txhT4ivZgvnkl5RopwlvK64rebSjcWGyYE1HVJLOrdrN1DUBjpAkBYNP30PLoWhak9hNMGHrw8844ZWidXF6rG776B0YeHH+BM3TBwRZgVjljfcarWUUtic+VhqHYBJiHukDrmy5NNAj9KE+QEdLED2Mw2uXLEjB5dZCY0/XWm0QWBe0zhtEoGGHrrPJ8vmAW6mMXom/dqVVB51sPnPBFUO0UEhI8ZUBECQQDAl0aAxyLRiu1EsOZVtgUb5JrhMJNARLzrp4qaUveEujMMQi2u/r1motPEG/V0cqDeVdSpeDS9+zwlBmw6ZPq1");
//		System.out.println(ora);
		System.out.println(code);
		System.out.println(code2);
		System.out.println(code3);
		System.out.println(code4);
		System.out.println(code5);
	}
}
