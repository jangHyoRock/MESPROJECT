package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuTitleValueJson
{
	@JsonProperty("menu_id") private String menuId;
	@JsonProperty("p_menu_id") private String pMenuId;
	@JsonProperty("menu_name") private String menuName;
	@JsonProperty("icon") private String icon;
	@JsonProperty("menu_desc") private String menuDesc;
	@JsonProperty("locale") private String locale;

	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getPmenuid() {
		return pMenuId;
	}
	public void setPmenuid(String pMenuId) {
		this.pMenuId = pMenuId;
	}
	public String getMenuname() {
		return menuName;
	}
	public void setMenuname(String menuName) {
		this.menuName = menuName;
	}
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
	public String getLocale() {
		return locale;
	}
	public void setLocale(String locale) {
		this.menuDesc = locale;
	}
}
