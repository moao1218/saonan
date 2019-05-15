package cn.sao.pojo;

import java.io.Serializable;

public class Province implements Serializable{
	private Integer sid;
	private HatCity city;
	private String province;
	public Integer getSid() {
		return sid;
	}
	public void setSid(Integer sid) {
		this.sid = sid;
	}
	
	public HatCity getCity() {
		return city;
	}
	public void setCity(HatCity city) {
		this.city = city;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	
}
