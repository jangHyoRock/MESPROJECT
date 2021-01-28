sap.ui.define([
    "tips/mes/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
], function (Controller, History, MessageToast, JSONModel, UIComponent) {
    "use strict";
    return Controller.extend("tips.mes.controller.contents.productionMgmt.submenu.Weekly", {
        onInit: function () {            
            
			// set explored app's demo model on this sample
//			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/contents5_1.json"));
//			this.getView().setModel(oModel);

        },

        // 디테일 화면
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        }
    });
});