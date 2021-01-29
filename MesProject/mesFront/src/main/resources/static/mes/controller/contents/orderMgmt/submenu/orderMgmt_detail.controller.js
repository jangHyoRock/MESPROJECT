sap.ui.define([
    "tips/mes/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (BaseController,JSONModel,Fragment) {
	"use strict";
	return BaseController.extend("tips.mes.controller.contents.orderMgmt.submenu.orderMgmt_detail", {
	
		onInit: function () {
			
			window.detail3 = this;
			
			var oModel = new JSONModel();
			this.setModel(oModel,"omodel13");

			
		},

		ShowList : function (oEvent) {
            var oView = this.getView();
            console.log(oView);
                    
            // create dialog lazily
            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "OpenUI5.view.fragment.ShowList",
                    controller:this
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
        
        Insert : function () {
        
        	alert("정상처리되었습니다.");
        	//var num2 = this.getView().byId("actionselect")._getSelectedItemText(); 
			//var num3 = this.getView().byId("actionselect2")._getSelectedItemText();
			var order_num = "check";
			var buyer = "check_insert";
			var order_date = this.getView().getModel("omodel13").oData.num4;
			var reference = this.getView().getModel("omodel13").oData.num5;
			var price = this.getView().getModel("omodel13").oData.num6;
			var due_date = this.getView().getModel("omodel13").oData.num7;
			var remark = this.getView().getModel("omodel13").oData.num8;
			
			axios.post('/test/insert',{
				order_num,buyer,order_date,reference,price,due_date,remark  //가져다줄 매개변수들 작성
			}).then(function(response){
				console.log(response)
				window.location.href = "/#/orderMgmt/OrderMgmt" // 페이지로 다시이동
				location.reload();				  	  // 새로고침으로 테이블 갱신된거 불러옴
			}).catch(function(response){
				console.log(error)
			});
			
		},
		
		Goback : function () {
			var oRouter = this.getRouter();
			oRouter.navTo("orderMgmt.OrderMgmt");
		}


	});
});