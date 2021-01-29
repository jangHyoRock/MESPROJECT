package kr.co.tipsvalley.sf.controller;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.httpEntity.Contents9_table;
import kr.co.tipsvalley.sf.repository.Contents9_tableRepository;
import kr.co.tipsvalley.sf.service.Contents9_tableService;


@RestController
@RequestMapping("/test")
public class Contents9_tableController {

	
	
	@Autowired
	private Contents9_tableRepository boardRepository2;
	
	@Autowired
	private Contents9_tableService boardservice;
	
	
	@RequestMapping("/xml2")
	public List<Contents9_table> getDBList2(){
		
		System.out.println("DB¿¬µ¿");
		List<Contents9_table> list = boardRepository2.findAll();
		
		Collections.sort(list, new Comparator<Contents9_table>() {
			@Override
			public int compare(Contents9_table o1, Contents9_table o2) {
				int test1=o1.getNum1();
				int test2 = o2.getNum1();
				if(test1 > test2) {
					return 1;
				}else {
					return -1;
				}
				
			}
			
		});
		return list;
	}
	
	@RequestMapping("/update")
	public Contents9_table getUpdate(@RequestBody Contents9_table param){
		
		return boardservice.Save(param);
	}
	
	@RequestMapping("/insert")
	public Contents9_table getInsert(@RequestBody Contents9_table param) {
		
		
		return boardservice.Save(param);
	}
	
	
	@RequestMapping("/delete")
	public void getDelete(@RequestBody Contents9_table param) {
		
		boardservice.delete(param.getNum1());
		
	}
}
