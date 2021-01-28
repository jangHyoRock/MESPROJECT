sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
    "sap/ui/model/Filter"
], function (ManagedObject, Fragment, Filter) {
	"use strict";

	return ManagedObject.extend("tips.mes.controller.contents.productionMgmt.submenu.RegisterDialog", {
		
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

		openRegister : function () {
			var oView = this._oView;
			var that = this;
			// create dialog lazily
			if (!this.pDialog) {
				var oFragmentController = {
					onCloseDialog : function () {
						that.resetDialog();
						oView.byId("processDialog").close();
					},
			
					onSaveDialog : function () {
						that.postParameters();
						oView.byId("processDialog").close();
					}
				};
				// load asynchronous XML fragment
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "tips.mes.view.contents.productionMgmt.submenu.registerDialog",
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
			oView.byId("order_no").setValue();
			oView.byId("customers").setValue();
			oView.byId("deadline").setValue();
			oView.byId("product_name").setValue();
			oView.byId("product_size").setValue();
			oView.byId("quantity").setValue();
			oView.byId("product_quantity").setValue();
			oView.byId("start_date").setValue();
			oView.byId("end_date").setValue();
			oView.byId("materials").setSelectedKey();
			oView.byId("required_quantity").setValue();
			oView.byId("outsourcing").setSelectedKey();
		},
		
		postParameters : function () {
			var oView = this._oView;
			var that = this;
			console.log(oView.byId("order_no").getValue());
			var order_no = oView.byId("order_no").getValue();
			var customers = oView.byId("customers").getValue();
			var deadline = oView.byId("deadline").getValue();
			var product_name = oView.byId("product_name").getValue();
			var product_size = oView.byId("product_size").getValue();
			var quantity = oView.byId("quantity").getValue();
			var product_quantity = oView.byId("product_quantity").getValue();
			var start_date = oView.byId("start_date").getValue();
			var end_date = oView.byId("end_date").getValue();
			var materials = oView.byId("materials").getSelectedKey();
			var required_quantity = oView.byId("required_quantity").getValue();
			var outsourcing = oView.byId("outsourcing").getSelectedKey();
			axios.post('/productionMgmt/register', {
				order_no, customers, deadline, product_name,
				product_size, quantity, product_quantity,
				start_date, end_date, materials, required_quantity,
				outsourcing
			}).then(function(res) {
				console.log(res)
				alert("저장되었습니다.")
			})
		}

	});

});