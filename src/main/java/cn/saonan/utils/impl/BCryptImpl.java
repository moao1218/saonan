package cn.saonan.utils.impl;

import org.mindrot.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import cn.saonan.utils.BCryptInterface;
@Component
public class BCryptImpl implements BCryptInterface {
	/**加密
	 * original:原密码
	 * salt：盐
	 */
	@Override
	public String getCode(String original, Integer salt) {
		String Code=BCrypt.hashpw(original, BCrypt.gensalt(salt));
		return Code;
	}
	/**匹配
	 * testCode：需要确认的密码（明文）
	 * Code：原密码（密文）
	 */
	@Override
	public boolean checkMatch(String testCode, String Code) {
		boolean checkpw = BCrypt.checkpw(testCode, Code);
		return checkpw;
	}

}
