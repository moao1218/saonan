package cn.saonan.pojo;

import java.io.Serializable;

public class Clerk implements Serializable {

	private Integer magid; //用户编号
	private String roleid;	//角色编号
	private String username;	//员工姓名
	private String userpwd;		//员工密码
	private String job;		//职位
	private String realname;	//真实姓名
	private String user_card;	//身份证号码
	private String email;	//邮箱
	private String sex;		//性别
	private String nation;		//名族
	private String address;		//家庭地址
	private String linkman;		//紧急联系人
	private String emergency;		//紧急联系人电话
	private String join_date;		//入职日期
	private String area;		//负责地区
	private String phone;		//员工手机号码
	private String del_status;		//逻辑删除位默认为0  逻辑删除为1
	public Integer getMagid() {
		return magid;
	}
	public void setMagid(Integer magid) {
		this.magid = magid;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
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
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getUser_card() {
		return user_card;
	}
	public void setUser_card(String user_card) {
		this.user_card = user_card;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getNation() {
		return nation;
	}
	public void setNation(String nation) {
		this.nation = nation;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLinkman() {
		return linkman;
	}
	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}
	public String getEmergency() {
		return emergency;
	}
	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}
	public String getJoin_date() {
		return join_date;
	}
	public void setJoin_date(String join_date) {
		this.join_date = join_date;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getDel_status() {
		return del_status;
	}
	public void setDel_status(String del_status) {
		this.del_status = del_status;
	}
	
	
}
