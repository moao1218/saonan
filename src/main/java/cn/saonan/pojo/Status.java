package cn.saonan.pojo;

import java.io.Serializable;

public class Status implements Serializable {

	private Integer statusid;
	private String status_name;
	public Integer getStatusid() {
		return statusid;
	}
	public void setStatusid(Integer statusid) {
		this.statusid = statusid;
	}
	public String getStatus_name() {
		return status_name;
	}
	public void setStatus_name(String status_name) {
		this.status_name = status_name;
	}
	
}
