package cn.saonan.pojo;

import java.io.Serializable;

public class Items implements Serializable {

	private Integer itemid; 
	private String item_name;
	private String deductible; 
	private String excess;
	private String dep_rate; 
	private String industry;
	private String site_photo; 
	private String third_pic; 
	private String item_age; 
	private String invoice_pic; 
	private String invoice; 
	private String mark; 
	private String pmodel; 
	private String del_status;
	public Integer getItemid() {
		return itemid;
	}
	public void setItemid(Integer itemid) {
		this.itemid = itemid;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getDeductible() {
		return deductible;
	}
	public void setDeductible(String deductible) {
		this.deductible = deductible;
	}
	public String getExcess() {
		return excess;
	}
	public void setExcess(String excess) {
		this.excess = excess;
	}
	public String getDep_rate() {
		return dep_rate;
	}
	public void setDep_rate(String dep_rate) {
		this.dep_rate = dep_rate;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public String getSite_photo() {
		return site_photo;
	}
	public void setSite_photo(String site_photo) {
		this.site_photo = site_photo;
	}
	public String getThird_pic() {
		return third_pic;
	}
	public void setThird_pic(String third_pic) {
		this.third_pic = third_pic;
	}
	public String getItem_age() {
		return item_age;
	}
	public void setItem_age(String item_age) {
		this.item_age = item_age;
	}
	public String getInvoice_pic() {
		return invoice_pic;
	}
	public void setInvoice_pic(String invoice_pic) {
		this.invoice_pic = invoice_pic;
	}
	public String getInvoice() {
		return invoice;
	}
	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getPmodel() {
		return pmodel;
	}
	public void setPmodel(String pmodel) {
		this.pmodel = pmodel;
	}
	public String getDel_status() {
		return del_status;
	}
	public void setDel_status(String del_status) {
		this.del_status = del_status;
	} 
	
}
