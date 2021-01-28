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
			
			oMenuList.forEach(function(oMenuInfo) {
				
				//var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
				var _menuId = oMenuInfo.menu_id;
				
				if(oMenuInfo.p_menu_id == "Main"){
					
						oNavigationListItem = new sap.tnt.NavigationListItem({
						text: oMenuInfo.menu_name,
						key: _menuId,
						expanded: false,
						icon: oMenuInfo.icon || 'sap-icon://product'
					});
				
				}else{
					//oMenuList.forEach(function(item) {
						oNavigationListItem.addItem(new sap.tnt.NavigationListItem({
							text: oMenuInfo.menu_name,
							key: oMenuInfo.menu_id
						}));
					//});
				}
				oNavigationList.addItem(oNavigationListItem);
			
			});
				window.left.navi.setItem(oNavigationList);
			
			/*
			oMenuList.forEach(function(oMenuInfo) {
				var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
				var oNavigationListItem = new sap.tnt.NavigationListItem({
					text: oMenuInfo.menu_name,
					key: _menuId + "." + oMenuInfo.menu_id,
					expanded: false,
					icon: oMenuInfo.icon || 'sap-icon://product'
				});
				
				if(oMenuInfo.sub_menu) {
					oMenuInfo.sub_menu.forEach(function(item) {
						oNavigationListItem.addItem(new sap.tnt.NavigationListItem({
							text: item.menu_name,
							key: _menuId + "." + item.menu_id
						}));
					});
				}
				
				oNavigationList.addItem(oNavigationListItem);
			});
			
			
			window.left.navi.setItem(oNavigationList);
			*/
		},
		
		onPressMenu: function(e) {
			var b = e.getSource().getPressed();
			var w = "200px";
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
			
			//var pMenuId = key.substring(0, key.indexOf("."));
			window.header.tab.setSelectedKey(key);
		}
		
	});
}, true);