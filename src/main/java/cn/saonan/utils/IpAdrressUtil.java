package cn.saonan.utils;

import java.io.File;
import java.net.InetAddress;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CityResponse;
import com.maxmind.geoip2.record.City;
import com.maxmind.geoip2.record.Country;
import com.maxmind.geoip2.record.Location;
import com.maxmind.geoip2.record.Postal;
import com.maxmind.geoip2.record.Subdivision;



public class IpAdrressUtil {
    /**
     * 获取Ip地址
     * @param request
     * @return
     */
    public static String getIpAdrress(HttpServletRequest request) {
    	 /**
    	  * 获取Ip地址
    	  * @param request
    	  * @return
    	  */
    	  String Xip = request.getHeader("X-Real-IP");
    	  String XFor = request.getHeader("X-Forwarded-For");
    	  if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
    	   //多次反向代理后会有多个ip值，第一个ip才是真实ip
    	   int index = XFor.indexOf(",");
    	   if(index != -1){
    	    return XFor.substring(0,index);
    	   }else{
    	    return XFor;
    	   }
    	  }
    	  XFor = Xip;
    	  if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
    	   return XFor;
    	  }
    	  if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
    	   XFor = request.getHeader("Proxy-Client-IP");
    	  }
    	  if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
    	   XFor = request.getHeader("WL-Proxy-Client-IP");
    	  }
    	  if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
    	   XFor = request.getHeader("HTTP_CLIENT_IP");
    	  }
    	  if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
    	   XFor = request.getHeader("HTTP_X_FORWARDED_FOR");
    	  }
    	  if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
    	   XFor = request.getRemoteAddr();
    	  }
    	  return XFor;
    }
    
    public static String getCity() throws Exception{      
    	
        // 创建 GeoLite2 数据库     
        File database = new File("D:/eclipse2019space/saonan-project/src/main/resources/city/GeoLite2-City.mmdb");     
        // 读取数据库内容   
        DatabaseReader reader = new DatabaseReader.Builder(database).build();       
        InetAddress ipAddress = InetAddress.getByName("113.87.162.56");     

        // 获取查询结果      
        CityResponse response = reader.city(ipAddress);     

        // 获取国家信息
        Country country = response.getCountry();

        // 获取省份
        Subdivision subdivision = response.getMostSpecificSubdivision();
        System.out.println(subdivision.getName());   // 'Guangxi Zhuangzu Zizhiqu'
        System.out.println(subdivision.getIsoCode()); // '45'
        System.out.println(subdivision.getNames().get("zh-CN")); // '广西壮族自治区'

        // 获取城市
        String city = response.getCity().getNames().get("zh-CN");
//        System.out.println(city.getName()); // 'Nanning'
        Postal postal = response.getPostal();
//        System.out.println(postal.getCode()); // 'null'
//        System.out.println(city.getNames().get("zh-CN")); // '南宁'
        Location location = response.getLocation();
//        System.out.println(location.getLatitude());  // 22.8167
//        System.out.println(location.getLongitude()); // 108.3167
        
        return city;

  }
}

