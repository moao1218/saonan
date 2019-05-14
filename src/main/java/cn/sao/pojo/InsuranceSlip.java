package cn.sao.pojo;

import java.io.Serializable;

public class InsuranceSlip implements Serializable {

	private Integer insureid; //投保单编号
	private String insure_name; //被保人姓名
	private String insure_card; //被保人证件号码
	private String area; //区域
	private String address; //财产标的地址
	private String relation; //与被保人关系
	private String holder_name; //投保人姓名
	private String holder_card; //投保人证件号码
	private String holder_sex; //投保人性别
	private String holder_phone; //投保人手机号码
	private String holder_email; //投保人电子邮箱
	private String insure_date; //投保日期
	private String first_auditor; //保单一审人
	private String first_status; //保单一审状态
	private String first_result; //保单一审结果
	private String second_auditor; //保单二审人
	private String second_status; //保单二审状态
	private String second_result; //保单二审结果
	private String third_auditor; //保单三审人
	private String third_status; //保单三审状态
	private String third_result; //保单三审结果
	private String scout; //勘察员
	private String scout_status; //勘察状态
	private String scout_result; //勘察结果
	private String license; //营业执照（企业）
	private String industry_code; //行业编号（企业）
	private String acreage; //营业面积（企业）
	private String firm_name; //营业名称（企业）
	private String premium; //保费
	private String pol_property; //投保性质
	private String del_status; //逻辑删除
	private String yuliu1; //预留字段1
	private String yuliu2; //预留字段2
	public Integer getInsureid() {
		return insureid;
	}
	public void setInsureid(Integer insureid) {
		this.insureid = insureid;
	}
	public String getInsure_name() {
		return insure_name;
	}
	public void setInsure_name(String insure_name) {
		this.insure_name = insure_name;
	}
	public String getInsure_card() {
		return insure_card;
	}
	public void setInsure_card(String insure_card) {
		this.insure_card = insure_card;
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
	public String getInsure_date() {
		return insure_date;
	}
	public void setInsure_date(String insure_date) {
		this.insure_date = insure_date;
	}
	public String getFirst_auditor() {
		return first_auditor;
	}
	public void setFirst_auditor(String first_auditor) {
		this.first_auditor = first_auditor;
	}
	public String getFirst_status() {
		return first_status;
	}
	public void setFirst_status(String first_status) {
		this.first_status = first_status;
	}
	public String getFirst_result() {
		return first_result;
	}
	public void setFirst_result(String first_result) {
		this.first_result = first_result;
	}
	public String getSecond_auditor() {
		return second_auditor;
	}
	public void setSecond_auditor(String second_auditor) {
		this.second_auditor = second_auditor;
	}
	public String getSecond_status() {
		return second_status;
	}
	public void setSecond_status(String second_status) {
		this.second_status = second_status;
	}
	public String getSecond_result() {
		return second_result;
	}
	public void setSecond_result(String second_result) {
		this.second_result = second_result;
	}
	public String getThird_auditor() {
		return third_auditor;
	}
	public void setThird_auditor(String third_auditor) {
		this.third_auditor = third_auditor;
	}
	public String getThird_status() {
		return third_status;
	}
	public void setThird_status(String third_status) {
		this.third_status = third_status;
	}
	public String getThird_result() {
		return third_result;
	}
	public void setThird_result(String third_result) {
		this.third_result = third_result;
	}
	public String getScout() {
		return scout;
	}
	public void setScout(String scout) {
		this.scout = scout;
	}
	public String getScout_status() {
		return scout_status;
	}
	public void setScout_status(String scout_status) {
		this.scout_status = scout_status;
	}
	public String getScout_result() {
		return scout_result;
	}
	public void setScout_result(String scout_result) {
		this.scout_result = scout_result;
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
