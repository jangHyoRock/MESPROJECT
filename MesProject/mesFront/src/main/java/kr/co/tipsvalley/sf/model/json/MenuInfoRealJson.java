package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuInfoRealJson
{
	@JsonProperty("menu_id") private String menu_id;
	@JsonProperty("disp_order") private String disp_order;
	@JsonProperty("p_menu_id") private String p_menu_id;
	@JsonProperty("menu_name") private String menu_name;
	@JsonProperty("icon") private String icon;
	@JsonProperty("menu_desc") private String menu_desc;

	public String getMenuId() {
		return menu_id;
	}
	public void setMenuId(String menuid) {
		this.menu_id = menuid;
	}
	public String getDisporder() {
		return disp_order;
	}
	public void setDisporder(String disporder) {
		this.disp_order = disporder;
	}

	public String getPmenuid() {
		return p_menu_id;
	}
	public void setPmenuid(String pmenuid) {
		this.p_menu_id = pmenuid;
	}
	
	//
	public String getMenuname() {
		return menu_name;
	}
	public void setMenuname(String menuname) {
		this.menu_name = menuname;
	}
	//
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getMenudesc() {
		return menu_desc;
	}
	public void setMenudesc(String menudesc) {
		this.menu_desc = menudesc;
	}
}
