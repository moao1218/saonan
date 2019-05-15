package cn.saonan.utils.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;

import cn.saonan.utils.ClientSocketInterface;

public class ClientSocketImpl implements ClientSocketInterface {
	
	@Override
	public String sendAndGet(String cmd) {
		Socket socket = null;
		String backMessige = null;
		try {
			socket = new Socket("localhost", 8888);

			String reply = cmd;
			OutputStream os = socket.getOutputStream();
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(os));
			bw.write(reply);
			bw.newLine();
			bw.flush();
			
			InputStream is = socket.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			backMessige = br.readLine();
			System.out.println("�ͻ��˵õ���������"+backMessige);
			
			
			socket.close(); 
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return backMessige;
	}

}
