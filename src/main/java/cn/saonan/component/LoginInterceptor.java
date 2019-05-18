package cn.saonan.component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		Object user = request.getSession().getAttribute("user");
		String uri = request.getRequestURI();
		String contextpath = request.getContextPath();
		String requestname = uri.substring(contextpath.length()+1);//获取当前请求的名字
		System.out.println(requestname);
		if(user == null) {
			if("/".equals(requestname)) {
				return true;
			}else {
				request.setAttribute("msg", "没有权限请登录！");
				request.getRequestDispatcher("/").forward(request, response);
				return false;
			}
		}else {
			return true;
		}
	}
}
