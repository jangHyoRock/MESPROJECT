sap.ui.define([
	"tips/common/controller/BaseController"
], function (BaseController) {
    "use strict";
    
    return BaseController.extend("tips.mes.controller.BaseController", 
    {
		// MES 서버 URL
    	getServerUrl: function()
        {
            return "http://localhost:9001";
        }
    });
});