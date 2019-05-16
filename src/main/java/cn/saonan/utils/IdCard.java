package cn.saonan.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class IdCard {
	
	/**
	 * 	检查身份证是否合理
	 * @param id
	 * @return
	 */
	public static String checkIdCard(String id) {
		
		StringBuffer b=new StringBuffer();
		try {
			URL u=new URL("https://way.jd.com/yingyan/queryidcard?id=" + id + "&appkey=1f042f69fc9614b2c0904bbae60d77e0");
			URLConnection openConnection = u.openConnection();
			InputStream inputStream = openConnection.getInputStream();
			InputStreamReader is = new InputStreamReader(inputStream);
			BufferedReader bis = new BufferedReader(is);
			String readLine = bis.readLine();
		for(;readLine!=null;) {
			//System.out.println(readLine);
			b.append(readLine);
			readLine = bis.readLine();
		}
		
		System.out.println(b.toString());
		/*
		 * JSON parse = (JSON) JSON.parse(b.toString());
		 * System.out.println(parse.toString());
		 */
		
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
		
		return b.toString();
		
	}

}
