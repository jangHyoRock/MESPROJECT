sap.ui.define([
	"tips/mes/controller/BaseController",
	"tips/common/util/Formatter",
	'sap/ui/model/json/JSONModel'
], function(BaseController, Formatter, JSONModel) {
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
			
			// 페이지 마다 Title, Descryption 설정
			this.setModel(new JSONModel({
				title : '',
				desc : ''
			}), "viewTitleDesc");
		},
		
		// 메뉴 목록 콜백
		callbackAjaxMenuInfo : function (oModel) {
			var oResult = oModel.getData().result.MenuList;
			var _self = this;
			var oRouter = this.getRouter();
			
			oResult.forEach(function(oMenuInfo, index) {
				var _rootView = _self.getOwnerComponent().getAggregation("rootControl").getId();
				var _menuId = oMenuInfo.menu_id;
				var _menuIdLC = Formatter.formatFirstLowerCase(oMenuInfo.menu_id);
								
				if(oMenuInfo.p_menu_id == "Main"){
					
					oRouter.getTargets().addTarget(_menuIdLC, {viewName: _menuIdLC, viewLevel: index+1, viewId: _menuIdLC, rootView: _rootView});
					oRouter.addRoute({name: _menuIdLC,pattern: _menuId, target: _menuIdLC});
				
				}else{
				
					var _pMenuId =Formatter.formatFirstLowerCase(oMenuInfo.p_menu_id);	
					var _subMenuId = _pMenuId + "." + _menuId;
					
					oRouter.getTargets().addTarget(_menuId, {viewName: _subMenuId, viewLevel: index+1, viewId: _menuId, rootView: _rootView});
					oRouter.addRoute({name: _menuId, pattern: _pMenuId + "/" + _menuId, target: _menuId});
				}
			});
			
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