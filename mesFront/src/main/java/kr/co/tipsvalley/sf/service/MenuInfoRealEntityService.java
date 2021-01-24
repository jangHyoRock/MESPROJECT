package kr.co.tipsvalley.sf.service;

import java.security.InvalidParameterException;

import kr.co.tipsvalley.sf.model.json.MenuInfoRealJsonList;

public interface MenuInfoRealEntityService {
	public MenuInfoRealJsonList findKhaiValueInfoRealEntity() throws InvalidParameterException;
}
