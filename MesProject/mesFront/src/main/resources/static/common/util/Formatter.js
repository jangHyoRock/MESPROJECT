sap.ui.define([
], function () {
    "use strict";
    
    return {
    	dateFormat: function(d){
    		return this._dateFormat(d,"-");
    	},
    	
    	_dateFormat: function(d,s){
    		return d.getFullYear()+s+this.setTwoDigit(d.getMonth()+1)+s+this.setTwoDigit(d.getDate());
    	},
    	
    	setTwoDigit: function(n){
    		return n>9?n:"0"+n;
    	},

        formatTitleCase: function(sVal) {
			if (!sVal) {
				return;
			}
			return sVal.replace(/\w\S*/g,
				function(txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
		},

		formatFirstLowerCase: function(sVal) {
			if (!sVal) {
				return;
			}
			return sVal.substring(0, 1).toLowerCase() + sVal.substr(1);
		}
    };
});