package cn.saonan.pojo;

import java.io.Serializable;

public class City implements Serializable {

	private String code;
	private String country_code;
	private String region_name_e;
	private String region_name_c;
	private String rlevel;
	private String ipper_region;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCountry_code() {
		return country_code;
	}
	public void setCountry_code(String country_code) {
		this.country_code = country_code;
	}
	public String getRegion_name_e() {
		return region_name_e;
	}
	public void setRegion_name_e(String region_name_e) {
		this.region_name_e = region_name_e;
	}
	public String getRegion_name_c() {
		return region_name_c;
	}
	public void setRegion_name_c(String region_name_c) {
		this.region_name_c = region_name_c;
	}
	public String getRlevel() {
		return rlevel;
	}
	public void setRlevel(String rlevel) {
		this.rlevel = rlevel;
	}
	public String getIpper_region() {
		return ipper_region;
	}
	public void setIpper_region(String ipper_region) {
		this.ipper_region = ipper_region;
	}
	
	
}
