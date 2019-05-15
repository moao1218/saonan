package cn.sao.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.sao.mapper.PolicyMapper;
import cn.sao.service.PolicyService;
@Service
public class PolicyServiceImpl implements PolicyService{
	@Autowired
	PolicyService PolicyServiceImpl;
	@Override
	public List<PolicyMapper> findPolicy() {
		return PolicyServiceImpl.findPolicy();
	}
		
}
