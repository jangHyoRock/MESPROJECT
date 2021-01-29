package kr.co.tipsvalley.sf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.httpEntity.UserMgmt;
import kr.co.tipsvalley.sf.repository.UserMgmtRepository;
import kr.co.tipsvalley.sf.service.UserMgmtService;

@RestController
@RequestMapping("/usermanage")
public class UserMgmtController {

	@Autowired
	private UserMgmtRepository userRepository;
	
	@Autowired
	private UserMgmtService userservice;
	
	@RequestMapping("/insert")
	public UserMgmt getInsert(@RequestBody UserMgmt param) {
		
		
		return userservice.Save(param);
	}
	
}
