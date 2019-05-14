package cn.saonan.pojo;

import java.io.Serializable;

public class BlackList implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8360661089548921138L;
	
	private String userid;
	private String blname; 
	private String l_card; 
	private String operator_user; 
	private String black_description; 
	private String del_status;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getBlname() {
		return blname;
	}
	public void setBlname(String blname) {
		this.blname = blname;
	}
	public String getL_card() {
		return l_card;
	}
	public void setL_card(String l_card) {
		this.l_card = l_card;
	}
	public String getOperator_user() {
		return operator_user;
	}
	public void setOperator_user(String operator_user) {
		this.operator_user = operator_user;
	}
	public String getBlack_description() {
		return black_description;
	}
	public void setBlack_description(String black_description) {
		this.black_description = black_description;
	}
	public String getDel_status() {
		return del_status;
	}
	public void setDel_status(String del_status) {
		this.del_status = del_status;
	}
	

}
