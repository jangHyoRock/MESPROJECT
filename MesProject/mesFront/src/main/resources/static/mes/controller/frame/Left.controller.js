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
			
			for(var i=0;i<oMenuList.length;i++){
			
				if(oMenuList[i].pmenuid =="Main"){
				
					var _menuId = Formatter.formatFirstLowerCase(oMenuList[i].menuId);
					 
					var oNavigationListItem = new sap.tnt.NavigationListItem({
						text: oMenuList[i].menuname,
						key: _menuId,
						expanded: false,
						icon: oMenuList[i].icon || 'sap-icon://product'
					});
				
				}else if(oMenuList[i].pmenuid !="Main"){
	
					oNavigationListItem.addItem(new sap.tnt.NavigationListItem({
							text: oMenuList[i].menuname,
							key:  _menuId
						}));
				}
				
				oNavigationList.addItem(oNavigationListItem);
			
			}
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