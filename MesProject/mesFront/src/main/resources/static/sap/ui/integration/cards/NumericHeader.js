/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/util/extend',"sap/base/util/isEmptyObject","sap/f/cards/NumericHeader","sap/f/cards/NumericHeaderRenderer","sap/ui/integration/util/BindingHelper","sap/f/cards/NumericSideIndicator",'sap/ui/model/json/JSONModel',"sap/ui/integration/util/LoadingProvider"],function(e,i,F,a,B,N,J,L){"use strict";var b=F.extend("sap.ui.integration.cards.NumericHeader",{constructor:function(c,A,s){c=c||{};this._sAppId=s;this._bIsEmpty=i(c);var S={title:c.title,subtitle:c.subTitle};if(c.status&&typeof c.status.text==="string"){S.statusText=c.status.text;}e(S,{unitOfMeasurement:c.unitOfMeasurement,details:c.details});if(c.mainIndicator){S.number=c.mainIndicator.number;S.scale=c.mainIndicator.unit;S.trend=c.mainIndicator.trend;S.state=c.mainIndicator.state;}S=B.createBindingInfos(S);if(c.sideIndicators){S.sideIndicators=c.sideIndicators.map(function(I){return new N(I);});}S.toolbar=A;F.call(this,S);if(A){A.attachVisibilityChange(this._handleToolbarVisibilityChange.bind(this));}},metadata:{library:"sap.ui.integration",properties:{}},renderer:a});b.prototype.init=function(){F.prototype.init.call(this);this._bReady=false;this._oLoadingProvider=new L();this._aReadyPromises=[];this._awaitEvent("_dataReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready");}.bind(this));};b.prototype.exit=function(){F.prototype.exit.call(this);this._oServiceManager=null;this._oDataProviderFactory=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null;}if(this._oActions){this._oActions.destroy();this._oActions=null;}if(this._oLoadingProvider){this._oLoadingProvider.destroy();this._oLoadingProvider=null;}};b.prototype.isReady=function(){return this._bReady;};b.prototype.isLoading=function(){var l=this._oLoadingProvider,c=this.getParent(),d=c.getMetadata()._sClassName==='sap.ui.integration.widgets.Card'?c.isLoading():false;return!l.getDataProviderJSON()&&(l.getLoadingState()||d);};b.prototype._awaitEvent=function(E){this._aReadyPromises.push(new Promise(function(r){this.attachEventOnce(E,function(){r();});}.bind(this)));};b.prototype.setServiceManager=function(s){this._oServiceManager=s;return this;};b.prototype.setDataProviderFactory=function(d){this._oDataProviderFactory=d;return this;};b.prototype._setDataConfiguration=function(d){var p="/";if(d&&d.path){p=d.path;}this.bindObject(p);if(this._oDataProvider){this._oDataProvider.destroy();}this._oDataProvider=this._oDataProviderFactory.create(d,this._oServiceManager);if(this._oDataProvider){this.setModel(new J());this._oDataProvider.attachDataRequested(function(){this.onDataRequested();}.bind(this));this._oDataProvider.attachDataChanged(function(E){this._updateModel(E.getParameter("data"));this.onDataRequestComplete();}.bind(this));this._oDataProvider.attachError(function(E){this._handleError(E.getParameter("message"));this.onDataRequestComplete();}.bind(this));this._oDataProvider.triggerDataUpdate();}else{this.fireEvent("_dataReady");}};b.prototype._updateModel=function(d){this.getModel().setData(d);};b.prototype._handleError=function(l){this.fireEvent("_error",{logMessage:l});};b.prototype._handleToolbarVisibilityChange=function(E){var t=E.getParameter("visible");if(this._bIsEmpty){this.setVisible(t);}};b.prototype.onDataRequested=function(){this._oLoadingProvider.createLoadingState(this._oDataProvider);};b.prototype.onDataRequestComplete=function(){this.fireEvent("_dataReady");this._oLoadingProvider.setLoading(false);this._oLoadingProvider.removeHeaderPlaceholder(this);};return b;});
