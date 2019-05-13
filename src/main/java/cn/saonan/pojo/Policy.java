package cn.saonan.pojo;

import java.io.Serializable;


/**
 * 	保单实体类
 * @author ThinkPad
 *
 */
public class Policy implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 652245561295329701L;
	
	private String policyid; 
	private String insured_name;
	private String insured_card; 
	private City city; 
	private String address; 
	private String relation; 
	private String holder_name; 
	private String holder_card; 
	private String holder_sex; 
	private String holder_phone; 
	private String holder_email; 
	private String insured_date; 
	private String license; 
	private String industry_code; 
	private String acreage; 
	private String firm_name; 
	private String premium; 
	private String pol_property; 
	private String del_status; 
	private String start_date; 
	private String end_date; 
	private String yuliu1; 
	private String yuliu2; 
	private Users users;
	public String getPolicyid() {
		return policyid;
	}
	public void setPolicyid(String policyid) {
		this.policyid = policyid;
	}
	public String getInsured_name() {
		return insured_name;
	}
	public void setInsured_name(String insured_name) {
		this.insured_name = insured_name;
	}
	public String getInsured_card() {
		return insured_card;
	}
	public void setInsured_card(String insured_card) {
		this.insured_card = insured_card;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRelation() {
		return relation;
	}
	public void setRelation(String relation) {
		this.relation = relation;
	}
	public String getHolder_name() {
		return holder_name;
	}
	public void setHolder_name(String holder_name) {
		this.holder_name = holder_name;
	}
	public String getHolder_card() {
		return holder_card;
	}
	public void setHolder_card(String holder_card) {
		this.holder_card = holder_card;
	}
	public String getHolder_sex() {
		return holder_sex;
	}
	public void setHolder_sex(String holder_sex) {
		this.holder_sex = holder_sex;
	}
	public String getHolder_phone() {
		return holder_phone;
	}
	public void setHolder_phone(String holder_phone) {
		this.holder_phone = holder_phone;
	}
	public String getHolder_email() {
		return holder_email;
	}
	public void setHolder_email(String holder_email) {
		this.holder_email = holder_email;
	}
	public String getInsured_date() {
		return insured_date;
	}
	public void setInsured_date(String insured_date) {
		this.insured_date = insured_date;
	}
	public String getLicense() {
		return license;
	}
	public void setLicense(String license) {
		this.license = license;
	}
	public String getIndustry_code() {
		return industry_code;
	}
	public void setIndustry_code(String industry_code) {
		this.industry_code = industry_code;
	}
	public String getAcreage() {
		return acreage;
	}
	public void setAcreage(String acreage) {
		this.acreage = acreage;
	}
	public String getFirm_name() {
		return firm_name;
	}
	public void setFirm_name(String firm_name) {
		this.firm_name = firm_name;
	}
	public String getPremium() {
		return premium;
	}
	public void setPremium(String premium) {
		this.premium = premium;
	}
	public String getPol_property() {
		return pol_property;
	}
	public void setPol_property(String pol_property) {
		this.pol_property = pol_property;
	}
	public String getDel_status() {
		return del_status;
	}
	public void setDel_status(String del_status) {
		this.del_status = del_status;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getYuliu1() {
		return yuliu1;
	}
	public void setYuliu1(String yuliu1) {
		this.yuliu1 = yuliu1;
	}
	public String getYuliu2() {
		return yuliu2;
	}
	public void setYuliu2(String yuliu2) {
		this.yuliu2 = yuliu2;
	}
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
	}
	

}
