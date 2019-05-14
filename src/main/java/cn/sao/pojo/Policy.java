package cn.sao.pojo;

import java.io.Serializable;

public class Policy implements Serializable {

	private Integer policyid; //保单编号
	private String insured_name; //被保人姓名
	private String insured_card; //被保人证件号码
	private String area; //区域
	private String address; //财产标的地址
	private String relation; //与被保人关系
	private String holder_name; //投保人姓名
	private String holder_card; //投保人证件号码
	private String holder_sex; //投保人性别
	private String holder_phone; //投保人手机号码
	private String holder_email; //投保人电子邮箱
	private String insured_date; //投保日期
	private String license; //营业执照（企业）
	private String industry_code; //行业编号（企业）
	private String acreage; //营业面积（企业）
	private String firm_name; //企业名称（企业）
	private String premium; //保费
	private String pol_property; //投保性质
	private String del_status; //逻辑删除
	private String start_date; //保单起始日期
	private String end_date; //保单终止日期
	private String yuliu1; //预留字段1
	private String yuliu2; //预留字段2
	public Integer getPolicyid() {
		return policyid;
	}
	public void setPolicyid(Integer policyid) {
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
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
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
	
}
