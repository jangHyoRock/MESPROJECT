sap.ui.define([
	"tips/mes/controller/BaseController",
	"tips/common/util/Formatter"
], function(BaseController, Formatter){
	"use strict";
	
	return BaseController.extend("tips.mes.controller.frame.Left", {
		onInit : function() {
			console.info("tips.mes Left.js OnInit()");
			window.left = this;
			
			this.navi = this.byId("sideNavigation");
		},
		
		onSetSideNavigation: function () {
			var oMenuList = window.index.menuList;
			var oNavigationList = new sap.tnt.NavigationList();
						
			var oNavigationListItem = "";
			var _menuId;
			var _menu_name;
			//this.navi.setExpanded(false);
			
			oMenuList.forEach(function(oMenuInfo) {
				
				//var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
				_menuId = oMenuInfo.menu_id;
				_menu_name = oMenuInfo.menu_name;
				
				if(oMenuInfo.p_menu_id == "Main"){
					
						oNavigationListItem = new sap.tnt.NavigationListItem({
						text: _menu_name,
						key: _menuId,
						expanded: false,
						icon: oMenuInfo.icon || 'sap-icon://product'
					});
				}else{
						oNavigationListItem.addItem(new sap.tnt.NavigationListItem({
							text: _menu_name,
							key: _menuId,
						}));
				}
				oNavigationList.addItem(oNavigationListItem);
			
			});
				window.left.navi.setItem(oNavigationList);
		},
			onCollapseExpandPress : function(e){
		console.log("onCollapseExpandPress");
		}
		,
		onPressMenu: function(e) {
			var b = e.getSource().getPressed();
			var w = "250px";
			var bg = "#2f3c48";
			
			if(!b){
				w = "50px";
				bg = "unset";
			}
			$("#"+this.getView().getId()).css("width", w);
			$("#"+this.getView().getId()).css("background", bg);
			this.navi.setExpanded(b);
		},
		
		// SideNavigation 선택
		onSelect: function(e) {
			var key = e.getSource().getSelectedKey();			
			this.getRouter().navTo(key);
			window.header.tab.setSelectedKey(key);
		}
		
	});
}, true);