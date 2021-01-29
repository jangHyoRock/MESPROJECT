sap.ui.define([
	"tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel'
], function(BaseController, Controller, BindingMode, JSONModel) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.basicSetting.UserMgmt",
    {
		onInit: function() {
        	
        	console.log("aaaaaUserMgmt");
        	window.UserMgmt = this;
        	
        	var oModel = new JSONModel();
			this.setModel(oModel,"omodel1");
        },
        
        onActive: function() {
        	console.log("tips.mes.controller.contents.UserMgmt onActive()");
        },
        
        errorback: function(){ },
        
        callbackFunction : function(oModel) {
            var oData = oModel.getProperty("/result/list");
            this.byId("idTable").setModel(new JSONModel(oData));
        },
              
        errorCallbackFunction : function() {
            console.log("error callback");
        },
        
        Insert : function () {
        
        	alert("정상처리되었습니다.");
        	//var num2 = this.getView().byId("actionselect")._getSelectedItemText(); 
			//var num3 = this.getView().byId("actionselect2")._getSelectedItemText();
			
			var user_name = this.getView().getModel("omodel1").oData.user_name;
			var create_user = this.getView().getModel("omodel1").oData.create_user;
			var phone_number = this.getView().getModel("omodel1").oData.phone_number;
			var birth_date = this.getView().getModel("omodel1").oData.birth_date;
			var email = this.getView().getModel("omodel1").oData.email;
			var address= this.getView().getModel("omodel1").oData.address;
			var employment_status = "Y";
			var join_date = this.getView().getModel("omodel1").oData.join_date;
			var department = "check2";
			var position = "check3";
			var job = this.getView().getModel("omodel1").oData.job;
			var user_id = this.getView().getModel("omodel1").oData.user_id;
			var password = this.getView().getModel("omodel1").oData.password;
			
			axios.post('/usermanage/insert',{
				user_id,user_name,create_user,phone_number,birth_date,email,address,
				employment_status,join_date,department,position,job,password //가져다줄 매개변수들 작성
			}).then(function(response){
				console.log(response)
			}).catch(function(response){
				console.log(error)
			});
			
		}
        
    });
}, true);
