sap.ui.define([
	"tips/mes/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function(BaseController, Fragment, JSONModel) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.RawMaterialsMgmt",
    {
        onInit : function () {
        
            window.RawMaterialsMgmt = this;

        },

        onPress : function (oEvent) {
            
            
            var item = oEvent.getSource(); //Dialog로 정보 넘겨주기
            console.log(item.getBindingContext("invoice"),"invoice"); //Dialog로 정보 넘겨주기

            this.getOwnerComponent().openBreakDown(item);

        },
     
        Output : function (oEvent) {
            
            var item = oEvent.getSource();
            this.getOwnerComponent().openOutput(item);
        },

        Input : function (oEvent) {
            var item = oEvent.getSource();
            this.getOwnerComponent().openInput(item);
        },

        Container : function () {
            this.getOwnerComponent().openContainer();
        },

        Register : function (oEvent) {
            var oRouter = this.getRouter();
            oRouter.navTo("detail4");
        }

    });
}, true);
