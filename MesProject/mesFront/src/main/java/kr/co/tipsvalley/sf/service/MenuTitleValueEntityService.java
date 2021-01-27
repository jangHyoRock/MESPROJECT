package kr.co.tipsvalley.sf.service;

import java.security.InvalidParameterException;

import kr.co.tipsvalley.sf.model.json.MenuTitleValueJsonList;

public interface MenuTitleValueEntityService {
	public MenuTitleValueJsonList menuTitleValueEntity(String local) throws InvalidParameterException;
}
