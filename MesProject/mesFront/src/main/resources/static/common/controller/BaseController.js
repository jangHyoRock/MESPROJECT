sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, UIComponent, JSONModel, MessageBox) {
    "use strict";
    
    return Controller.extend("tips.common.controller.BaseController", 
    {
    	/**
		 * Convenience method for getting the manifest.json file entry value.
		 * @public
		 * @returns {string} manifest.json file entry value
		 */
		getManifestEntry : function (sEntry) {
			return this.getOwnerComponent().getManifestEntry(sEntry);
		},
		
		// 공통 서버 URL
		getServerUrl: function()
        {
            return "http://localhost:9001";
        },
    	
    	getRouter: function ()
        {
            return UIComponent.getRouterFor(this);
        },
        
        getModel: function (sName)
        {
            return this.getView().getModel(sName);
        },
 
        setModel: function (oModel, sName)
        {
            return this.getView().setModel(oModel, sName);
        },
 
        getResourceBundle: function ()
        {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        
        getResourceBundleCommon: function ()
        {
            return this.getOwnerComponent().getModel("i18nCommon").getResourceBundle();
        },
        
        onActive: function() {},
        
        callAjax : function(oParam)
        {  
            console.log("BaseController callAjax() oParam.url: " + oParam.url);
            
            if (!oParam.callback) { return; }
            var that   = this;
            var _oData = oParam.data || '';
			var _sType = oParam.type || 'get';
			var _sUrl = oParam.serverUrl || that.getServerUrl();

			if(_sType.toLowerCase() != 'get' && typeof _oData == 'object') {
				_oData = JSON.stringify(_oData);
			}
            
            jQuery.ajax({
                type        : _sType,
                data        : _oData,
                contentType : "application/json; charset=utf-8",
				mediatype   : "application/json",
                url         : _sUrl + oParam.url,
                dataType    : "json",
                async       : true,
                success     : 
                    function(oData, textStatus, jqXHR)
                    {
                        var oModel = new JSONModel();
                        oModel.setData(oData); 
                    
                        var proxyFunc = jQuery.proxy(that, oParam.callback, oModel);
                        proxyFunc();
                    },
                error       : 
                    function(e)
                    {
                        var proxyFunc = jQuery.proxy(that, oParam.error);
                        if(proxyFunc){
                        	proxyFunc();
                        } else{
                        	MessageBox.error( "Error occured" );
                        }
                    }
            });
        },
        
        nvl: function(obj){
    		return this.nvlTo(obj,"")
    	},
    	
    	nvlTo: function(obj, s){
    		if(obj || obj === 0){ return s; }
    		return obj;
    	}
    });
});