package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuInfoRealJson
{
	@JsonProperty("menu_id") private String menuid;
	@JsonProperty("disp_order") private String disporder;
	@JsonProperty("p_menu_id") private String pmenuId;
	@JsonProperty("menu_name") private String menuname;
	@JsonProperty("icon") private String icon;
	@JsonProperty("menu_desc") private String menuDesc;
	@JsonProperty("menu_title") private String menuTitle;
	@JsonProperty("locale") private String locale;

	public String getMenuTitle() {
		return menuTitle;
	}
	public void setMenuTitle(String menuTitle) {
		this.menuTitle = menuTitle;
	}
	public String getLocale() {
		return locale;
	}
	public void setLocale(String locale) {
		this.locale = locale;
	}
	public String getMenuId() {
		return menuid;
	}
	public void setMenuId(String menuid) {
		this.menuid = menuid;
	}
	public String getDisporder() {
		return disporder;
	}
	public void setDisporder(String disporder) {
		this.disporder = disporder;
	}

	public String getPmenuid() {
		return pmenuId;
	}
	public void setPmenuid(String pmenuId) {
		this.pmenuId = pmenuId;
	}
	
	//
	public String getMenuname() {
		return menuname;
	}
	public void setMenuname(String menuname) {
		this.menuname = menuname;
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
