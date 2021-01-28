sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function (ManagedObject, Fragment, JSONModel) {
	"use strict";

	return ManagedObject.extend("tips.mes.controller.contents.productionMgmt.submenu.HistoryDialog", {

		constructor : function (oView) {
			this._oView = oView;
			// set explored app's demo model on this sample
			// var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/contents8.json"));
			// this.getView().setModel(oModel);
		},

		exit : function () {
			delete this._oView;

		},

		openHistory : function () {
			var oView = this._oView;
			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseHistoryDialog : function () {
						oView.byId("historyDialog").close();
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tips.mes.view.contents.productionMgmt.submenu.HistoryDialog",
					controller: oFragmentController
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		}

	});

});