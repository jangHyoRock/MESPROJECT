sap.ui.define([
	"tips/mes/controller/BaseController",
	"tips/common/util/Formatter"
], function(BaseController, Formatter) {
    "use strict";
	
	return BaseController.extend("tips.mes.controller.frame.Index", {
		
		fullscreen : "",
		
		onInit : function () {
			window.index = this;
			
			console.info("tips.mes Index.js OnInit()");
					
			
			var oParam = {
				url: "/user/menu/info",
				callback: "callbackAjaxMenuInfo"
			};
			this.callAjax(oParam);
			
			this.getRouter().attachBypassed(function(oEvent) {
				var sHash = oEvent.getParameter("hash");
				jQuery.sap.log.error("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
			});
		},
		
		// 메뉴 목록 콜백
		callbackAjaxMenuInfo : function (oModel) {
		console.log("callbackAjaxMenuInfo");
			var oResult =  oModel.getData().result;
			
			var oMainMenuResult = oModel.getData().result.MenuList;
			//var oSubMenuResult = oModel.getData().result.SubMenuList;
			
			var _self = this;
			var oRouter = this.getRouter();
			
			var _menuId ="";
			var _rootView = "";;
			
			oMainMenuResult.forEach(function(oMenuInfo, index) {
				_rootView = _self.getOwnerComponent().getAggregation("rootControl").getId();
				_menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
				
				if(oMenuInfo.p_menu_id == "Main"){
					
					oRouter.getTargets().addTarget(_menuId, {viewName: _menuId, viewLevel: index+1, viewId: _menuId, rootView: _rootView});
					oRouter.addRoute({name: _menuId, pattern: _menuId, target: _menuId});
				
				}else{
					var _subMenuId = _menuId + "." + oMenuInfo.menu_id;
					oRouter.getTargets().addTarget(_subMenuId, {viewName: _menuId, viewLevel: index+1, viewId: _subMenuId, rootView: _rootView});
					oRouter.addRoute({name: oMenuInfo.menu_id, pattern: _subMenuId, target: _subMenuId});
				}
			
			});
			
			
			/*	
			oResult.forEach(function(oMenuInfo, index) {
				var _rootView = _self.getOwnerComponent().getAggregation("rootControl").getId();
				var _menuId = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
				
				oRouter.getTargets().addTarget(_menuId, {viewName: oMenuInfo.menu_id, viewLevel: index+1, viewId: _menuId, rootView: _rootView});
				oRouter.addRoute({name: _menuId, pattern: _menuId, target: _menuId});
				
				if(oMenuInfo.sub_menu) {
					oMenuInfo.sub_menu.forEach(function(item) {
						var _subMenuId = _menuId + "." + item.menu_id;
						oRouter.getTargets().addTarget(item.menu_id, {viewName: _subMenuId, viewLevel: index+1, viewId: item.menu_id, rootView: _rootView});
						oRouter.addRoute({name: _subMenuId, pattern: _menuId + "/" + item.menu_id, target: item.menu_id});
					});
				}
			});
			*/
			
			oRouter.initialize();
			
			window.index.menuList = oResult;
			window.header.onSetIconTabHeader();
			window.left.onSetSideNavigation();
			
			this.onSetCurrent();
			
		},
		
		onSetCurrent : function () {
			var oRouter = this.getRouter();
			var oCurrentPage = oRouter.getHashChanger().hash;
			
			if(oCurrentPage =="") {
				oCurrentPage = "Main"
			}
			//oRouter.navTo(oCurrentPage);
			window.header.tab.setSelectedKey(oCurrentPage);
			window.left.navi.setSelectedKey(oCurrentPage);
			
			var deviceFilter = "win16|win32|win64|macintel|mac|"
				
			if(navigator.platform) {
			    if( deviceFilter.indexOf(navigator.platform.toLowerCase())<0 ) {
			    	// "MOBILE" DEVICE TYPE + SETTING META INFO
			        var metaInfo 		= 	document.getElementsByTagName('meta').viewport;
			        metaInfo.content 	= 	"width=device-width, initial-scale=0.5, user-scalable=no";
			    } else {
			    	// "PC" 	DEVICE TYPE + SETTING META INFO
			    	/*var fullScreenArea 	= 	document.getElementById('content');
			        this.fullscreen 	= 	fullScreenArea;
			        this.layoutControll.fullscreen.requestFullscreen(); */
			    }
			}
		}
		
	});
}, true);