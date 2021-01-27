package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuInfoRealJson
{
	@JsonProperty("menu_id") private String menuId;
	@JsonProperty("disp_order") private String disp_order;
	@JsonProperty("p_menu_id") private String pMenuId;
	@JsonProperty("menu_name") private String menuName;
	@JsonProperty("icon") private String icon;
	@JsonProperty("menu_desc") private String menuDesc;

	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getDisporder() {
		return disp_order;
	}
	public void setDisporder(String disp_order) {
		this.disp_order = disp_order;
	}

	public String getPmenuid() {
		return pMenuId;
	}
	public void setPmenuid(String pMenuId) {
		this.pMenuId = pMenuId;
	}
	
	//
	public String getMenuname() {
		return menuName;
	}
	public void setMenuname(String menuName) {
		this.menuName = menuName;
	}
	//
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getMenudesc() {
		return menuDesc;
	}
	public void setMenudesc(String menuDesc) {
		this.menuDesc = menuDesc;
	}
}
