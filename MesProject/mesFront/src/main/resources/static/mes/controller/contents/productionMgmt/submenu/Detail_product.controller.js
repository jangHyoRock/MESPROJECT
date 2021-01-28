sap.ui.define([
    "tips/mes/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
], function (Controller, History, JSONModel, UIComponent) {
    "use strict";
    return Controller.extend("tips.mes.controller.contents.producionMgmt.submenu.Detail_product", {
        onInit: function () {            
            var oRouter = this.getRouter();
            oRouter.getRoute("detail_product").attachPatternMatched(this._onObjectMatched, this);
            
			// set explored app's demo model on this sample
//			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/contents5_1.json"));
//			this.getView().setModel(oModel);

        },

        // 디테일 화면
        _onObjectMatched: function (oEvent) {
        	console.log("디테일 on")
//            this.getView().bindElement({
//                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
//                model: "invoice"
//            });
        	var sObjectId = oEvent.getParameter("arguments").invoicePath;
        	var a = JSON.parse(sObjectId);
        	console.log(a);
        	var oModel3 = new JSONModel(a);
        	this.setModel(oModel3, "b");
        	console.log(this.getModel("b"));
        },

        // 뒤로 가기 버튼
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("contents5", {}, true);
            }
        },
        onNavSave: function () {
            alert("저장되었습니다.");
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("contents5", {}, true);
        }
    });
});