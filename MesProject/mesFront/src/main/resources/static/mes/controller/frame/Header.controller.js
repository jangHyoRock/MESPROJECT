sap.ui.define([
	"tips/mes/controller/BaseController",
	"tips/common/util/Formatter"
], function(BaseController, Formatter){
    "use strict";

	return BaseController.extend("tips.mes.controller.frame.Header", {
		onInit : function () {
			console.info("tips.mes Header.js OnInit()");

			window.header = this;
			this.tab = this.byId("iconTabHeader");
			
			this.getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
		},
		/*
		_onObjectMatched: function (e) {
			e.getParameter("view").getController().onActive();
		},
		*/
		
		onSetIconTabHeader: function () {
			var oMenuList = window.index.menuList;
			
			for(var i=0;i<oMenuList.length;i++){
			
				if(oMenuList[i].pmenuid =="Main"){
				
					var _menuId = Formatter.formatFirstLowerCase(oMenuList[i].menuId);
					 
					var oIconTabFilter = new sap.m.IconTabFilter({
						id: _menuId,
						text: oMenuList[i].menuname,
						key: _menuId
					});
				
				}
			
				window.header.tab.addItem(oIconTabFilter);
			}
			
			/*
			oMenuList.forEach(function(oMenuInfo) {
				var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menuId);
				var oIconTabFilter = new sap.m.IconTabFilter({
					id: _menuId,
					text: oMenuInfo.menuname,
					key: _menuId
				});
				
				window.header.tab.addItem(oIconTabFilter);
			});
			*/			
		},
		
		onPressLogo: function (e) {
			this.getRouter().navTo("main");
			window.header.tab.setSelectedKey(" ");
			window.left.navi.destroyItem();
			window.left.onSetSideNavigation(window.index.menuList);
			window.left.navi.setSelectedKey(" ");
		},
		
		onSelectTab : function (e) {
			var key = e.getSource().getSelectedKey();
			
			window.menu = key;
			
			this.getRouter().navTo(key);
			window.left.navi.setSelectedKey(key);
			
			var arr = window.left.navi.getItem().getItems();
			for (var item in arr) {
				arr[item].setExpanded(false);
			}
		},
		
		onPressIndex: function() {
        	window.location = "/";
        }
	});
}, true);