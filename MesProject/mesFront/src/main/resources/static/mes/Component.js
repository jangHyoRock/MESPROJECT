sap.ui.define([
    "sap/ui/core/UIComponent",
    "./controller/contents/orderMgmt/submenu/Classify",
    "./controller/contents/orderMgmt/submenu/Register",
    "./controller/contents/rawMaterialsMgmt/submenu/Container", 
    "./controller/contents/productionMgmt/submenu/RegisterDialog",
    "./controller/contents/productionMgmt/submenu/HistoryDialog",
    "./controller/contents/productionMgmt/submenu/InspectionMgmtDialog",
    "./controller/contents/basicSetting/submenu/PartnerMgmtDialog"
], function (UIComponent, Classify, Register, Container, RegisterDialog, HistoryDialog, InspectionMgmtDialog, PartnerMgmtDialog) {
    "use strict";

    return UIComponent.extend("tips.mes.Component", {

        metadata: {
            manifest: "json"
        },
        
        init: function () {
        	console.log("Component.js init()");
        	
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            //this.getRouter().initialize();
            
            // set Dialog
            this._registerDialog = new RegisterDialog(this.getRootControl());
            this._classify = new Classify(this.getRootControl());
            this._register = new Register(this.getRootControl());
            this._container = new Container(this.getRootControl());
            this._registerDialog = new RegisterDialog(this.getRootControl());
            this._historyDialog = new HistoryDialog(this.getRootControl());
            this._inspectionMgmtDialog = new InspectionMgmtDialog(this.getRootControl());
            this._partnerMgmtDialog = new PartnerMgmtDialog(this.getRootControl());
        },
        
        exit : function () {
        	this._registerDialog.destory();
        	delete this._registerDialog;
        	
        	this._classify.destroy();
            delete this._classify;
            
            this._register.destroy();
            delete this._register;
            
            this._container.destroy();
            delete this._container;
            
            this._historyDialog.destroy();
            delete this._historyDialog;
            
            this._inspectionMgmtDialog.destroy();
            delete this._inspectionMgmtDialog;

            this._partnerMgmtDialog.destroy();
            delete this._partnerMgmtDialog;
        },
        
        openRegisterDialog : function () {
        	this._registerDialog.openRegister();
        },
        
        openClassify : function () {
			this._classify.open();
        },
        
        openRegister : function () {
			this._register.open();
        },
        
        openContainer : function () {
			this._container.open();
        },
        
        openHistoryDialog : function () {
        	this._historyDialog.openHistory();
        },
        
        openInspectionMgmtDialog : function () {
        	this._inspectionMgmtDialog.openInspectionMgmt();
        },
        
        openPartnerMgmtDialog : function () {
        	this._partnerMgmtDialog.openPartnerMgmt();
        },
        
    });
});