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
		
		_onObjectMatched: function (e) {
			e.getParameter("view").getController().onActive();
			this._onSetTitleDesc();
		},

		
		// View의 Title과 Description 설정
		_onSetTitleDesc: function () {
			var oCurrentPage = this.getRouter().getHashChanger().hash;
			
			if(oCurrentPage == "") {
				var _oData = {
					title : this.getResourceBundle().getText("mainTitle"),
					desc : this.getResourceBundle().getText("mainDescription")
				}
				this.getModel("viewTitleDesc").setData(_oData);
				
				return false;				
			}
			oCurrentPage = oCurrentPage.replace("/", ".");

			var _title = "";
			var _desc = "";
			var _len = window.index.menuList.length;
			for (var i = 0; i < _len; i++) {
				var oMenuInfo = window.index.menuList[i];
				var _menuId = oMenuInfo.menu_id;
				var _menuIdLC = Formatter.formatFirstLowerCase(_menuId);
				
				if(oMenuInfo.sub_menu) {
					oMenuInfo.sub_menu.forEach(function(item) {
						if (oCurrentPage == _menuIdLC + "." + item.menu_id) {
							_title = item.menu_title;
							_desc = item.menu_desc;
						}
					});
				} else {
					if (oCurrentPage == _menuIdLC + "." + _menuId) {
						_title = oMenuInfo.menu_title;
						_desc = oMenuInfo.menu_desc;
						break;
					}
				}
			}
			
			var _oData = {
				title : _title,
				desc : _desc
			}
			this.getModel("viewTitleDesc").setData(_oData);
		},
		
		onSetIconTabHeader: function () {
			var oMenuList = window.index.menuList;
			
			oMenuList.forEach(function(oMenuInfo) {
				if(oMenuInfo.p_menu_id == "Main"){
					//var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
					var _menuId = oMenuInfo.menu_id;
					var oIconTabFilter = new sap.m.IconTabFilter({
						id: _menuId,
						text: oMenuInfo.menu_name,
						key: _menuId + "." + oMenuInfo.menu_id
					});
					
					window.header.tab.addItem(oIconTabFilter);
				}
			});
			
		},
		
		onPressLogo: function (e) {
			this.getRouter().navTo("main");
			window.header.tab.setSelectedKey(" ");
			window.left.navi.destroyItem();
			window.left.onSetSideNavigation();
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