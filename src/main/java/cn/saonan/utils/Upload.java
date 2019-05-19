package cn.saonan.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

public class Upload {

	public static String upload(HttpServletRequest request,MultipartFile pic) {
		OutputStream os = null;
		String ul ="";
		try {
//			String realpath = request.getSession().getServletContext().getRealPath("/upload");
//			System.out.println("realpath:="+realpath);
			String realpath = "C:\\Users\\ThinkPad\\git\\saonan\\src\\main\\resources\\static\\upload";
			String oldname = pic.getOriginalFilename();
			System.out.println("oldname:"+oldname);
			String endname = oldname.substring(oldname.lastIndexOf("."));
			String uuid = UUID.randomUUID().toString();
			File file = new File(realpath + "/" + uuid + endname);
			os = new FileOutputStream(file);
			
			ul = "upload/" + uuid + endname;
			FileCopyUtils.copy(pic.getInputStream(), os);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return ul;
	}
}
