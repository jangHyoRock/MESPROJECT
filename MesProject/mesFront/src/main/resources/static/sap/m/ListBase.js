/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/events/KeyCodes","sap/ui/Device","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/LabelEnablement","sap/ui/core/delegate/ItemNavigation","./library","./InstanceManager","./GrowingEnablement","./GroupHeaderListItem","./ListItemBase","./ListBaseRenderer","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/dom/jquery/control","sap/ui/dom/jquery/Selectors","sap/ui/dom/jquery/Aria"],function(K,D,C,a,I,L,b,l,c,G,d,f,g,h,q,j){"use strict";var k=l.ListType;var m=l.ListKeyboardMode;var n=l.ListGrowingDirection;var S=l.SwipeDirection;var o=l.ListSeparators;var p=l.ListMode;var r=l.ListHeaderDesign;var s=l.Sticky;var t=a.extend("sap.m.ListBase",{metadata:{library:"sap.m",dnd:true,properties:{inset:{type:"boolean",group:"Appearance",defaultValue:false},headerText:{type:"string",group:"Misc",defaultValue:null},headerDesign:{type:"sap.m.ListHeaderDesign",group:"Appearance",defaultValue:r.Standard,deprecated:true},footerText:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:p.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},includeItemInSelection:{type:"boolean",group:"Behavior",defaultValue:false},showUnread:{type:"boolean",group:"Misc",defaultValue:false},noDataText:{type:"string",group:"Misc",defaultValue:null},showNoData:{type:"boolean",group:"Misc",defaultValue:true},enableBusyIndicator:{type:"boolean",group:"Behavior",defaultValue:true},modeAnimationOn:{type:"boolean",group:"Misc",defaultValue:true},showSeparators:{type:"sap.m.ListSeparators",group:"Appearance",defaultValue:o.All},swipeDirection:{type:"sap.m.SwipeDirection",group:"Misc",defaultValue:S.Both},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:20},growingTriggerText:{type:"string",group:"Appearance",defaultValue:null},growingScrollToLoad:{type:"boolean",group:"Behavior",defaultValue:false},growingDirection:{type:"sap.m.ListGrowingDirection",group:"Behavior",defaultValue:n.Downwards},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:true},keyboardMode:{type:"sap.m.ListKeyboardMode",group:"Behavior",defaultValue:m.Navigation},sticky:{type:"sap.m.Sticky[]",group:"Appearance"}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",bindable:"bindable",selector:"#{id} .sapMListItems",dnd:true},swipeContent:{type:"sap.ui.core.Control",multiple:false},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false},contextMenu:{type:"sap.ui.core.IContextMenu",multiple:false},_messageStrip:{type:"sap.m.MessageStrip",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}},selectionChange:{parameters:{listItem:{type:"sap.m.ListItemBase"},listItems:{type:"sap.m.ListItemBase[]"},selected:{type:"boolean"},selectAll:{type:"boolean"}}},"delete":{parameters:{listItem:{type:"sap.m.ListItemBase"}}},swipe:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"},swipeContent:{type:"sap.ui.core.Control"},srcControl:{type:"sap.ui.core.Control"},swipeDirection:{type:"sap.m.SwipeDirection"}}},growingStarted:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},growingFinished:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},updateStarted:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},updateFinished:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},itemPress:{parameters:{listItem:{type:"sap.m.ListItemBase"},srcControl:{type:"sap.ui.core.Control"}}},beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}}},designtime:"sap/m/designtime/ListBase.designtime"}});t.prototype.bAnnounceDetails=true;t.prototype.bPreventMassSelection=false;t.getInvisibleText=function(){return this.oInvisibleText||(this.oInvisibleText=new I().toStatic());};t.prototype.sNavItemClass="sapMLIB";t.prototype.init=function(){this._aNavSections=[];this._aSelectedPaths=[];this._iItemNeedsHighlight=0;this._iItemNeedsNavigated=0;this._bItemsBeingBound=false;this._bSkippedInvalidationOnRebind=false;this.data("sap-ui-fastnavgroup","true",true);};t.prototype.onBeforeRendering=function(){this._bRendering=true;this._bActiveItem=false;this._aNavSections=[];this._removeSwipeContent();};t.prototype.onAfterRendering=function(){this._bRendering=false;this._sLastMode=this.getMode();if(D.system.desktop){this._startItemNavigation(true);}};t.prototype.exit=function(){this._oSelectedItem=null;this._aNavSections=[];this._aSelectedPaths=[];this._destroyGrowingDelegate();this._destroyItemNavigation();};t.prototype.refreshItems=function(R){if(this._oGrowingDelegate){this._oGrowingDelegate.refreshItems(R);}else{if(!this._bReceivingData){this._updateStarted(R);this._bReceivingData=true;}this.refreshAggregation("items");}};t.prototype.updateItems=function(R,e){if(e&&e.detailedReason==="AddVirtualContext"){u(this);return;}else if(e&&e.detailedReason==="RemoveVirtualContext"){v(this);return;}if(this._bSkippedInvalidationOnRebind&&this.getBinding("items").getLength()===0){this.invalidate();}if(this._oGrowingDelegate){this._oGrowingDelegate.updateItems(R);}else{if(this._bReceivingData){this._bReceivingData=false;}else{this._updateStarted(R);}this.updateAggregation("items");this._updateFinished();}this._bSkippedInvalidationOnRebind=false;};function u(e){var B=e.getBinding("items");var i=e.getBindingInfo("items");var V=B.getContexts(0,e.getGrowing()?e.getGrowingThreshold():i.length)[0];v(e);e._oVirtualItem=G.createItem(V,i,"virtual");e.addAggregation("dependents",e._oVirtualItem,true);}function v(e){if(e._oVirtualItem){e._oVirtualItem.destroy();delete e._oVirtualItem;}}t.prototype.setBindingContext=function(e,M){var i=(this.getBindingInfo("items")||{}).model;if(i===M){this._resetItemsBinding();}return a.prototype.setBindingContext.apply(this,arguments);};t.prototype.bindAggregation=function(N){this._bItemsBeingBound=N==="items";v(this);a.prototype.bindAggregation.apply(this,arguments);this._bItemsBeingBound=false;return this;};t.prototype._bindAggregation=function(N,B){function e(B,E,H){B.events=B.events||{};if(!B.events[E]){B.events[E]=H;}else{var O=B.events[E];B.events[E]=function(){H.apply(this,arguments);O.apply(this,arguments);};}}if(N==="items"){this._resetItemsBinding();e(B,"dataRequested",this._onBindingDataRequestedListener.bind(this));e(B,"dataReceived",this._onBindingDataReceivedListener.bind(this));}a.prototype._bindAggregation.call(this,N,B);};t.prototype._onBindingDataRequestedListener=function(e){this._showBusyIndicator();if(this._dataReceivedHandlerId!=null){clearTimeout(this._dataReceivedHandlerId);delete this._dataReceivedHandlerId;}};t.prototype._onBindingDataReceivedListener=function(e){if(this._dataReceivedHandlerId!=null){clearTimeout(this._dataReceivedHandlerId);delete this._dataReceivedHandlerId;}this._dataReceivedHandlerId=setTimeout(function(){this._hideBusyIndicator();delete this._dataReceivedHandlerId;}.bind(this),0);};t.prototype.destroyItems=function(e){if(!this.getItems(true).length){return this;}this._oSelectedItem=null;this.destroyAggregation("items","KeepDom");if(!e){if(this._bItemsBeingBound){this._bSkippedInvalidationOnRebind=true;}else{this.invalidate();}}return this;};t.prototype.removeAllItems=function(A){this._oSelectedItem=null;return this.removeAllAggregation("items");};t.prototype.removeItem=function(i){var e=this.removeAggregation("items",i);if(e&&e===this._oSelectedItem){this._oSelectedItem=null;}return e;};t.prototype.getItems=function(R){if(R){return this.mAggregations["items"]||[];}return this.getAggregation("items",[]);};t.prototype.getId=function(e){var i=this.sId;return e?i+"-"+e:i;};t.prototype.setGrowing=function(e){e=!!e;if(this.getGrowing()!=e){this.setProperty("growing",e,!e);if(e){this._oGrowingDelegate=new G(this);}else if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null;}}return this;};t.prototype.setGrowingThreshold=function(T){return this.setProperty("growingThreshold",T,true);};t.prototype.setEnableBusyIndicator=function(e){this.setProperty("enableBusyIndicator",e,true);if(!this.getEnableBusyIndicator()){this._hideBusyIndicator();}return this;};t.prototype.setNoDataText=function(N){this.setProperty("noDataText",N,true);this.$("nodata-text").text(this.getNoDataText());return this;};t.prototype.getNoDataText=function(e){if(e&&this._bBusy){return"";}var N=this.getProperty("noDataText");N=N||C.getLibraryResourceBundle("sap.m").getText("LIST_NO_DATA");return N;};t.prototype.getSelectedItem=function(){var e=this.getItems(true);for(var i=0;i<e.length;i++){if(e[i].getSelected()){return e[i];}}return null;};t.prototype.setSelectedItem=function(e,i,F){if(this.indexOfItem(e)<0){j.warning("setSelectedItem is called without valid ListItem parameter on "+this);return;}if(this._bSelectionMode){e.setSelected((i===undefined)?true:!!i);F&&this._fireSelectionChangeEvent([e]);}};t.prototype.getSelectedItems=function(){return this.getItems(true).filter(function(i){return i.getSelected();});};t.prototype.setSelectedItemById=function(i,e){var w=C.byId(i);return this.setSelectedItem(w,e);};t.prototype.getSelectedContexts=function(A){var B=this.getBindingInfo("items"),M=(B||{}).model,e=this.getModel(M);if(!B||!e){return[];}if(A&&this.getRememberSelections()){return this._aSelectedPaths.map(function(P){return e.getContext(P);});}return this.getSelectedItems().map(function(i){return i.getBindingContext(M);});};t.prototype.removeSelections=function(A,F,e){var i=[];this._oSelectedItem=null;A&&(this._aSelectedPaths=[]);this.getItems(true).forEach(function(w){if(!w.getSelected()){return;}if(e&&w.isSelectedBoundTwoWay()){return;}w.setSelected(false,true);i.push(w);!A&&this._updateSelectedPaths(w);},this);if(F&&i.length){this._fireSelectionChangeEvent(i);}return this;};t.prototype.selectAll=function(F){if(this.getMode()!="MultiSelect"){return this;}var e=[];this.getItems(true).forEach(function(i){if(!i.getSelected()){i.setSelected(true,true);e.push(i);this._updateSelectedPaths(i);}},this);if(F&&e.length){this._fireSelectionChangeEvent(e,F);}return this;};t.prototype.getLastMode=function(M){return this._sLastMode;};t.prototype.setMode=function(M){M=this.validateProperty("mode",M);var O=this.getMode();if(O==M){return this;}this._bSelectionMode=M.indexOf("Select")>-1;if(!this._bSelectionMode){this.removeSelections(true);}else{var e=this.getSelectedItems();if(e.length>1){this.removeSelections(true);}else if(O===p.MultiSelect){this._oSelectedItem=e[0];}}return this.setProperty("mode",M);};t.prototype.getGrowingInfo=function(){return this._oGrowingDelegate?this._oGrowingDelegate.getInfo():null;};t.prototype.setRememberSelections=function(R){this.setProperty("rememberSelections",R,true);!this.getRememberSelections()&&(this._aSelectedPaths=[]);return this;};t.prototype.setSelectedContextPaths=function(e){this._aSelectedPaths=e||[];};t.prototype.getSelectedContextPaths=function(A){if(!A||(A&&this.getRememberSelections())){return this._aSelectedPaths.slice(0);}return this.getSelectedItems().map(function(i){return i.getBindingContextPath();});};t.prototype.isAllSelectableSelected=function(){if(this.getMode()!=p.MultiSelect){return false;}var i=this.getItems(true),e=this.getSelectedItems().length,w=i.filter(function(x){return x.isSelectable();}).length;return(i.length>0)&&(e==w);};t.prototype.getVisibleItems=function(){return this.getItems(true).filter(function(i){return i.getVisible();});};t.prototype.getActiveItem=function(){return this._bActiveItem;};t.prototype.onItemDOMUpdate=function(e){if(!this._bRendering&&this.bOutput){this._startItemNavigation(true);}var V=this.getVisibleItems().length>0;if(!V&&!this._bInvalidatedForNoData){this.invalidate();this._bInvalidatedForNoData=true;}else if(V&&this._bInvalidatedForNoData){this.invalidate();this._bInvalidatedForNoData=false;}};t.prototype.onItemActiveChange=function(e,A){this._bActiveItem=A;};t.prototype.onItemHighlightChange=function(i,N){this._iItemNeedsHighlight+=(N?1:-1);if(this._iItemNeedsHighlight==1&&N){this.$("listUl").addClass("sapMListHighlight");}else if(this._iItemNeedsHighlight==0){this.$("listUl").removeClass("sapMListHighlight");}};t.prototype.onItemNavigatedChange=function(i,N){this._iItemNeedsNavigated+=(N?1:-1);if(this._iItemNeedsNavigated==1&&N){this.$("listUl").addClass("sapMListNavigated");}else if(this._iItemNeedsNavigated==0){this.$("listUl").removeClass("sapMListNavigated");}};t.prototype.onItemSelectedChange=function(e,i){if(this.getMode()==p.MultiSelect){this._updateSelectedPaths(e,i);return;}if(i){this._aSelectedPaths=[];this._oSelectedItem&&this._oSelectedItem.setSelected(false,true);this._oSelectedItem=e;}else if(this._oSelectedItem===e){this._oSelectedItem=null;}this._updateSelectedPaths(e,i);};t.prototype.getItemsContainerDomRef=function(){return this.getDomRef("listUl");};t.prototype.checkGrowingFromScratch=function(){};t.prototype.onBeforePageLoaded=function(e,i){this._fireUpdateStarted(i,e);this.fireGrowingStarted(e);};t.prototype.onAfterPageLoaded=function(e,i){this._fireUpdateFinished(e);this.fireGrowingFinished(e);};t.prototype.addNavSection=function(i){this._aNavSections.push(i);return i;};t.prototype.getMaxItemsCount=function(){var B=this.getBinding("items");if(B&&B.getLength){return B.getLength()||0;}return this.getItems(true).length;};t.prototype.shouldRenderItems=function(){return true;};t.prototype._resetItemsBinding=function(){if(this.isBound("items")){this._bUpdating=false;this._bReceivingData=false;this.removeSelections(true,false,true);this._oGrowingDelegate&&this._oGrowingDelegate.reset();this._hideBusyIndicator();if(this._oItemNavigation){this._oItemNavigation.iFocusedIndex=-1;}}};t.prototype._updateStarted=function(R){if(!this._bReceivingData&&!this._bUpdating){this._bUpdating=true;this._fireUpdateStarted(R);}};t.prototype._fireUpdateStarted=function(R,i){this._sUpdateReason=h(R||"Refresh");this.fireUpdateStarted({reason:this._sUpdateReason,actual:i?i.actual:this.getItems(true).length,total:i?i.total:this.getMaxItemsCount()});};t.prototype.onThemeChanged=function(){if(this._oGrowingDelegate){this._oGrowingDelegate._updateTrigger();}};t.prototype._updateFinished=function(){if(!this._bReceivingData&&this._bUpdating){this._fireUpdateFinished();this._bUpdating=false;}};t.prototype._fireUpdateFinished=function(i){this._hideBusyIndicator();setTimeout(function(){this._bItemNavigationInvalidated=true;this.fireUpdateFinished({reason:this._sUpdateReason,actual:i?i.actual:this.getItems(true).length,total:i?i.total:this.getMaxItemsCount()});}.bind(this),0);};t.prototype._showBusyIndicator=function(){if(this.getEnableBusyIndicator()&&!this.getBusy()&&!this._bBusy){this._bBusy=true;this._sBusyTimer=setTimeout(function(){this.$("nodata-text").text("");}.bind(this),this.getBusyIndicatorDelay());this.setBusy(true,"listUl");}};t.prototype._hideBusyIndicator=function(){if(this._bBusy){this._bBusy=false;this.setBusy(false,"listUl");clearTimeout(this._sBusyTimer);if(!this.getItems(true).length){this.$("nodata-text").text(this.getNoDataText());}}};t.prototype.setBusy=function(B,e){if(this.getBusy()==B){return this;}a.prototype.setBusy.apply(this,arguments);if(!B||!window.IntersectionObserver){clearTimeout(this._iBusyTimer);return this;}this._iBusyTimer=setTimeout(function(){var i=this.getDomRef(e);var A=this.getDomRef("busyIndicator");var w=l.getScrollDelegate(this,true);if(!i||!A||!w){return;}var x=new window.IntersectionObserver(function(E){x.disconnect();var y=E.pop();var R=y.intersectionRatio;if(R<=0||R>=1){return;}var z=A.firstChild.style;if(y.intersectionRect.height>=y.rootBounds.height){z.position="sticky";}else{z.top=((y.boundingClientRect.top<0?1-R:0)+(R/2))*100+"%";}},{root:w.getContainerDomRef()});x.observe(i);}.bind(this),this.getBusyIndicatorDelay());return this;};t.prototype.onItemBindingContextSet=function(i){if(!this._bSelectionMode||!this.getRememberSelections()||!this.isBound("items")){return;}if(i.isSelectedBoundTwoWay()){return;}var P=i.getBindingContextPath();if(P){var e=(this._aSelectedPaths.indexOf(P)>-1);i.setSelected(e);}};t.prototype.onItemInserted=function(i,e){if(e){this.onItemSelectedChange(i,true);}if(!this._bSelectionMode||!this._aSelectedPaths.length||!this.getRememberSelections()||!this.isBound("items")||i.isSelectedBoundTwoWay()||i.getSelected()){return;}var P=i.getBindingContextPath();if(P&&this._aSelectedPaths.indexOf(P)>-1){i.setSelected(true);}};t.prototype.onItemSelect=function(e,w){var M=this.getMode();if(this._mRangeSelection&&!this.bPreventMassSelection){if(!this._mRangeSelection.selected){this._fireSelectionChangeEvent([e]);this._mRangeSelection.index=this.getVisibleItems().indexOf(e);this._mRangeSelection.selected=w;return;}if(!w){e.setSelected(true);return;}var x=this.indexOfItem(e),y=this.getItems(),z,A,B=[],E;if(x<this._mRangeSelection.index){z=this._mRangeSelection.index-x;E=-1;}else{z=x-this._mRangeSelection.index;E=1;}for(var i=1;i<=z;i++){A=y[this._mRangeSelection.index+(i*E)];if(A.isSelectable()&&A.getVisible()&&!A.getSelected()){A.setSelected(true);B.push(A);}else if(A===e){B.push(A);}}this._fireSelectionChangeEvent(B);return;}if(M===p.MultiSelect){this._fireSelectionChangeEvent([e]);}else if(this._bSelectionMode&&w){this._fireSelectionChangeEvent([e]);}};t.prototype._fireSelectionChangeEvent=function(e,i){var w=e&&e[0];if(!w){return;}this.fireSelectionChange({listItem:w,listItems:e,selected:w.getSelected(),selectAll:!!i});if(this.getGrowing()){this._bSelectAll=i;}this.fireSelect({listItem:w});};t.prototype.onItemDelete=function(e){this.fireDelete({listItem:e});};t.prototype.onItemPress=function(e,i){if(e.getType()==k.Inactive){return;}setTimeout(function(){this.fireItemPress({listItem:e,srcControl:i});}.bind(this),0);};t.prototype.onItemKeyDown=function(i,e){if(!e.shiftKey||e.ctrlKey||e.altKey||e.metaKey||this.getMode()!==p.MultiSelect||!i.isSelectable()||this.bPreventMassSelection||e.which===K.F6){if(this._mRangeSelection){this._mRangeSelection=null;}return;}var V=this.getVisibleItems(),H=V.some(function(w){return!!w.getSelected();});if(!H){return;}if(!this._mRangeSelection){this._mRangeSelection={index:V.indexOf(i),selected:i.getSelected()};}};t.prototype.onItemKeyUp=function(i,e){if(e.which===K.SHIFT){this._mRangeSelection=null;}};t.prototype._updateSelectedPaths=function(i,e){if(!this.getRememberSelections()||!this.isBound("items")){return;}var P=i.getBindingContextPath();if(!P){return;}e=(e===undefined)?i.getSelected():e;var w=this._aSelectedPaths.indexOf(P);if(e){w<0&&this._aSelectedPaths.push(P);}else{w>-1&&this._aSelectedPaths.splice(w,1);}};t.prototype._destroyGrowingDelegate=function(){if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null;}};t.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null;}};t.prototype._getTouchBlocker=function(){return this.$().children();};t.prototype._getSwipeContainer=function(){return this._$swipeContainer||(this._$swipeContainer=q("<div>",{"id":this.getId("swp"),"class":"sapMListSwp"}));};t.prototype._setSwipePosition=function(){if(this._isSwipeActive){return this._getSwipeContainer().css("top",this._swipedItem.$().position().top);}};t.prototype._renderSwipeContent=function(){var $=this._swipedItem.$(),e=this._getSwipeContainer();this.$().prepend(e.css({top:$.position().top,height:$.outerHeight(true)}));if(this._bRerenderSwipeContent){this._bRerenderSwipeContent=false;var i=C.createRenderManager();i.render(this.getSwipeContent(),e.empty()[0]);i.destroy();}return this;};t.prototype._swipeIn=function(){var i=this,$=i._getTouchBlocker(),w=i._getSwipeContainer();i._isSwipeActive=true;i._renderSwipeContent();c.addPopoverInstance(i);window.document.activeElement.blur();q(window).on("resize.swp",function(){i._setSwipePosition();});$.css("pointer-events","none").on("touchstart.swp mousedown.swp",function(e){if(!w[0].firstChild.contains(e.target)){e.preventDefault();e.stopPropagation();}});w.on("webkitAnimationEnd animationend",function(){q(this).off("webkitAnimationEnd animationend");w.css("opacity",1).trigger("focus");$.parent().on("touchend.swp touchcancel.swp mouseup.swp",function(e){if(!w[0].firstChild.contains(e.target)){i.swipeOut();}});}).removeClass("sapMListSwpOutAnim").addClass("sapMListSwpInAnim");};t.prototype._onSwipeOut=function(e){this._getSwipeContainer().css("opacity",0).remove();q(window).off("resize.swp");this._getTouchBlocker().css("pointer-events","auto").off("touchstart.swp mousedown.swp");if(typeof e=="function"){e.call(this,this._swipedItem,this.getSwipeContent());}this._isSwipeActive=false;c.removePopoverInstance(this);};t.prototype.swipeOut=function(e){if(!this._isSwipeActive){return this;}var i=this,$=this._getSwipeContainer();this._getTouchBlocker().parent().off("touchend.swp touchend.swp touchcancel.swp mouseup.swp");$.on("webkitAnimationEnd animationend",function(){q(this).off("webkitAnimationEnd animationend");i._onSwipeOut(e);}).removeClass("sapMListSwpInAnim").addClass("sapMListSwpOutAnim");return this;};t.prototype._removeSwipeContent=function(){if(this._isSwipeActive){this.swipeOut()._onSwipeOut();}};t.prototype.close=t.prototype._removeSwipeContent;t.prototype._onSwipe=function(e,i){var w=this.getSwipeContent(),x=e.srcControl;if(w&&x&&!this._isSwipeActive&&this!==x&&!this._eventHandledByControl&&D.support.touch){for(var y=x;y&&!(y instanceof f);y=y.oParent);if(y instanceof f){this._swipedItem=y;this.fireSwipe({listItem:this._swipedItem,swipeContent:w,srcControl:x,swipeDirection:i},true)&&this._swipeIn();}}};t.prototype.ontouchstart=function(e){this._eventHandledByControl=e.isMarked();};t.prototype.onswipeleft=function(e){var R=C.getConfiguration().getRTL();var i=R?S.EndToBegin:S.BeginToEnd;var w=this.getSwipeDirection();if(w===S.LeftToRight){w=S.BeginToEnd;}else if(w===S.RightToLeft){w=S.EndToBegin;}if(w!=i){if(w==S.Both){w=R?S.BeginToEnd:S.EndToBegin;}this._onSwipe(e,w);}};t.prototype.onswiperight=function(e){var R=C.getConfiguration().getRTL();var i=R?S.BeginToEnd:S.EndToBegin;var w=this.getSwipeDirection();if(w===S.LeftToRight){w=S.BeginToEnd;}else if(w===S.RightToLeft){w=S.EndToBegin;}if(w!=i){if(w==S.Both){w=R?S.EndToBegin:S.BeginToEnd;}this._onSwipe(e,w);}};t.prototype.setSwipeDirection=function(e){return this.setProperty("swipeDirection",e,true);};t.prototype.getSwipedItem=function(){return(this._isSwipeActive?this._swipedItem:null);};t.prototype.setSwipeContent=function(e){this._bRerenderSwipeContent=true;this.toggleStyleClass("sapMListSwipable",!!e);return this.setAggregation("swipeContent",e,!this._isSwipeActive);};t.prototype.invalidate=function(O){if(O&&O===this.getSwipeContent()){this._bRerenderSwipeContent=true;this._isSwipeActive&&this._renderSwipeContent();return;}return a.prototype.invalidate.apply(this,arguments);};t.prototype.addItemGroup=function(e,H,i){if(!H){H=new d();H.setTitle(e.text||e.key);}H._bGroupHeader=true;this.addAggregation("items",H,i);return H;};t.prototype.removeGroupHeaders=function(e){this.getItems(true).forEach(function(i){if(i.isGroupHeader()){i.destroy(e);}});};t.prototype.getAccessibilityType=function(){return C.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LIST");};t.prototype.getAccessibilityStates=function(){if(!this.getItems(true).length){return"";}var e="",M=p,i=this.getMode(),B=C.getLibraryResourceBundle("sap.m");if(L.isRequired(this)){e+=B.getText("LIST_REQUIRED")+" ";}if(i==M.MultiSelect){e+=B.getText("LIST_MULTISELECTABLE")+" . ";}else if(i==M.Delete){e+=B.getText("LIST_DELETABLE")+" . ";}else if(i!=M.None){e+=B.getText("LIST_SELECTABLE")+" . ";}if(this.isGrouped()){e+=B.getText("LIST_GROUPED")+" . ";}return e;};t.prototype.getAccessibilityInfo=function(){return{description:this.getAccessibilityStates().trim(),focusable:true};};t.prototype.getAccessbilityPosition=function(i){var e=0,w=this.getVisibleItems(),P=w.indexOf(i)+1,B=this.getBinding("items");if(this.getGrowing()&&this.getGrowingScrollToLoad()&&B&&B.isLengthFinal()){e=B.getLength();if(B.isGrouped()){e+=w.filter(function(i){return i.isGroupHeader()&&i.getVisible();}).length;}}else{e=w.length;}return{setSize:e,posInset:P};};t.prototype.onItemFocusIn=function(i,F){this._handleStickyItemFocus(i.getDomRef());if(i!==F||!C.getConfiguration().getAccessibility()){return;}var e=i.getDomRef(),P=this.getAccessbilityPosition(i);if(D.browser.msie&&this._oItemNavigation&&this._oItemNavigation.getFocusedDomRef()===e){e.classList.remove("sapMLIBFocusable");setTimeout(function(){e.classList.add("sapMLIBFocusable");},0);}if(!i.getContentAnnouncement){this.getNavigationRoot().setAttribute("aria-activedescendant",e.id);e.setAttribute("aria-posinset",P.posInset);e.setAttribute("aria-setsize",P.setSize);}else{var A=i.getAccessibilityInfo(),B=C.getLibraryResourceBundle("sap.m"),w=A.type+" . ";if(!D.browser.chrome||this.isA("sap.m.Table")){w+=B.getText("LIST_ITEM_POSITION",[P.posInset,P.setSize])+" . ";}else{e.setAttribute("aria-posinset",P.posInset);e.setAttribute("aria-setsize",P.setSize);}w+=A.description;this.updateInvisibleText(w,e);return w;}};t.prototype.updateInvisibleText=function(T,i,P){var e=t.getInvisibleText(),F=q(i||document.activeElement);if(this.bAnnounceDetails){this.bAnnounceDetails=false;T=this.getAccessibilityInfo().description+" "+T;}e.setText(T.trim());F.addAriaLabelledBy(e.getId(),P);};t.prototype.getNavigationRoot=function(){return this.getDomRef("listUl");};t.prototype.getFocusDomRef=function(){return this.getNavigationRoot();};t.prototype._startItemNavigation=function(i){if(!D.system.desktop){return;}var e=this.getDomRef();if(!this.getShowNoData()&&!this.getVisibleItems().length&&e){e.classList.add("sapMListPreventFocus");this._destroyItemNavigation();return;}if(e){e.classList.remove("sapMListPreventFocus");}var w=this.getKeyboardMode(),x=m;if(w==x.Edit&&!this.getItems(true).length){return;}var N=this.getNavigationRoot();var T=(w==x.Edit)?-1:0;if(i&&N&&!N.contains(document.activeElement)){this._bItemNavigationInvalidated=true;if(!N.getAttribute("tabindex")){N.tabIndex=T;}return;}if(!this._oItemNavigation){this._oItemNavigation=new b();this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._setItemNavigationTabIndex(T);this._oItemNavigation.setTableMode(true,true).setColumns(1);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});}this._oItemNavigation.setPageSize(this.getGrowingThreshold());this._oItemNavigation.setRootDomRef(N);this.setNavigationItems(this._oItemNavigation,N);this._bItemNavigationInvalidated=false;};t.prototype.setNavigationItems=function(i,N){var e=q(N).children(".sapMLIB").get();i.setItemDomRefs(e);if(i.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==n.Upwards){i.setFocusedIndex(e.length-1);}else{i.setFocusedIndex(0);}}};t.prototype.getItemNavigation=function(){return this._oItemNavigation;};t.prototype._setItemNavigationTabIndex=function(T){if(this._oItemNavigation){this._oItemNavigation.iActiveTabIndex=T;this._oItemNavigation.iTabIndex=T;}};t.prototype.setKeyboardMode=function(e){this.setProperty("keyboardMode",e,true);if(this.isActive()){var T=(e==m.Edit)?-1:0;this.$("nodata").prop("tabIndex",~T);this.$("listUl").prop("tabIndex",T);this.$("after").prop("tabIndex",T);this._setItemNavigationTabIndex(T);}return this;};t.prototype.setItemFocusable=function(e){if(!this._oItemNavigation){return;}var i=this._oItemNavigation.getItemDomRefs();var w=i.indexOf(e.getDomRef());if(w>=0){this._oItemNavigation.setFocusedIndex(w);}};t.prototype.forwardTab=function(F){this._bIgnoreFocusIn=true;this.$(F?"after":"before").trigger("focus");};t.prototype.onsaptabnext=function(e){if(e.isMarked()||this.getKeyboardMode()==m.Edit){return;}if(e.target.id==this.getId("nodata")){this.forwardTab(true);e.setMarked();}};t.prototype.onsaptabprevious=function(e){if(e.isMarked()||this.getKeyboardMode()==m.Edit){return;}var T=e.target.id;if(T==this.getId("nodata")){this.forwardTab(false);}else if(T==this.getId("trigger")){this.focusPrevious();e.preventDefault();}};t.prototype._navToSection=function(F){var T;var i=0;var e=F?1:-1;var w=this._aNavSections.length;this._aNavSections.some(function(y,z){var A=(y?window.document.getElementById(y):null);if(A&&A.contains(document.activeElement)){i=z;return true;}});var x=this.getItemsContainerDomRef();var $=q(document.getElementById(this._aNavSections[i]));if($[0]===x&&this._oItemNavigation){$.data("redirect",this._oItemNavigation.getFocusedIndex());}this._aNavSections.some(function(){i=(i+e+w)%w;T=q(document.getElementById(this._aNavSections[i]));if(T[0]===x&&this._oItemNavigation){var R=T.data("redirect");var y=this._oItemNavigation.getItemDomRefs();var z=y[R]||x.children[0];T=q(z);}if(T.is(":focusable")){T.trigger("focus");return true;}},this);return T;};t.prototype.onsapshow=function(e){if(e.isMarked()||e.which==K.F4||e.target.id!=this.getId("trigger")&&!q(e.target).hasClass(this.sNavItemClass)){return;}if(this._navToSection(true)){e.preventDefault();e.setMarked();}};t.prototype.onsaphide=function(e){if(e.isMarked()||e.target.id!=this.getId("trigger")&&!q(e.target).hasClass(this.sNavItemClass)){return;}if(this._navToSection(false)){e.preventDefault();e.setMarked();}};t.prototype.onkeydown=function(e){var i=(e.which==K.A)&&(e.metaKey||e.ctrlKey);if(e.isMarked()||!i||!q(e.target).hasClass(this.sNavItemClass)||this.bPreventMassSelection){return;}e.preventDefault();if(this.getMode()!==p.MultiSelect){return;}if(this.isAllSelectableSelected()){this.removeSelections(false,true);}else{this.selectAll(true);}e.setMarked();};t.prototype.onmousedown=function(e){if(this._bItemNavigationInvalidated){this._startItemNavigation();}if(e.shiftKey&&this._mRangeSelection&&e.srcControl.getId().includes("-selectMulti")){e.preventDefault();}};t.prototype.focusPrevious=function(){if(!this._oItemNavigation){return;}var N=this._oItemNavigation.getItemDomRefs();var i=this._oItemNavigation.getFocusedIndex();var $=q(N[i]);var R=$.control(0)||{};var T=R.getTabbables?R.getTabbables():$.find(":sapTabbable");var F=T.eq(-1).add($).eq(-1);this.bAnnounceDetails=true;F.trigger("focus");};t.prototype.onfocusin=function(e){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;e.stopImmediatePropagation(true);return;}if(this._bItemNavigationInvalidated){this._startItemNavigation();}var T=e.target;if(T.id==this.getId("nodata")){this.updateInvisibleText(this.getNoDataText(),T);}if(e.isMarked()||!this._oItemNavigation||this.getKeyboardMode()==m.Edit||T.id!=this.getId("after")){return;}this.focusPrevious();e.setMarked();};t.prototype.onsapfocusleave=function(e){if(this._oItemNavigation&&!this.bAnnounceDetails&&!this.getNavigationRoot().contains(document.activeElement)){this.bAnnounceDetails=true;}};t.prototype.onItemArrowUpDown=function(e,E){var i=this.getItems(true),w=i.indexOf(e)+(E.type=="sapup"?-1:1),x=i[w];if(x&&x.isGroupHeader()){x=i[w+(E.type=="sapup"?-1:1)];}if(!x){return;}var T=x.getTabbables(),F=e.getTabbables().index(E.target),$=T.eq(T[F]?F:-1);$[0]?$.trigger("focus"):x.focus();E.preventDefault();E.setMarked();};t.prototype.onItemContextMenu=function(e,E){var i=this.getContextMenu();if(!i){return;}var w=this.fireBeforeOpenContextMenu({listItem:e,column:C.byId(q(E.target).closest(".sapMListTblCell",this.getNavigationRoot()).attr("data-sap-ui-column"))});if(w){E.setMarked();E.preventDefault();var B,x=this.getBindingInfo("items");if(x){B=e.getBindingContext(x.model);i.setBindingContext(B,x.model);}i.openAsContextMenu(E,e);}};t.prototype.onItemUpDownModifiers=function(i,e,w){if(!this._mRangeSelection||this.bPreventMassSelection){return;}var V=this.getVisibleItems(),x=V.indexOf(i),y=V[x+w];if(!y){if(this._mRangeSelection){this._mRangeSelection=null;}e.setMarked();return;}var z=y.getSelected();if(this._mRangeSelection.direction===undefined){this._mRangeSelection.direction=w;}else if(this._mRangeSelection.direction!==w){if(this._mRangeSelection.index!==V.indexOf(i)){y=i;z=y.getSelected();if(this._mRangeSelection.selected&&z){this.setSelectedItem(y,false,true);return;}}else{this._mRangeSelection.direction=w;}}if(this._mRangeSelection.selected!==z&&y.isSelectable()){this.setSelectedItem(y,this._mRangeSelection.selected,true);}};t.prototype.isGrouped=function(){var B=this.getBinding("items");return B&&B.isGrouped();};t.prototype.setContextMenu=function(e){this.setAggregation("contextMenu",e,true);return this;};t.prototype.destroyContextMenu=function(){this.destroyAggregation("contextMenu",true);return this;};t.getStickyBrowserSupport=function(){var B=D.browser;return(B.safari||B.chrome||(B.firefox&&B.version>=59)||(B.edge&&B.version>=16));};t.prototype.getStickyStyleValue=function(){var e=this.getSticky();if(!e||!e.length||!t.getStickyBrowserSupport()){return(this._iStickyValue=0);}var i=0,H=this.getHeaderText(),w=this.getHeaderToolbar(),x=H||(w&&w.getVisible()),y=this.getInfoToolbar(),z=y&&y.getVisible(),A=false;if(this.isA("sap.m.Table")){A=this.getColumns().some(function(B){return B.getVisible()&&B.getHeader();});}e.forEach(function(B){if(B===s.HeaderToolbar&&x){i+=1;}else if(B===s.InfoToolbar&&z){i+=2;}else if(B===s.ColumnHeaders&&A){i+=4;}});return(this._iStickyValue=i);};t.prototype._handleStickyItemFocus=function(i){if(!this._iStickyValue){return;}var e=l.getScrollDelegate(this,true);if(!e){return;}var T=0,w=0,x=0,y=0,H=0,z=0;if(this._iStickyValue&4){var A=this.getDomRef("tblHeader").firstChild;var B=A.getBoundingClientRect();w=parseInt(B.bottom);T=parseInt(B.height);}if(this._iStickyValue&2){var E=this.getDomRef().querySelector(".sapMListInfoTBarContainer");if(E){var F=E.getBoundingClientRect();y=parseInt(F.bottom);x=parseInt(F.height);}}if(this._iStickyValue&1){var J=this.getDomRef().querySelector(".sapMListHdr");if(J){var M=J.getBoundingClientRect();z=parseInt(M.bottom);H=parseInt(M.height);}}var N=Math.round(i.getBoundingClientRect().top);if(w>N||y>N||z>N){window.requestAnimationFrame(function(){e.scrollToElement(i,0,[0,-T-x-H]);});}};t.prototype.setHeaderToolbar=function(H){return this._setToolbar("headerToolbar",H);};t.prototype.setInfoToolbar=function(i){return this._setToolbar("infoToolbar",i);};t.prototype.scrollToIndex=function(i){var e,R,w,x;x=l.getScrollDelegate(this,true);if(!x){return;}e=this.getVisibleItems();R=e.length;if(typeof i!=='number'||i<-1){i=0;}if(i>=R||i===-1){i=R-1;}w=e[i];if(!w){return;}setTimeout(function(){x.scrollToElement(w.getDomRef(),null,[0,this._getStickyAreaHeight()*-1]);}.bind(this),0);};t.prototype._getStickyAreaHeight=function(){var e=this.getSticky();if(!(e&&e.length)){return 0;}return e.reduce(function(i,w){var x,y;switch(w){case s.HeaderToolbar:x=this.getHeaderToolbar();y=x&&x.getDomRef()||this.getDomRef("header");break;case s.InfoToolbar:x=this.getInfoToolbar();y=x&&x.getDomRef();break;case s.ColumnHeaders:y=this.getDomRef("tblHeader");break;default:}return i+(y?y.offsetHeight:0);}.bind(this),0);};t.prototype._setToolbar=function(A,T){var O=this.getAggregation(A);if(O){O.detachEvent("_change",this._onToolbarPropertyChanged,this);}this.setAggregation(A,T);if(T){T.attachEvent("_change",this._onToolbarPropertyChanged,this);}return this;};t.prototype._onToolbarPropertyChanged=function(e){if(e.getParameter("name")!=="visible"){return;}var O=this._iStickyValue,N=this.getStickyStyleValue();if(O!==N){var i=this.getDomRef();if(i){var w=i.classList;w.toggle("sapMSticky",!!N);w.remove("sapMSticky"+O);w.toggle("sapMSticky"+N,!!N);}}};return t;});
