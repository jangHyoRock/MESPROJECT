/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/assert','sap/ui/commons/library','sap/ui/core/Control','./BorderLayoutRenderer','./BorderLayoutArea'],function(a,l,C,B,b){"use strict";var c=l.layout.BorderLayoutAreaTypes;var d=C.extend("sap.ui.commons.layout.BorderLayout",{metadata:{library:"sap.ui.commons",properties:{rtl:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},aggregations:{top:{type:"sap.ui.commons.layout.BorderLayoutArea",multiple:false},begin:{type:"sap.ui.commons.layout.BorderLayoutArea",multiple:false},center:{type:"sap.ui.commons.layout.BorderLayoutArea",multiple:false},end:{type:"sap.ui.commons.layout.BorderLayoutArea",multiple:false},bottom:{type:"sap.ui.commons.layout.BorderLayoutArea",multiple:false}}}});d.prototype._getOrCreateArea=function(A,e){var T=c,t=this,o;function f(m){var g;if(e){g=new b({id:t.getId()+"--"+A,areaId:A,content:e});t[m](g);}return g;}if(!T.hasOwnProperty(A)){throw new Error("Invalid Area Id '"+A+"'");}switch(A){case T.top:o=this.getTop()||f("setTop");break;case T.begin:o=this.getBegin()||f("setBegin");break;case T.center:o=this.getCenter()||f("setCenter");break;case T.end:o=this.getEnd()||f("setEnd");break;case T.bottom:o=this.getBottom()||f("setBottom");break;default:a(false,"default case must not be reached");break;}return o;};d.prototype.getArea=function(A,e){return this._getOrCreateArea(A,e?[]:null);};d.prototype.createArea=function(A,o){return this._getOrCreateArea(A,Array.prototype.slice.call(arguments,1));};d.prototype.getAreaById=function(A){return this._getOrCreateArea(A,[]);};d.prototype.getAreaData=function(A){var o=this.getAreaById(A);return o?{size:o.getSize(),visible:o.getVisible(),overflowX:o.getOverflowX(),overflowY:o.getOverflowY(),contentAlign:o.getContentAlign()}:{};};d.prototype.setAreaData=function(A,D){this.getArea(A,true).applySettings(D);return this;};d.prototype.addContent=function(A){var o=this.getArea(A,true),i;for(var i=1;i<arguments.length;i++){o.addContent(arguments[i]);}return this;};d.prototype.insertContent=function(A,I){var o=this.getArea(A,true),i;for(i=2;i<arguments.length;i++){o.insertContent(arguments[i],I++);}return this;};d.prototype.removeContent=function(A,e){var o=this.getAreaById(A);if(o){o.removeContent(e);}return this;};d.prototype.removeAllContent=function(A){var o=this.getAreaById(A);if(o){o.removeAllContent();}return this;};d.prototype.getContent=function(A){var o=this.getAreaById(A);return o?o.getContent():[];};d.prototype.indexOfContent=function(A,o){var e=this.getAreaById(A);return e?e.indexOfContent(o):-1;};d.prototype.destroyContent=function(A){this.getAreaById(A,true).destroyContent();return this;};return d;});
