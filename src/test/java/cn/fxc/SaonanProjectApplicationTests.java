package cn.fxc;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import cn.saonan.mapper.PolicyVerifyMapper;
import cn.saonan.pojo.PolicyVerify;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SaonanProjectApplicationTests {
	
	@Autowired
	private PolicyVerifyMapper pvm;

	@Test
	public void contextLoads() {
		
		List<PolicyVerify> list = pvm.findPolicyVerifyByPolicyId("15574513464802077972");
		String pol_ver_id = list.get(0).getPol_ver_id();
		System.out.println(pol_ver_id);
		
	}

}
