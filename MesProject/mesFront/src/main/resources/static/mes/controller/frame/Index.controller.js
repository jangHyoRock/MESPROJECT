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
			var oResult = oModel.getData();
			var _self = this;
			var oRouter = this.getRouter();
			
			
			var index =0;
			var _rootView ="";
			var _menuId ="";
			
			
			for(var i=0;i<oResult.length;i++){
			
				if(oResult[i].pmenuid =="Main"){
				
					var _rootView = _self.getOwnerComponent().getAggregation("rootControl").getId();
					 _menuId = Formatter.formatFirstLowerCase(oResult[i].menuId);
					
					oRouter.getTargets().addTarget(_menuId, {viewName: oResult[i].menu_id, viewLevel: index+i, viewId: _menuId, rootView: _rootView});
					oRouter.addRoute({name: _menuId, pattern: _menuId, target: _menuId});
				
				}else if(oResult[i].pmenuid !="Main"){

					var _subMenuId = _menuId + "." + oResult[i].menuId;
					
					oRouter.getTargets().addTarget(oResult[i].menuId, {viewName: _subMenuId, viewLevel: index+i, viewId: oResult[i].menuId, rootView: _rootView});
					oRouter.addRoute({name: _subMenuId, pattern: _menuId + "/" + oResult[i].menuId, target: oResult[i].menuId});
				}
			}
						
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