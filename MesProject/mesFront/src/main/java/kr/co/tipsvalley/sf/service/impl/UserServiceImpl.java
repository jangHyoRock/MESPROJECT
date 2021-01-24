package kr.co.tipsvalley.sf.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.tipsvalley.sf.model.json.UserMenu;
import kr.co.tipsvalley.sf.service.UserService;

/*
 * User management service.
 */
@Service
public class UserServiceImpl implements UserService {

	public List<UserMenu> getUserMenuList() {
		List<UserMenu> userMenuList = new ArrayList<UserMenu>();
		
		UserMenu userMenu1 = new UserMenu();
		userMenu1.setMenuId("Contents1");
		userMenu1.setMenuName("Product");
		userMenu1.setIcon("sap-icon://product");
		
		List<UserMenu> subMenuList = new ArrayList<UserMenu>();
		
		UserMenu subMenu1 = new UserMenu();
		subMenu1.setMenuId("Contents1");
		subMenu1.setMenuName("Sub Item 1");
		subMenuList.add(subMenu1);
		UserMenu subMenu2 = new UserMenu();
		subMenu2.setMenuId("product2");
		subMenu2.setMenuName("Sub Item 2");
		subMenuList.add(subMenu2);
		
		userMenu1.setSubMenuList(subMenuList);
		
		userMenuList.add(userMenu1);
		
		UserMenu userMenu = new UserMenu();
		userMenu.setMenuId("Contents2");
		userMenu.setMenuName("Factory");
		userMenu1.setIcon("sap-icon://factory");
		userMenuList.add(userMenu);
		
		UserMenu userMenu2 = new UserMenu();
		userMenu2.setMenuId("Contents3");
		userMenu2.setMenuName("Configuration");
		userMenu1.setIcon("sap-icon://action-settings");
		userMenuList.add(userMenu2);

		return userMenuList;
	}
	
}