package kr.co.tipsvalley.sf.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.httpEntity.RestResponseEntity;
import kr.co.tipsvalley.sf.model.json.MenuListJson;
import kr.co.tipsvalley.sf.service.MenuInfoRealEntityService;

/*
 * Controller that manages user information.
 */
@RestController
@RequestMapping("/user")
public class UserController {

	static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private MenuInfoRealEntityService menuInfoRealEntityService;
	//private UserService userService;
	
	@GetMapping("/menu/info")
	public RestResponseEntity<MenuListJson> findmenuAll()
    {
        RestResponseEntity<MenuListJson> result = null;
        
        result = new RestResponseEntity<MenuListJson>(this.menuInfoRealEntityService.findMenuInfoValueEntity());
        
        return result;
    }	
	/*
	@GetMapping("/menu/info")
	public RestResponseEntityList<UserMenu> getUserMenuInfo() {
		RestResponseEntityList<UserMenu> result;
		try {
			result = new RestResponseEntityList<UserMenu>(userService.getUserMenuList());
		} catch (Exception e) {
			result = new RestResponseEntityList<UserMenu>(e);
		}

		return result;
	}
	 */
}