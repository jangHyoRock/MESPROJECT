package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MenuInfoRealJson
{
	public String getMenuid() {
		return menu_id;
	}
	public void setMenuid(String menuid) {
		this.menu_id = menuid;
	}
	@JsonProperty("id") private Long id;
	@JsonProperty("menu_id") private String menu_id;
	@JsonProperty("disp_order") private String disporder;
	@JsonProperty("p_menu_id") private String pmenuid;
	@JsonProperty("menu_name") private String menuname;
	@JsonProperty("icon") private String icon;
	@JsonProperty("menu_desc") private String menudesc;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getMenuId() {
		return menu_id;
	}
	public void setMenuId(String menuid) {
		this.menu_id = menuid;
	}
	public String getDisporder() {
		return disporder;
	}
	public void setDisporder(String disporder) {
		this.disporder = disporder;
	}

	public String getPmenuid() {
		return pmenuid;
	}
	public void setPmenuid(String pmenuid) {
		this.pmenuid = pmenuid;
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
		return menudesc;
	}
	public void setMenudesc(String menudesc) {
		this.menudesc = menudesc;
	}
}
