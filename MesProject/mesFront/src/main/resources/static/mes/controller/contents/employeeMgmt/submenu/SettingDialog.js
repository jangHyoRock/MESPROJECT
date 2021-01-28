sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
    "sap/ui/model/Filter"
], function (ManagedObject, Fragment, Filter) {
	"use strict";

	return ManagedObject.extend("tips.mes.controller.contents.employeeMgmt.submenu.SettingDialog", {
		
		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;

		},

		openSetting : function () {
			var oView = this._oView;
			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseDialog : function () {
						oView.byId("settingDialog").close();
					},
			
					onSaveDialog : function () {
						alert("저장되었습니다.");
						oView.byId("settingDialog").close();
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tips.mes.view.contents.employeeMgmt.submenu.settingDialog",
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