sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (ManagedObject, Fragment,JSONModel) {
	"use strict";

	return ManagedObject.extend("tips.mes.controller.submenu.orderMgmt.Register", {

		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;
		},

		open : function (oEvent) {
			var oView = this._oView;

			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
				
					Insert : function(){
						alert("정상처리");
						var num4 =window.register.getModel("omodel13").oData.num4;
						var num5 = window.register.getModel("omodel13").oData.num5;
						console.log(num4);
						console.log(num5);
						axios.post("/user/test/insert",{
							num4,num5 //가져다줄 매개변수들 작성
						}).then(function(response){
							console.log(response)
							
						}).catch(function(response){
							console.log(error)
						});
					
					}, 
					
					onCloseDialog : function () {
						oView.byId("register").close();
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tips.mes.view.submenu.orderMgmt.Register",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
			
				window.register = oDialog;
				var oModel = new JSONModel();
				oDialog.setModel(oModel,"omodel13");
				
				oDialog.open();
				
			});
		}

	});

});