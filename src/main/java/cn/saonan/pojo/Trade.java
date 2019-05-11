package cn.saonan.pojo;

import java.io.Serializable;

public class Trade implements Serializable {

	private String industrycode;
	private String industryname;
	private String industrystate;
	private String parentid;
	public String getIndustrycode() {
		return industrycode;
	}
	public void setIndustrycode(String industrycode) {
		this.industrycode = industrycode;
	}
	public String getIndustryname() {
		return industryname;
	}
	public void setIndustryname(String industryname) {
		this.industryname = industryname;
	}
	public String getIndustrystate() {
		return industrystate;
	}
	public void setIndustrystate(String industrystate) {
		this.industrystate = industrystate;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	
	
}
