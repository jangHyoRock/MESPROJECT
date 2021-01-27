package kr.co.tipsvalley.sf.model.json;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuListJson {
    @JsonProperty("MenuList")
    private ArrayList<MenuInfoRealJson> MenuList;

	public ArrayList<MenuInfoRealJson> getMenuList() {
		return MenuList;
	}

	public void setMenuInfoRealJsonList(ArrayList<MenuInfoRealJson> menuInfoRealJsonList) {
		this.MenuList = menuInfoRealJsonList;
	}
	/*
	@JsonProperty("SubMenuList")
	private ArrayList<MenuInfoRealJson> MenuList1;

	public ArrayList<MenuInfoRealJson> getMenuList1() {
			return MenuList1;
	}

	public void setMenuInfoRealJsonList1(ArrayList<MenuInfoRealJson> menuInfoRealJsonList) {
		this.MenuList1 = menuInfoRealJsonList;
	}
	*/
    
}
