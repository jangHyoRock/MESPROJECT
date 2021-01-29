sap.ui.define([
	"tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment"
], function(BaseController,Controller ,BindingMode ,JSONModel,Fragment) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.importInspectionMgmt.ImportInspectionMgmt",
    {
        onInit: function() {


            window.ImportInspectionMgmt = this;

        
        this.localApi(); // DB불러오는 함수
           
	},
	
        localApi : function()
        {
        	console.log('localApi');
        	var oParam = {
        		url     : "/test/xml", //spring 주소
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
            
            var test = sap.ui.getCore().setModel(oModel2);
            	//oTabled의 아이디(invoiceList)가져와서 변수에 넣는다.
            var oTable = this.byId("invoiceList");
            	//oTable 변수에 setModel 한다.
            oTable.setModel(oModel2,"omodel2");
            
            
            //전체에 모델 뿌려주는 방법 
            //this.setModel(new JSONModel(oData),"omodel2");
            
            
            
        },
        
        errorCallbackFunction : function()
        {
            console.log("error callback");
        },        
	
	
        onPress : function (oEvent)  {

            console.log("click_onPress");
         
            var oRouter = this.getRouter();
            var oTable = oEvent.getSource().getBindingContext("omodel2");	//선택한 행의 정보(oModel,sPath등...)
            var Row = oTable.oModel.getProperty(oTable.sPath);    			//파일경로에 해당되는 oModel의 행정보 
            oRouter.navTo("detail",{
                invoicePath : JSON.stringify(Row)							//stringify(Row): Row의 내용을 ""안에 넣어서 메세지형태로 만듬
            });
           
        },

        moreInfo : function (oEvent) {
            console.log("more info~");
            var oRouter = this.getRouter();
            oRouter.navTo("contents8");        
        }

		
    });
}, true);
