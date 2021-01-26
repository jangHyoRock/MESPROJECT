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
		callbackAjaxLeftMenuInfo : function(){
		
			console.log("finish");
		},
		
		onSetSideNavigation: function () {
			var oMenuList = window.index.menuList;
			var oNavigationList = new sap.tnt.NavigationList();
					
			var oMenuInfo = oMenuList.MenuList;
			var mainIndex = oMenuInfo.length;
			
			var oSubMenu = oMenuList.SubMenuList;
			var subIndex = oSubMenu.length;
			
			var aaa = "";
			
			for(var i=0; i<mainIndex;i++){
					
						aaa = oMenuInfo[i].menuId;
					var _menuId = Formatter.formatFirstLowerCase(oMenuInfo[i].menuId);
					
					var oNavigationListItem = new sap.tnt.NavigationListItem({
						text: oMenuInfo[i].menuname,
						key: _menuId,
						expanded: false,
						icon: oMenuInfo[i].icon || 'sap-icon://product'
					});
			if(oSubMenu[i].pmenuid == aaa  ){
				
					for(var z=0; z<subIndex;z++){
				
						oNavigationListItem.addItem(new sap.tnt.NavigationListItem({
								text: oSubMenu[z].menuname,
								key: oSubMenu[z].menuid
							}));
					}
				
				}
				oNavigationList.addItem(oNavigationListItem);
			}
			
			
			/*
			oMenuList.forEach(function(oMenuInfo) {
				var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
				var oNavigationListItem = new sap.tnt.NavigationListItem({
					text: oMenuInfo.menu_name,
					key: _menuId,
					expanded: false,
					icon: oMenuInfo.icon || 'sap-icon://product'
				});
				
				if(oMenuInfo.sub_menu) {
					oMenuInfo.sub_menu.forEach(function(item) {
						oNavigationListItem.addItem(new sap.tnt.NavigationListItem({
							text: item.menu_name,
							key: item.menu_id
						}));
					});
				}
				
				oNavigationList.addItem(oNavigationListItem);
			});
			*/
			
			window.left.navi.setItem(oNavigationList);
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
			window.header.tab.setSelectedKey(key);
		}
		
	});
}, true);