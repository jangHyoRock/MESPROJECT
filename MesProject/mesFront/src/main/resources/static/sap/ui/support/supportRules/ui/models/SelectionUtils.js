/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepExtend","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/ui/models/SharedModel"],function(d,C,S,a){"use strict";var b={model:a,getRulesSelectionState:function(){var m=this.treeTable.getBinding().getModel(),r=m.getData(),s=[];Object.keys(r).forEach(function(R){r[R].nodes.forEach(function(o){s.push({ruleId:o.id,selected:o.selected,libName:o.libName});});});return s;},getSelectedRules:function(){var m=this.treeTable.getBinding().getModel(),r=m.getData(),s=[];if(!r){return;}Object.keys(r).forEach(function(R){r[R].nodes.forEach(function(o){if(o.selected){s.push({ruleId:o.id,libName:o.libName});}});});this.model.setProperty("/selectedRulesCount",s.length);return s;},updateSelectedRulesFromLocalStorage:function(t){var s=S.getSelectedRules();if(!s){return null;}if(!t){return null;}s.forEach(function(r){Object.keys(t).forEach(function(k){t[k].nodes.forEach(function(R){if(R.id===r.ruleId){R.selected=r.selected;if(!R.selected){t[k].selected=false;}}});});});return t;},persistSelection:function(){var s=this.getRulesSelectionState();S.setSelectedRules(s);},setSelectedRules:function(s){var t=d({},this.model.getProperty("/treeModel"));Object.keys(t).forEach(function(k){t[k].nodes.forEach(function(r){r.selected=false;});});s.forEach(function(r){Object.keys(t).forEach(function(k){t[k].nodes.forEach(function(R){if(R.id===r.ruleId){R.selected=true;}});});});this.model.setProperty("/treeModel",t);this.treeTable.getModel("treeModel").setData(d({},t));this.treeTable.syncParentNodeSelectionWithChildren(t,this.treeTable.getModel("treeModel"));this.treeTable.updateSelectionFromModel();this.getSelectedRules();if(S.readPersistenceCookie(C.COOKIE_NAME)){this.persistSelection();}},_syncSelectionAdditionalRuleSetsMainModel:function(t,T){Object.keys(t).forEach(function(k){Object.keys(T).forEach(function(k){if(t[k].id===T[k].id){t[k]=T[k];}});});return t;},_deselectAdditionalRuleSets:function(t,A){if(!A){return;}A.forEach(function(r){Object.keys(t).forEach(function(k){if(t[k].name===r){t[k].selected=false;t[k].nodes.forEach(function(R){R.selected=false;});}});});return t;}};return b;});
