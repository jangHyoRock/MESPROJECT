package kr.co.tipsvalley.sf.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.model.MenuKhaiValueInfoReal;
import kr.co.tipsvalley.sf.repository.MenuInfoRealEntityRepository;

/*
 * Controller that manages user information.
 */
@RestController
@RequestMapping("/user")
public class MenuInfoController {
	
	static final Logger logger = LoggerFactory.getLogger(MenuInfoController.class);
	
	@Autowired
	private MenuInfoRealEntityRepository menuInfoRealEntityRepository;
	
	@GetMapping("/menu/info")
	public List<MenuKhaiValueInfoReal> list() {
		
		return menuInfoRealEntityRepository.findmenuAll();
	}

}