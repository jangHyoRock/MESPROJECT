sap.ui.define([
    "tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
	"sap/ui/core/Fragment",  
	'sap/ui/model/json/JSONModel'
], function(BaseControler,Controller, Fragment,JSONModel) {
    'use strict';
    
    return BaseControler.extend("tips.mes.controller.contents.importInspectionMgmt.OutgoingInspectionReg",{

		onInit: function() {

			window.OutgoingInspectionReg = this;
			var oData = {
				selectedKey: "A", 	
		};
		var oModel = new JSONModel(oData);
		this.getView().setModel(oModel);
		},

       Register : function () {
            var oView = this.getView();
                console.log(oView);
                        
            // create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
                    name:"tips.mes.view.contents.importInspectionMgmt.submenu.BadRegister",
                    controller:this,
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
        }, 

		onCloseDialog : function () {
			this.byId("badRegister").close();
		} 

    });
});