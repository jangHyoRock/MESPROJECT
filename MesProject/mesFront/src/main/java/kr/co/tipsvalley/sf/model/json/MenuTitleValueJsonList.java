package kr.co.tipsvalley.sf.model.json;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuTitleValueJsonList {
	
    private ArrayList<MenuTitleValueJson> MenuTitle;

	public ArrayList<MenuTitleValueJson> getMenuTitleList() {
		return MenuTitle;
	}

	public void setMenuTitleValueJsonList(ArrayList<MenuTitleValueJson> menuTitleValueJsonList) {
		this.MenuTitle = menuTitleValueJsonList;
	}
}
