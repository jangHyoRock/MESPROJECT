package kr.co.tipsvalley.sf.service;

import java.util.List;

import kr.co.tipsvalley.sf.model.json.UserMenu;

/*
 * User management service interface.
 */
public interface UserService {
	
	public List<UserMenu> getUserMenuList();
	
}