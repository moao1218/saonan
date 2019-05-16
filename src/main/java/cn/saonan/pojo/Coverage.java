package cn.saonan.pojo;

import java.io.Serializable;

public class Coverage implements Serializable {

	private Integer coverageid;
	private String coverage_name;
	private String coverage_rate;
	private String upper_limit;
	private String lower_limit;
	private String del_status;
	public Integer getCoverageid() {
		return coverageid;
	}
	public void setCoverageid(Integer coverageid) {
		this.coverageid = coverageid;
	}
	public String getCoverage_name() {
		return coverage_name;
	}
	public void setCoverage_name(String coverage_name) {
		this.coverage_name = coverage_name;
	}
	public String getCoverage_rate() {
		return coverage_rate;
	}
	public void setCoverage_rate(String coverage_rate) {
		this.coverage_rate = coverage_rate;
	}
	public String getUpper_limit() {
		return upper_limit;
	}
	public void setUpper_limit(String upper_limit) {
		this.upper_limit = upper_limit;
	}
	public String getLower_limit() {
		return lower_limit;
	}
	public void setLower_limit(String lower_limit) {
		this.lower_limit = lower_limit;
	}
	public String getDel_status() {
		return del_status;
	}
	public void setDel_status(String del_status) {
		this.del_status = del_status;
	}

	
}
