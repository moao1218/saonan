package cn.sao.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.sao.mapper.CoverageMapper;
import cn.sao.pojo.Coverage;
import cn.sao.service.CoverageService;
@Service
public class CoverageServiceImpl implements CoverageService{
	
	@Autowired
	CoverageMapper coverageMapper;
	@Override
	public List<Coverage> findConverage() {
		return coverageMapper.findConverage();
	}

}
