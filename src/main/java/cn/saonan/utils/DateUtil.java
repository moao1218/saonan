package cn.saonan.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class DateUtil {
	
	public static List<String> gainTwoDate(){
		
		 Date date = new Date();
		 Calendar cal = Calendar.getInstance();
		 cal.setTime(date);//设置起时间
		 Date time = cal.getTime();
		 //增加一年
		 cal.add(Calendar.YEAR, 1);
		 Date time2 = cal.getTime();
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String format = simpleDateFormat.format(time);
		String format2 = simpleDateFormat.format(time2);
		
		List<String> list = new LinkedList<String>();
		list.add(format);
		list.add(format2);
	
		return list;
	}

}
