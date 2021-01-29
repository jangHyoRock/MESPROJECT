/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./AccButton","./IconTabFilterExpandButtonBadge","sap/ui/core/library","sap/ui/core/Core","sap/ui/core/Item","sap/ui/core/Renderer","sap/ui/core/IconPool",'sap/ui/core/InvisibleMessage',"sap/ui/core/InvisibleText","sap/ui/core/Control",'sap/ui/Device',"sap/m/BadgeCustomData","sap/m/Button","sap/m/ResponsivePopover","sap/m/IconTabBarSelectList","sap/m/BadgeEnabler"],function(l,A,I,c,C,a,R,b,d,e,f,D,B,g,h,j,k){"use strict";var T=c.TextAlign;var m=c.TextDirection;var n=l.ButtonType;var P=l.PlacementType;var o=l.ImageHelper;var p=l.IconTabFilterDesign;var q=l.BadgeStyle;var r=l.BadgeState;var s=c.IconColor;var t=3000;var u=c.InvisibleMessageMode;var v=a.extend("sap.m.IconTabFilter",{metadata:{interfaces:["sap.m.IconTab","sap.ui.core.PopupInterface","sap.m.IBadge"],library:"sap.m",designtime:"sap/m/designtime/IconTabFilter.designtime",properties:{count:{type:"string",group:"Data",defaultValue:''},showAll:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:''},iconColor:{type:"sap.ui.core.IconColor",group:"Appearance",defaultValue:s.Default},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},visible:{type:"boolean",group:"Behavior",defaultValue:true},design:{type:"sap.m.IconTabFilterDesign",group:"Appearance",defaultValue:p.Vertical}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},items:{type:"sap.m.IconTab",multiple:true,singularName:"item"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_expandButtonBadge:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});k.call(v.prototype);var w=C.getLibraryResourceBundle("sap.m");v._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault','sapMITBFilterNeutral'];v.prototype._getImageControl=function(i,x,y){var z={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};if(z.src){this._oImageControl=o.getImageControl(this.getId()+"-icon",this._oImageControl,x,z,i,y);}else if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null;}return this._oImageControl;};v.prototype.init=function(){this._oDragEventDelegate={onlongdragover:this._handleOnLongDragOver,ondragover:this._handleOnDragOver,ondragleave:this._handleOnDragLeave,ondrop:this._handleOnDrop};this.initBadgeEnablement({style:q.Attention,selector:{selector:".sapMITBBadgeHolder"}});this._oCloneInList=null;this.setAggregation("_expandButtonBadge",new I());};v.prototype.exit=function(E){if(this._oImageControl){this._oImageControl.destroy();}if(a.prototype.exit){a.prototype.exit.call(this,E);}if(this._invisibleText){this._invisibleText.destroy();this._invisibleText=null;}if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}if(this._oExpandButton){this._oExpandButton.removeEventDelegate(this._oDragEventDelegate);this._oExpandButton.destroy();this._oExpandButton=null;}this.removeEventDelegate(this._oDragEventDelegate);this._oDragEventDelegate=null;if(this._iHideBadgeTimeout){clearTimeout(this._iHideBadgeTimeout);}};v.prototype.invalidate=function(){var i=this.getParent(),x,O;if(!i){return;}x=i.getParent();if(!(x instanceof sap.m.IconTabBar)){i.invalidate();return;}O=x.getParent();if(O instanceof sap.m.ObjectHeader){O.invalidate();}else{x.invalidate();}};v.prototype.setProperty=function(i,V,S){switch(i){case'textDirection':case'text':case'count':case'showAll':case'icon':case'iconColor':case'iconDensityAware':case'design':if(this.getProperty(i)===V){return this;}f.prototype.setProperty.call(this,i,V,true);if(!S){var x=this.getParent();if(x instanceof sap.m.IconTabHeader){x.invalidate();}}break;default:f.prototype.setProperty.apply(this,arguments);break;}return this;};v.prototype._getNonEmptyKey=function(){var K=this.getKey();if(K){return K;}return this.getId();};v.prototype._getRealTab=function(){return this._oRealItem||this;};v.prototype._getRootTab=function(){var i=this._getRealTab(),x=i.getParent();while(x&&x.isA("sap.m.IconTabFilter")){i=x;x=x.getParent();}return i;};v.prototype._getNestedLevel=function(){var i=this._getRealTab().getParent(),L;for(L=1;i&&i.isA("sap.m.IconTabFilter");L++){i=i.getParent();}return L;};v.prototype.render=function(i,V,x){if(!this.getVisible()){return;}this._prepareDragEventDelegate();var y=this.getParent(),z=y.getParent(),H=y._isInsideIconTabBar(),E={role:"tab"},F=this.getId(),G=this.getCount(),J=this.getText(),K=this.getIcon(),L=this.getIconColor(),S=L==='Positive'||L==='Critical'||L==='Negative'||L==='Neutral',M=this.getDesign()===p.Horizontal,N=y._bTextOnly,O=y._bInLine||y.isInlineMode(),Q=this.getShowAll();if(H){E.controls=z.getId()+"-content";}if(this.getItems().length){E.roledescription=w.getText("ICONTABFILTER_SPLIT_TAB");}if(J.length||G!==""||K){var U=[];if(G!==""){U.push(F+"-count");}if(J.length){U.push(F+"-text");}if(K){U.push(F+"-icon");}if(S){U.push(F+"-iconColor");}E.labelledby=U.join(" ");}if(V!==undefined&&x!==undefined){Object.assign(E,{posinset:V+1,setsize:x});}i.openStart("div",this).accessibilityState(E).class("sapMITBItem");if(!G){i.class("sapMITBItemNoCount");}if(M){i.class("sapMITBHorizontal");}else{i.class("sapMITBVertical");}if(Q){i.class("sapMITBAll");}else{i.class("sapMITBFilter").class("sapMITBFilter"+L);}if(y._isUnselectable(this)){i.class("sapMITHUnselectable");}if(this.getItems().length>0){i.class("sapMITBFilterWithItems");}if(!this.getEnabled()){i.class("sapMITBDisabled").attr("aria-disabled",true);}i.attr("aria-selected",false);var W=this.getTooltip_AsString();if(W){i.attr("title",W);}if(this._bIsOverflow||this.getItems().length){i.attr("aria-haspopup","menu");}i.openEnd();i.openStart("div").class("sapMITBFilterWrapper").openEnd();if(!O){i.openStart("div",F+"-tab").class("sapMITBTab").openEnd();if(!Q||!K){if(S){i.openStart("div",F+"-iconColor").style("display","none").openEnd().text(w.getText('ICONTABBAR_ICONCOLOR_'+L.toUpperCase())).close("div");}i.renderControl(this._getImageControl(['sapMITBFilterIcon',"sapMITBBadgeHolder",'sapMITBFilter'+L],y,v._aAllIconColors));}if(!Q&&!K&&!N){i.openStart("span").class("sapMITBFilterNoIcon").openEnd().close("span");}if(M&&!Q){i.close("div");i.openStart("div").class("sapMITBHorizontalWrapper").openEnd();}i.openStart("span",F+"-count").class("sapMITBCount");if(Q||(!K&&!J.length)){i.class("sapMITBBadgeHolder");}i.openEnd();if(G===""&&M){i.unsafeHtml("&nbsp;");}else{i.text(G);}i.close("span");if(!M){i.close("div");}}if(J.length){i.openStart("div",F+"-text").class("sapMITBText");if(H&&z.getUpperCase()){i.class("sapMITBTextUpperCase");}if(O){i.attr("dir","ltr");}i.openEnd();i.openStart("span").class("sapMITHTextContent");if(!K&&!Q){i.class("sapMITBBadgeHolder");}i.openEnd();i.text(y._getDisplayText(this));i.close("span");if(this._bIsOverflow||this.getItems().length&&y._isUnselectable(this)){i.openStart("span",this.getId()+"-expandButton").class("sapMITHShowSubItemsIcon").openEnd();i.icon(b.getIconURI("slim-arrow-down"),null,{"title":null,"aria-hidden":true});i.close("span");}i.close("div");}if(!O&&M){i.close("div");}i.openStart("div").class("sapMITBContentArrow").openEnd().close("div");i.close("div");if(this.getItems().length&&!y._isUnselectable(this)){i.openStart("span").accessibilityState({role:"separator"}).openEnd().close("span");i.renderControl(this._getExpandButton());}i.renderControl(this.getAggregation("_expandButtonBadge"));if(this.getItems().length){this._updateExpandButtonBadge();}i.close("div");};v.prototype.renderInSelectList=function(i,S,x,y,z){if(this._invisibleText){this._invisibleText.destroy();this._invisibleText=null;}if(!this.getVisible()){return;}var E=true,F=S._bIconOnly,G=S._oIconTabHeader;if(G){E=G._bTextOnly;}i.openStart("li",this).class("sapMITBSelectItem").attr("tabindex","-1").attr("role","menuitem");if(z){i.style("padding-left",z+"rem");}if(x!==undefined&&y!==undefined){i.attr("aria-posinset",x+1);i.attr("aria-setsize",y);i.attr("aria-level",this._getNestedLevel());}var H=this.getTooltip_AsString();if(H){i.attr("title",H);}if(G._isUnselectable(this)){i.class("sapMITHUnselectable");}if(!this.getEnabled()){i.class("sapMITBDisabled").attr("aria-disabled",true);}if(S.getSelectedItem()==this){i.class("sapMITBSelectItemSelected");i.attr("aria-selected",true);}var J=this.getIconColor();i.class("sapMITBFilter"+J);var K=this.getId(),L=J=='Positive'||J=='Critical'||J=='Negative'||J=='Neutral',M=[];if(!F){M.push(K+"-text");}if(!E&&this.getIcon()){M.push(K+"-icon");}if(L){this._invisibleText=new e({text:w.getText('ICONTABBAR_ICONCOLOR_'+J.toUpperCase())});M.push(this._invisibleText.getId());}i.accessibilityState({labelledby:M.join(" ")}).openEnd();if(this._invisibleText){i.renderControl(this._invisibleText);}if(!E){this._renderIcon(i,F);}if(!F){this._renderText(i);}i.close("li");};v.prototype._onAfterParentRendering=function(){this._renderBadge();d.getInstance();};v.prototype._renderIcon=function(i,x){var y=this.getIcon();if(y){var z=b.getIconInfo(y),E=["sapMITBSelectItemIcon"];if(z&&!z.suppressMirroring){E.push("sapUiIconMirrorInRTL");}if(x){E.push("sapMITBBadgeHolder");}i.icon(y,E,{id:this.getId()+"-icon","aria-hidden":true});}else{i.openStart("span").class("sapUiIcon").openEnd().close("span");}};v.prototype._renderText=function(i){var x=this.getText(),y=this.getCount(),z=C.getConfiguration().getRTL(),E=this.getTextDirection();i.openStart("span",this.getId()+"-text").attr("dir","ltr").class("sapMText").class("sapMTextNoWrap").class("sapMITBText").class("sapMITBBadgeHolder");if(E!==m.Inherit){i.attr('dir',E.toLowerCase());}var F=R.getTextAlign(T.Begin,E);if(F){i.style("text-align",F);}if(y){if(z){x='('+y+') '+x;}else{x+=' ('+y+')';}}i.openEnd().text(x).close("span");};v.prototype._getSelectList=function(){if(!this._oSelectList){this._oSelectList=new j({selectionChange:function(E){var i=E.getParameter("selectedItem");this._oIconTabHeader.setSelectedItem(i._getRealTab());this._oTabFilter._closePopover();}});this._oSelectList._oIconTabHeader=this.getParent();this._oSelectList._oTabFilter=this;this._oSelectList._bIsOverflow=this._bIsOverflow;}return this._oSelectList;};v.prototype._prepareDragEventDelegate=function(){if(this.getEnabled()){this.addEventDelegate(this._oDragEventDelegate,this);}else{this.removeEventDelegate(this._oDragEventDelegate);}};v.prototype._getExpandButton=function(){this._oExpandButton=this.getAggregation("_expandButton");if(!this._oExpandButton){this._oExpandButton=new A(this.getId()+"-expandButton",{type:n.Transparent,icon:b.getIconURI("slim-arrow-down"),tooltip:w.getText("ICONTABHEADER_OVERFLOW_MORE"),tabIndex:"-1",press:this._expandButtonPress.bind(this)}).addStyleClass("sapMITBFilterExpandBtn");this.setAggregation("_expandButton",this._oExpandButton);}return this._oExpandButton;};v.prototype._updateExpandButtonBadge=function(){var E=this.getAggregation("_expandButtonBadge"),H=E.getBadgeCustomData()&&E.getBadgeCustomData().getVisible(),i=this._hasChildWithBadge();if(i&&!H){E.addCustomData(new B({visible:true}));}else if(!i&&H){E.getBadgeCustomData().setVisible(false);}};v.prototype._hasChildWithBadge=function(){var i=this._bIsOverflow?this._getIconTabHeader()._getItemsForOverflow():this._getAllSubItems();return i.some(function(x){return x.isA("sap.m.IBadge")&&x.getBadgeCustomData()&&x.getBadgeCustomData().getVisible();});};v.prototype._expandButtonPress=function(){if(!this.getEnabled()){return;}this.$().trigger("focus");if(!this._oPopover){this._oPopover=new h({showArrow:false,showHeader:false,offsetY:0,offsetX:0,placement:P.VerticalPreferredBottom}).addStyleClass("sapMITBFilterPopover");this._oPopover.attachBeforeClose(function(){this._getSelectList().destroyItems();},this);if(D.system.phone){this._oPopover._oControl.addButton(this._createPopoverCloseButton());}this.addDependent(this._oPopover);this._oPopover._oControl._adaptPositionParams=function(){var i=this.$().parents().hasClass("sapUiSizeCompact");this._arrowOffset=0;if(i){this._offsets=["0 0","0 0","0 4","0 0"];}else{this._offsets=["0 0","0 0","0 5","0 0"];}this._atPositions=["end top","end top","end bottom","begin top"];this._myPositions=["end bottom","begin top","end top","end top"];};}var H=this._setSelectListItems();var S=this._getSelectList();this._oPopover.removeAllContent();if(this.getItems().length||this._bIsOverflow){this._oPopover.addContent(S);this._oPopover.setInitialFocus(H?S.getSelectedItem():S.getVisibleTabFilters()[0]);this._oPopover.openBy(this);}};v.prototype._getAllSubItems=function(){var i=[];this._getRealTab().getItems().forEach(function(x){if(x.isA("sap.m.IconTabFilter")){i=i.concat(x,x._getAllSubItems());}else{i=i.concat(x);}});return i;};v.prototype._getAllSubFilters=function(){return this._getAllSubItems().filter(function(i){return i.isA("sap.m.IconTabFilter");});};v.prototype._getAllSubFiltersDomRefs=function(){return this._getAllSubFilters().filter(function(S){return Boolean(S._getRealTab().getDomRef());}).map(function(S){return S._getRealTab().getDomRef();});};v.prototype._getFirstAvailableSubFilter=function(){var x=this._getAllSubFilters();for(var i=0;i<x.length;i++){var y=x[i];if(y.getContent().length&&y.getVisible()){return y;}}return this;};v.prototype._isParentOf=function(x){var y=this._getAllSubFilters();for(var i=0;i<y.length;i++){if(y[i]._getRealTab()===x){return true;}}return false;};v.prototype._createPopoverCloseButton=function(){return new g({text:w.getText("SELECT_CANCEL_BUTTON"),press:this._closePopover.bind(this)});};v.prototype._closePopover=function(){if(this._oPopover){this._oPopover.close();this._oPopover.removeAllContent();}if(this._bIsOverflow&&this.getParent().oSelectedItem){(this.getParent()._oSelectedRootItem||this.getParent().oSelectedItem).$().focus();}};v.prototype._handleOnDragOver=function(E){if(this._isDropPossible(E)){this.getDomRef().classList.add("sapMITHDragOver");E.preventDefault();}};v.prototype._handleOnLongDragOver=function(E){if(this._isDropPossible(E)){if(this._oPopover&&this._oPopover.isOpen()){return;}this._expandButtonPress();}};v.prototype._handleOnDrop=function(){this.getDomRef().classList.remove("sapMITHDragOver");};v.prototype._handleOnDragLeave=function(){this.getDomRef().classList.remove("sapMITHDragOver");};v.prototype._isDropPossible=function(E){var i=this._getIconTabHeader(),x=E.dragSession.getDragControl()._getRealTab(),S=i.oSelectedItem;if(i!==x._getIconTabHeader()){return false;}if(x===this||x._isParentOf(this)){return false;}if(!this._bIsOverflow&&!i.getMaxNestingLevel()){return false;}if(this._bIsOverflow&&S&&(S===x||S._getRootTab()===x)){return false;}return true;};v.prototype._setSelectListItems=function(){var x=this.getParent(),S=this._getSelectList(),y=this._getAllSubItems(),z=x.oSelectedItem,H=false,E,L,F,i,G;if(this._bIsOverflow){y=x._getItemsForOverflow();}S.destroyItems();S.setSelectedItem(null);for(i=0;i<y.length;i++){E=y[i];L=E.clone(undefined,undefined,{cloneChildren:false,cloneBindings:true});E._oCloneInList=L;F=E.getCustomData();for(G=0;G<F.length;G++){L.addCustomData(F[G].clone());}L._oRealItem=E;S.addItem(L);if(E.isA("sap.m.IconTabSeparator")){continue;}if(L._getRealTab()===z){S.setSelectedItem(L);H=true;continue;}if(L._getRealTab()._isParentOf(z)){S.setSelectedItem(z._getRealTab());H=true;}}return H;};v.prototype._getIconTabHeader=function(){return this._getRootTab().getParent();};v.prototype.onsapdown=function(E){if(!this.getEnabled()){return;}if(this._bIsOverflow||((this._getNestedLevel()===1&&this._getRealTab()===this)&&this._getRealTab().getItems().length!==0)){E.stopImmediatePropagation();this._expandButtonPress();}};v.prototype._startBadgeHiding=function(){if(this._iHideBadgeTimeout){return;}this._iHideBadgeTimeout=setTimeout(this._hideBadge.bind(this),t);if(this._getRootTab()!==this){this._getRootTab()._updateExpandButtonBadge();}};v.prototype._hideBadge=function(){var i=this.getBadgeCustomData();if(!i){return;}i.setVisible(false);if(this._getRootTab()!==this){this._getRootTab()._updateExpandButtonBadge();}if(this._oCloneInList&&!this._oCloneInList.bIsDestroyed&&this._oCloneInList.getBadgeCustomData()){this._oCloneInList.getBadgeCustomData().setVisible(false);this._oCloneInList=null;}if(this._isInOverflow()){this._getIconTabHeader()._getOverflow()._updateExpandButtonBadge();}this._iHideBadgeTimeout=null;};v.prototype._isInOverflow=function(){return!this._bIsOverflow&&this._getIconTabHeader()._getItemsInStrip().indexOf(this._getRealTab())===-1;};v.prototype.onBadgeUpdate=function(V,S,i){var x=this.getDomRef(),y=this._getIconTabHeader(),z,E,F,G,O,H,J;if(!y){return;}if(x){F=x.getAttribute("aria-labelledby")||"";switch(S){case r.Appear:F=i+" "+F;break;case r.Disappear:F=F.replace(i,"").trim();break;}x.setAttribute("aria-labelledby",F);}if(!y._isRendered()){return;}z=this._getRootTab();if(z._isInOverflow()){O=this._getIconTabHeader()._getOverflow();O._updateExpandButtonBadge();}else if(z!==this){z._updateExpandButtonBadge();}if(S!==r.Appear){return;}this._enableMotion();if(this._isInOverflow()&&this._oCloneInList){this._oCloneInList.addCustomData(new B());}E=d.getInstance();G=this.getText();if(z._isInOverflow()){H="ICONTABFILTER_SUB_ITEM_BADGE";J=[G,O.getText()];}else{if(z!==this){H="ICONTABFILTER_SUB_ITEM_BADGE";J=[G,z.getText()];}else{H="ICONTABFILTER_BADGE_MSG";J=G;}}E.announce(w.getText(H,J),u.Assertive);};v.prototype.getAriaLabelBadgeText=function(){return w.getText("ICONTABFILTER_BADGE");};v.prototype._enableMotion=function(){if(this._getRealTab()._isInOverflow()){if(this._oCloneInList&&this._oCloneInList.getDomRef()){this._oCloneInList.getDomRef().classList.add("sapMITBFilterBadgeMotion");}}else if(this.getDomRef()){this.getDomRef().classList.add("sapMITBFilterBadgeMotion");}};return v;});
