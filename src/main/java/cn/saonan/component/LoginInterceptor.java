package cn.saonan.component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Object user = request.getSession().getAttribute("user");
		if(user == null) {
			request.setAttribute("msg", "没有权限请登录！");
			request.getRequestDispatcher("/index.html").forward(request, response);
			return false;
		}else {
			return true;
		}
	}
}
