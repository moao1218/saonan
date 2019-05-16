package cn.saonan.utils.impl;

import org.mindrot.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import cn.saonan.utils.BCryptInterface;
@Component
public class BCryptImpl implements BCryptInterface {
	/**����
	 * original:ԭ����
	 * salt����
	 */
	@Override
	public String getCode(String original, Integer salt) {
		String Code=BCrypt.hashpw(original, BCrypt.gensalt(salt));
		return Code;
	}
	/**ƥ��
	 * testCode����Ҫȷ�ϵ����루���ģ�
	 * Code��ԭ���루���ģ�
	 */
	@Override
	public boolean checkMatch(String testCode, String Code) {
		boolean checkpw = BCrypt.checkpw(testCode, Code);
		return checkpw;
	}

}
