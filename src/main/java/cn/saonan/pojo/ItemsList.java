package cn.saonan.pojo;

import java.io.Serializable;

public class ItemsList implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2674377611509966104L;
	
	private Integer itemid; 
	private String item_name;
	private String deductible; //
	private String excess;//
	private String dep_rate;// 
	private String industry;//
	private String del_status; 
	private String yuliu;
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
