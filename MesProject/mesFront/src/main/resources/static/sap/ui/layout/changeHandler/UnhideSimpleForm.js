/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier"],function(J){"use strict";var U={};U.applyChange=function(c,C,p){var m=p.modifier;var v=p.view;var a=p.appComponent;var o=c.getDefinition();var b=m.bySelector(o.content.elementSelector||o.content.sUnhideId,a,v);var d=m.getAggregation(C,"content");var s=-1;if(o.changeType==="unhideSimpleFormField"){c.setRevertData(true);d.some(function(f,i){if(f===b){s=i;m.setVisible(f,true);}if(s>=0&&i>s){if((m.getControlType(f)==="sap.m.Label")||(m.getControlType(f)==="sap.ui.comp.smartfield.SmartLabel")||(m.getControlType(f)==="sap.ui.core.Title")||(m.getControlType(f)==="sap.m.Title")||(m.getControlType(f)==="sap.m.Toolbar")||(m.getControlType(f)==="sap.m.OverflowToolbar")){return true;}else{m.setVisible(f,true);}}});}return true;};U.completeChangeContent=function(c,s,p){var C=c.getDefinition();if(s.sUnhideId){var u=sap.ui.getCore().byId(s.sUnhideId);C.content.elementSelector=J.getSelector(u,p.appComponent);c.addDependentControl(u,"elementSelector",p);}else if(s.revealedElementId){var f=sap.ui.getCore().byId(s.revealedElementId||s.sUnhideId);var l=f.getLabel();C.content.elementSelector=J.getSelector(l,p.appComponent);c.addDependentControl(l,"elementSelector",p);}else{throw new Error("oSpecificChangeInfo.revealedElementId attribute required");}};U.revertChange=function(c,C,p){var m=p.modifier;var v=p.view;var a=p.appComponent;var o=c.getDefinition();var b=m.bySelector(o.content.elementSelector||o.content.sUnhideId,a,v);var d=m.getAggregation(C,"content");var s=-1;if(o.changeType==="unhideSimpleFormField"){d.some(function(f,i){if(f===b){s=i;m.setVisible(f,false);}if(s>=0&&i>s){if((m.getControlType(f)==="sap.m.Label")||(m.getControlType(f)==="sap.ui.comp.smartfield.SmartLabel")||(m.getControlType(f)==="sap.ui.core.Title")||(m.getControlType(f)==="sap.m.Title")||(m.getControlType(f)==="sap.m.Toolbar")||(m.getControlType(f)==="sap.m.OverflowToolbar")){return true;}else{m.setVisible(f,false);}}});c.resetRevertData();}return true;};U.getChangeVisualizationInfo=function(c){return{affectedControls:[c.getDefinition().content.elementSelector]};};return U;},true);
