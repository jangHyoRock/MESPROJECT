sap.ui.define([
	"tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/TextAlign"
], function(BaseController,Controller,Filter,FilterOperator, Fragment, JSONModel,TextAlign) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.orderMgmt.OrderMgmt",
    {
        onInit : function () {
            window.contents9 = this;
            
            this.localApi2();  //DB에서 테이블불러오는 함수
            
            
        },
        
        localApi2 : function()
        {
        	console.log('localApi2');
        	var oParam = {
        		url     : "/test/xml2", //spring 주소
                type    : "POST",
                dataType : "json",
                data	: "",
                callback: "callbackFunction",
                error   : "errorCallbackFunction"
            };
            
            this.callAjax(oParam);
        },
        
        callbackFunction : function(oModel)
        {
            var oData = oModel.getProperty("/");
            console.log(oData);
            var oModel2 = new JSONModel(oData);
            
            	//oTabled의 아이디(invoiceList)가져와서 변수에 넣는다.
            var oTable = this.byId("invoiceList");
            	//oTable 변수에 setModel 한다.
            oTable.setModel(oModel2,"omodel2");
            
            //전체에 모델 뿌려주는 방법
            this.setModel(new JSONModel(oData),"omodel2");
        },
        
        errorCallbackFunction : function()
        {
            console.log("error callback");
        }, 
        
        onSearch : function(oEvent){
        	
        	var aFilters = [];
        	var sQuery = oEvent.getSource().getValue(); // 검색창에 입력한 값
        	var sQuery2 = this.getView().byId("actionselect")._getSelectedItemText();
        	if (sQuery && sQuery.length >0){
        		var filter = new Filter("num3", FilterOperator.Contains, sQuery); // num3:검색할 컬럼, filterOperator, 입력값
        		//var filter2 = new Filter("num2", FilterOperator.Contains, sQuery2);
        		aFilters.push(filter);
        		//aFilters.push(filter2);
        	}
        	
        	var oTable = this.byId("invoiceList");
        	var oBinding = oTable.getBinding("items"); 
        	oBinding.filter(aFilters);
        	
        },
        
        
        onPress : function (oEvent) {
                console.log("click_onPress");
            var oRouter = this.getRouter();
            var oTable = oEvent.getSource().getBindingContext("omodel2");	//선택한 행의 정보(oModel,sPath등...)
            var Row = oTable.oModel.getProperty(oTable.sPath);    			//파일경로에 해당되는 oModel의 행정보 
            oRouter.navTo("detail2",{
                invoicePath : JSON.stringify(Row)							//stringify(Row): Row의 내용을 ""안에 넣어서 메세지형태로 만듬
            });
                       
        },
        

        Classify : function (oEvent) {
        
         	var item = oEvent.getSource(); //Dialog로 정보 넘겨주기
            this.getOwnerComponent().openClassify();
        },
        
        ItemManage : function (oEvent) {
            var oView = this.getView();
            console.log(oView);
                    
            // create dialog lazily
            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "tips.mes.view.contents.orderMgmt.submenu.ItemManage",
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
        
        onCloseDialog2 : function () {
			this.byId("itemmanage").close();
        },
        
        Delete : function (oEvent) {
        
        	 var oTable = oEvent.getSource().getBindingContext("omodel2"); // 선택한 행의정보
        	 var num1 = oTable.oModel.getProperty(oTable.sPath).num1;	  //  파일경로에 해당되는 oModel의 행정보에서 num1만 가져옴
        	 
        	 axios.post('/test/delete',{
				num1  //가져다줄 매개변수들 작성
			}).then(function(response){
				console.log(response) 
				location.reload();
			}).catch(function(response){
				console.log(error)
			});        	 
        	
        },

        
//		Dialog로 넘길때
//		Register : function (oEvent) {
//	           
//	        var item = oEvent.getSource(); //Dialog로 정보 넘겨주기
//           this.getOwnerComponent().openRegister();
//	       }


//		페이지로 넘길때
       Register : function (oEvent) {
           var oRouter = this.getRouter();
           oRouter.navTo("detail3");
       }

    });
}, true);
