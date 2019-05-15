package cn.sao.service;

import java.util.List;

import cn.sao.mapper.PolicyMapper;

public interface PolicyService {
	public List<PolicyMapper> findPolicy();//查询保单数据
}
