/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Button','./Dialog','./SearchField','./Table','./library','sap/ui/core/Control','sap/ui/Device','sap/m/Toolbar','sap/m/Text','sap/m/BusyIndicator','sap/m/Bar','sap/ui/core/theming/Parameters','sap/m/Title','sap/base/Log'],function(B,D,S,T,l,C,a,b,c,d,e,P,f,L){"use strict";var g=l.ListMode;var h=l.ButtonType;var j=l.TitleAlignment;var k=C.extend("sap.m.TableSelectDialog",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},multiSelect:{type:"boolean",group:"Dimension",defaultValue:false},growing:{type:"boolean",group:"Behavior",defaultValue:true},growingThreshold:{type:"int",group:"Misc",defaultValue:null},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:false},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showClearButton:{type:"boolean",group:"Behavior",defaultValue:false},confirmButtonText:{type:"string",group:"Appearance"},draggable:{type:"boolean",group:"Behavior",defaultValue:false},resizable:{type:"boolean",group:"Behavior",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:j.Auto}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ColumnListItem",multiple:true,singularName:"item",bindable:"bindable",forwarding:{idSuffix:"-table",aggregation:"items",forwardBinding:true}},_dialog:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},columns:{type:"sap.m.Column",multiple:true,singularName:"column",bindable:"bindable",forwarding:{idSuffix:"-table",aggregation:"columns",forwardBinding:true}}},events:{confirm:{parameters:{selectedItem:{type:"sap.m.StandardListItem"},selectedItems:{type:"sap.m.StandardListItem[]"},selectedContexts:{type:"string"}}},search:{parameters:{value:{type:"string"},itemsBinding:{type:"any"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},cancel:{}}},renderer:{apiVersion:2,render:function(){}}});k.prototype.init=function(){var t=this,i=0,r=null;r=function(){t._oSelectedItem=t._oTable.getSelectedItem();t._aSelectedItems=t._oTable.getSelectedItems();t._oDialog.detachAfterClose(r);t._fireConfirmAndUpdateSelection();};this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTable=new T(this.getId()+"-table",{growing:t.getGrowing(),growingScrollToLoad:t.getGrowing(),mode:g.SingleSelectMaster,modeAnimationOn:false,sticky:[l.Sticky.InfoToolbar,l.Sticky.ColumnHeaders],infoToolbar:new b({visible:false,active:false,content:[new c({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),selectionChange:function(E){if(t._oDialog){if(!t.getMultiSelect()){t._oDialog.attachAfterClose(r);t._oDialog.close();}else{t._updateSelectionIndicator();}}}});this._oTable.getInfoToolbar().addEventDelegate({onAfterRendering:function(){t._oTable.getInfoToolbar().$().attr('aria-live','polite');}});this._table=this._oTable;this._oBusyIndicator=new d(this.getId()+"-busyIndicator").addStyleClass("sapMTableSelectDialogBusyIndicator",true);this._oSearchField=new S(this.getId()+"-searchField",{width:"100%",liveChange:function(E){var v=E.getSource().getValue(),m=(v?300:0);clearTimeout(i);if(m){i=setTimeout(function(){t._executeSearch(v,false,"liveChange");},m);}else{t._executeSearch(v,false,"liveChange");}},search:function(E){var v=E.getSource().getValue(),m=E.getParameter("clearButtonPressed");t._executeSearch(v,m,"search");}});this._searchField=this._oSearchField;this._oSubHeader=new e(this.getId()+"-subHeader",{contentMiddle:[this._searchField]});var o=new e(this.getId()+"-dialog-header",{titleAlignment:this.getTitleAlignment(),contentMiddle:[new f(this.getId()+"-dialog-title",{level:"H2"})]});this._oDialog=new D(this.getId()+"-dialog",{customHeader:o,titleAlignment:this.getTitleAlignment(),stretch:a.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oTable],endButton:this._getCancelButton(),initialFocus:((a.system.desktop&&this._oSearchField)?this._oSearchField:null),draggable:this.getDraggable()&&a.system.desktop,resizable:this.getResizable()&&a.system.desktop,escapeHandler:function(p){t._onCancel();p.resolve();}}).addStyleClass("sapMTableSelectDialog");this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);this._oDialog._iVMargin=8*(parseInt(P.get("sapUiFontSize"))||16);this._sSearchFieldValue="";this._bFirstRequest=true;this._iTableUpdateRequested=0;this._oDialog.getProperty=function(n){if(n!=="title"){return C.prototype.getProperty.call(this,n);}return this.getCustomHeader().getAggregation("contentMiddle")[0].getText();}.bind(this._oDialog);};k.prototype.exit=function(){this._oTable=null;this._oSearchField=null;this._oSubHeader=null;this._oClearButton=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iTableUpdateRequested=null;this._bFirstRequest=false;this._bInitBusy=false;this._bFirstRender=false;if(this._bAppendedToUIArea){var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.removeContent(this,true);}if(this._oDialog){this._oDialog.destroy();this._oDialog=null;}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null;}this._oSelectedItem=null;this._aSelectedItems=null;this._aInitiallySelectedItems=null;this._table=null;this._searchField=null;this._dialog=null;};k.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false;this._bFirstRender=false;}return this;};k.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments);}else{C.prototype.invalidate.apply(this,arguments);}return this;};k.prototype.open=function(s){if(!this.getParent()&&!this._bAppendedToUIArea){var o=sap.ui.getCore().getStaticAreaRef();o=sap.ui.getCore().getUIArea(o);o.addContent(this,true);this._bAppendedToUIArea=true;}this._bFirstRequest=true;this._oSearchField.setValue(s);this._sSearchFieldValue=s||"";this._oDialog.open();if(this._bInitBusy){this._setBusy(true);}this._aInitiallySelectedItems=this._oTable.getSelectedItems();this._updateSelectionIndicator();return this;};k.prototype.setGrowing=function(v){this._oTable.setGrowing(v);this._oTable.setGrowingScrollToLoad(v);this.setProperty("growing",v,true);return this;};k.prototype.setGrowingThreshold=function(v){this._oTable.setGrowingThreshold(v);this.setProperty("growingThreshold",v,true);return this;};k.prototype.setDraggable=function(v){this._setInteractionProperty(v,"draggable",this._oDialog.setDraggable);return this;};k.prototype.setResizable=function(v){this._setInteractionProperty(v,"resizable",this._oDialog.setResizable);return this;};k.prototype._setInteractionProperty=function(v,p,i){this.setProperty(p,v,true);if(!a.system.desktop&&v){L.warning(p+" property works only on desktop devices!");return;}if(a.system.desktop&&this._oDialog){i.call(this._oDialog,v);}};k.prototype.setBusy=function(i){this._oSearchField.setEnabled(!i);this._oDialog.setBusy.apply(this._oDialog,arguments);return this;};k.prototype.getBusy=function(){return this._oDialog.getBusy.apply(this._oDialog,arguments);};k.prototype.setBusyIndicatorDelay=function(v){this._oTable.setBusyIndicatorDelay(v);this._oDialog.setBusyIndicatorDelay(v);this.setProperty("busyIndicatorDelay",v,true);return this;};k.prototype.setMultiSelect=function(m){this.setProperty("multiSelect",m,true);if(m){this._oTable.setMode(g.MultiSelect);this._oTable.setIncludeItemInSelection(true);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.setBeginButton(this._getOkButton());}else{this._oTable.setMode(g.SingleSelectMaster);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.destroyBeginButton();delete this._oOkButton;}return this;};k.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oDialog.getCustomHeader().getAggregation("contentMiddle")[0].setText(t);return this;};k.prototype.setTitleAlignment=function(A){this.setProperty("titleAlignment",A);if(this._oDialog){this._oDialog.setTitleAlignment(A);}return this;};k.prototype.setConfirmButtonText=function(t){this.setProperty("confirmButtonText",t,true);this._oOkButton&&this._oOkButton.setText(t||this._oRb.getText("SELECT_CONFIRM_BUTTON"));return this;};k.prototype.setNoDataText=function(n){this._oTable.setNoDataText(n);return this;};k.prototype.getNoDataText=function(){return this._oTable.getNoDataText();};k.prototype.getContentWidth=function(){return this._oDialog.getContentWidth();};k.prototype.setContentWidth=function(w){this._oDialog.setContentWidth(w);return this;};k.prototype.getContentHeight=function(){return this._oDialog.getContentHeight();};k.prototype.setContentHeight=function(H){this._oDialog.setContentHeight(H);return this;};k.prototype.addStyleClass=function(){this._oDialog.addStyleClass.apply(this._oDialog,arguments);return this;};k.prototype.removeStyleClass=function(){this._oDialog.removeStyleClass.apply(this._oDialog,arguments);return this;};k.prototype.toggleStyleClass=function(){this._oDialog.toggleStyleClass.apply(this._oDialog,arguments);return this;};k.prototype.hasStyleClass=function(){return this._oDialog.hasStyleClass.apply(this._oDialog,arguments);};k.prototype.getDomRef=function(){if(this._oDialog){return this._oDialog.getDomRef.apply(this._oDialog,arguments);}else{return null;}};k.prototype.setShowClearButton=function(v){this.setProperty("showClearButton",v,true);if(v){var o=this._oDialog.getCustomHeader();o.addContentRight(this._getClearButton());this._oClearButton.setVisible(v);}else if(this._oClearButton){this._oClearButton.setVisible(v);}return this;};k.prototype._setModel=k.prototype.setModel;k.prototype.setModel=function(m,M){var A=Array.prototype.slice.call(arguments);this._setBusy(false);this._bInitBusy=false;this._iTableUpdateRequested+=1;this._oTable.attachUpdateStarted(this._updateStarted,this);this._oTable.attachUpdateFinished(this._updateFinished,this);this._oTable.setModel(m,M);k.prototype._setModel.apply(this,A);this._updateSelectionIndicator();return this;};k.prototype._setBindingContext=k.prototype.setBindingContext;k.prototype.setBindingContext=function(o,m){var i=Array.prototype.slice.call(arguments);this._oTable.setBindingContext(o,m);k.prototype._setBindingContext.apply(this,i);return this;};k.prototype._executeSearch=function(v,i,E){var t=this._oTable,o=(t?t.getBinding("items"):undefined),s=(this._sSearchFieldValue!==v);if(this._oDialog.isOpen()&&((s&&E==="liveChange")||E==="search")){this._sSearchFieldValue=v;if(o){this._iTableUpdateRequested+=1;if(E==="search"){this.fireSearch({value:v,itemsBinding:o,clearButtonPressed:i});}else if(E==="liveChange"){this.fireLiveChange({value:v,itemsBinding:o});}}else{if(E==="search"){this.fireSearch({value:v,clearButtonPressed:i});}else if(E==="liveChange"){this.fireLiveChange({value:v});}}}return this;};k.prototype._setBusy=function(i){if(this._iTableUpdateRequested){if(i){this._oSearchField.setEnabled(false);this._oTable.addStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','inline-block');}else{this._oSearchField.setEnabled(true);this._oTable.removeStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','none');}}};k.prototype._updateStarted=function(E){if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){if(this._oDialog.isOpen()&&this._iTableUpdateRequested){this._setBusy(true);}else{this._bInitBusy=true;}}};k.prototype._updateFinished=function(E){this._updateSelectionIndicator();if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){this._setBusy(false);this._bInitBusy=false;}if(a.system.desktop){if(this._oTable.getItems()[0]){this._oDialog.setInitialFocus(this._oTable.getItems()[0]);}else{this._oDialog.setInitialFocus(this._oSearchField);}if(this._bFirstRequest){var F=this._oTable.getItems()[0];if(!F){F=this._oSearchField;}if(F.getFocusDomRef()){F.getFocusDomRef().focus();}}}this._bFirstRequest=false;this._iTableUpdateRequested=0;};k.prototype._getOkButton=function(){var t=this,o=null;o=function(){t._sSearchFieldValue=null;t._oSelectedItem=t._oTable.getSelectedItem();t._aSelectedItems=t._oTable.getSelectedItems();t._oDialog.detachAfterClose(o);t._fireConfirmAndUpdateSelection();};if(!this._oOkButton){this._oOkButton=new B(this.getId()+"-ok",{type:h.Emphasized,text:this.getConfirmButtonText()||this._oRb.getText("SELECT_CONFIRM_BUTTON"),press:function(){t._oDialog.attachAfterClose(o);t._oDialog.close();}});}return this._oOkButton;};k.prototype._getCancelButton=function(){var t=this;if(!this._oCancelButton){this._oCancelButton=new B(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(){t._onCancel();}});}return this._oCancelButton;};k.prototype._getClearButton=function(){if(!this._oClearButton){this._oClearButton=new B(this.getId()+"-clear",{text:this._oRb.getText("TABLESELECTDIALOG_CLEARBUTTON"),press:function(){this._removeSelection();this._updateSelectionIndicator();this._oDialog.focus();}.bind(this)});}return this._oClearButton;};k.prototype._onCancel=function(E){var t=this,A=null;A=function(){t._oSelectedItem=null;t._aSelectedItems=[];t._sSearchFieldValue=null;t._oDialog.detachAfterClose(A);t.fireCancel();};t._resetSelection();this._oDialog.attachAfterClose(A);this._oDialog.close();};k.prototype._updateSelectionIndicator=function(){var s=this._oTable.getSelectedContextPaths(true).length,i=this._oTable.getInfoToolbar();if(this.getShowClearButton()&&this._oClearButton){this._oClearButton.setEnabled(s>0);}i.setVisible(!!s);i.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[s]));};k.prototype._fireConfirmAndUpdateSelection=function(){var p={selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems};Object.defineProperty(p,"selectedContexts",{get:this._oTable.getSelectedContexts.bind(this._oTable,true)});this.fireConfirm(p);this._updateSelection();};k.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._removeSelection();}};k.prototype._removeSelection=function(){this._oTable.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems;};k.prototype._resetSelection=function(){var i=0;if(!this.bIsDestroyed){var o=this._oTable.getBinding("items");if(o&&o.aFilters&&o.aFilters.length){o.filter([]);}this._oTable.removeSelections();for(;i<this._aInitiallySelectedItems.length;i++){this._oTable.setSelectedItem(this._aInitiallySelectedItems[i]);}}};return k;});
