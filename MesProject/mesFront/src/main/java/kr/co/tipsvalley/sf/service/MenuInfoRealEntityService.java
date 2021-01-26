package kr.co.tipsvalley.sf.service;

import java.security.InvalidParameterException;

import kr.co.tipsvalley.sf.model.json.MenuListJson;

public interface MenuInfoRealEntityService {
	public MenuListJson findMenuInfoValueEntity() throws InvalidParameterException;
}
