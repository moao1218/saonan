package cn.sao.pojo;

import java.io.Serializable;

public class Users implements Serializable {
	private Integer userid; //会员编号
	private String username; //会员账号
	private String userpwd; //会员密码
	private String realname; //真实姓名
	private String phone; //手机号码
	private String join_date; //用户创建日期
	private String bank_card; //银行卡
	private String del_status; //逻辑删除
	private String yuliu; //预留字段
	
	@Override
	public String toString() {
		return "Users [userid=" + userid + ", username=" + username + ", userpwd=" + userpwd + ", realname=" + realname
				+ ", phone=" + phone + ", join_date=" + join_date + ", bank_card=" + bank_card + ", del_status="
				+ del_status + ", yuliu=" + yuliu + "]";
	}
	public Integer getUserid() {
		return userid;
	}
	public void setUserid(Integer userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserpwd() {
		return userpwd;
	}
	public void setUserpwd(String userpwd) {
		this.userpwd = userpwd;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getJoin_date() {
		return join_date;
	}
	public void setJoin_date(String join_date) {
		this.join_date = join_date;
	}
	public String getBank_card() {
		return bank_card;
	}
	public void setBank_card(String bank_card) {
		this.bank_card = bank_card;
	}
	public String getDel_status() {
		return del_status;
	}
	public void setDel_status(String del_status) {
		this.del_status = del_status;
	}
	public String getYuliu() {
		return yuliu;
	}
	public void setYuliu(String yuliu) {
		this.yuliu = yuliu;
	}
	
}
