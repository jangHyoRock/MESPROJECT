package kr.co.tipsvalley.sf.model.json;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuInfoRealJsonList {
    @JsonProperty("list")
    private ArrayList<MenuInfoRealJson> menuInfoRealJsonList;

	public ArrayList<MenuInfoRealJson> getMeasureInfoRealJsonList() {
		return menuInfoRealJsonList;
	}

	public void setMenuInfoRealJsonList(ArrayList<MenuInfoRealJson> menuInfoRealJsonList) {
		this.menuInfoRealJsonList = menuInfoRealJsonList;
	}	
    
}
