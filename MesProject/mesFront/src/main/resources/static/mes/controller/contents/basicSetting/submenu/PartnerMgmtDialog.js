sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
    "sap/ui/model/Filter"
], function (ManagedObject, Fragment, Filter) {
	"use strict";

	return ManagedObject.extend("tips.mes.controller.contents.basicSetting.submenu.PartnerMgmtDialog", {
		
        onFilterInvoices : function (oEvent) {

            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if(sQuery) {
                aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.byId("invoiceList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
		},
		
		constructor : function (oView) {
			this._oView = oView;
		},

		exit : function () {
			delete this._oView;

		},

		openPartnerMgmt : function () {
			var oView = this._oView;
			var that = this;
			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseDialog : function () {
						that.resetDialog();
						oView.byId("partnerMgmtDialog").close();
					},
			
					onSaveDialog : function () {
						that.postParameters();
						oView.byId("partnerMgmtDialog").close();
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tips.mes.view.contents.basicSetting.submenu.partnerMgmtDialog",
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
		},
		
		resetDialog : function () {
			var oView = this._oView;
//			oView.byId("division").setSelectedKey();
			oView.byId("division").setValue();
			oView.byId("customer_person").setValue();
			oView.byId("customer_name").setValue();
			oView.byId("person_phone_number").setValue();
			oView.byId("customer_code").setValue();
			oView.byId("fax_number").setValue();
			oView.byId("representative").setValue();
			oView.byId("email").setValue();
			oView.byId("business_license_number").setValue();
			oView.byId("address").setValue();
			oView.byId("business_actual").setValue();
			oView.byId("bank_account_number").setValue();
			oView.byId("business").setValue();
			oView.byId("bank_name").setValue();
			oView.byId("phone").setValue();
			oView.byId("depositor").setValue();
			oView.byId("remark").setValue();
		},
		
		postParameters : function () {
			var oView = this._oView;
			var that = this;
//			var division = oView.byId("division").getSelectedKey();
			var division = oView.byId("division").getValue();
			var customer_person = oView.byId("customer_person").getValue();
			var customer_name = oView.byId("customer_name").getValue();
			var person_phone_number = oView.byId("person_phone_number").getValue();
			var customer_code = oView.byId("customer_code").getValue();
			var fax_number = oView.byId("fax_number").getValue();
			var representative = oView.byId("representative").getValue();
			var email = oView.byId("email").getValue();
			var business_license_number = oView.byId("business_license_number").getValue();
			var address = oView.byId("address").getValue();
			var business_actual = oView.byId("business_actual").getValue();
			var bank_account_number = oView.byId("bank_account_number").getValue();
			var business = oView.byId("business").getValue();
			var bank_name = oView.byId("bank_name").getValue();
			var phone = oView.byId("phone").getValue();
			var depositor = oView.byId("depositor").getValue();
			var remark = oView.byId("remark").getValue();
			console.log(division)
			axios.post('/basicSetting/partnerMgmt', {
				division, customer_person, customer_name, person_phone_number, customer_code
				, fax_number, representative, email, business_license_number,
				address, business_actual, bank_account_number, business,
				bank_name, phone, depositor, remark
			}).then(function(res) {
				console.log(res)
				alert("저장되었습니다.")
			})
		}

	});

});