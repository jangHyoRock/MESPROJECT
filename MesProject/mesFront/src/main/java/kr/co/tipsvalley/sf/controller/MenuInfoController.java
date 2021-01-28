package kr.co.tipsvalley.sf.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.httpEntity.RestResponseEntity;
import kr.co.tipsvalley.sf.model.json.MenuListJson;
import kr.co.tipsvalley.sf.model.json.MenuTitleValueJsonList;
import kr.co.tipsvalley.sf.service.MenuInfoRealEntityService;
import kr.co.tipsvalley.sf.service.MenuTitleValueEntityService;

/*
 * Controller that manages user information.
 */
@RestController
@RequestMapping("/user")
public class MenuInfoController {
	
	static final Logger logger = LoggerFactory.getLogger(MenuInfoController.class);
	
	@Autowired
	private MenuInfoRealEntityService menuInfoRealEntityService;
	
	@Autowired
	private MenuTitleValueEntityService menuTitleValueEntityService;
	
	@GetMapping("/menu/info")
	 public RestResponseEntity<MenuListJson> findmenuAll()
    {
        RestResponseEntity<MenuListJson> result = null;
        
        result = new RestResponseEntity<MenuListJson>(this.menuInfoRealEntityService.findMenuInfoValueEntity());
        
        return result;
    }
	
	/*
	 * @GetMapping("/locale")
	 * 
	 * @ResponseBody public RestResponseEntity<MenuTitleValueJsonList>
	 * findMenuDesc(@RequestParam String locale) {
	 * RestResponseEntity<MenuTitleValueJsonList> MenuTitle = null;
	 * 
	 * MenuTitle = new
	 * RestResponseEntity<MenuTitleValueJsonList>(this.menuTitleValueEntityService.
	 * menuTitleValueEntity(locale));
	 * 
	 * return MenuTitle; }
	 */

}