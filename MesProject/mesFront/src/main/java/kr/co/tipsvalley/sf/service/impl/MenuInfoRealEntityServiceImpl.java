package kr.co.tipsvalley.sf.service.impl;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tipsvalley.sf.model.MenuInfoValue;
import kr.co.tipsvalley.sf.model.json.MenuInfoRealJson;
import kr.co.tipsvalley.sf.model.json.MenuListJson;
import kr.co.tipsvalley.sf.repository.MenuInfoRealEntityRepository;
import kr.co.tipsvalley.sf.service.MenuInfoRealEntityService;

@Transactional
@Service
public class MenuInfoRealEntityServiceImpl implements MenuInfoRealEntityService  {
	
	@Autowired
	MenuInfoRealEntityRepository menuInfoRealEntityRepository;
    
    public MenuListJson findMenuInfoValueEntity() throws InvalidParameterException{
    	
    	MenuListJson menuInfoRealJsonList = new MenuListJson();
        
        // Retune value
    	ArrayList<MenuInfoRealJson> mainMenuInfoJsonListObj = new ArrayList<MenuInfoRealJson>();
    	ArrayList<MenuInfoRealJson> subMenuInfoJsonListObj = new ArrayList<MenuInfoRealJson>();

        List<MenuInfoValue> menuInfoValueByJPA = null;
             
        menuInfoValueByJPA = this.menuInfoRealEntityRepository.findmenuAll();
        
        
        // JPA return value
         for(MenuInfoValue menuInfoValueEntity : menuInfoValueByJPA)
        {
            
        	 MenuInfoRealJson mainMenuInfoJsonObj = new MenuInfoRealJson();
        	 
        	 mainMenuInfoJsonObj.setMenuId     (menuInfoValueEntity.getMenuId());
        	 mainMenuInfoJsonObj.setDisporder  (menuInfoValueEntity.getDisporder());
        	 mainMenuInfoJsonObj.setPmenuid    (menuInfoValueEntity.getPmenuid());
        	 mainMenuInfoJsonObj.setMenuname   (menuInfoValueEntity.getMenuname());
        	 mainMenuInfoJsonObj.setIcon       (menuInfoValueEntity.getIcon());
        	 mainMenuInfoJsonObj.setMenudesc   (menuInfoValueEntity.getMenudesc());
      	   
      	   
        	 mainMenuInfoJsonListObj.add(mainMenuInfoJsonObj);
        	 menuInfoRealJsonList.setMenuInfoRealJsonList(mainMenuInfoJsonListObj);
        	 
             /*
        	 MenuInfoRealJson subMenuInfoJsonObj = new MenuInfoRealJson();

             if(menuInfoValueEntity.getPmenuid().equals("Main")) {
   
          	   
            	 mainMenuInfoJsonObj.setMenuId     (menuInfoValueEntity.getMenuId());
            	 mainMenuInfoJsonObj.setDisporder  (menuInfoValueEntity.getDisporder());
            	 mainMenuInfoJsonObj.setPmenuid    (menuInfoValueEntity.getPmenuid());
            	 mainMenuInfoJsonObj.setMenuname   (menuInfoValueEntity.getMenuname());
            	 mainMenuInfoJsonObj.setIcon       (menuInfoValueEntity.getIcon());
            	 mainMenuInfoJsonObj.setMenudesc   (menuInfoValueEntity.getMenudesc());
          	   
          	   
                mainMenuInfoJsonListObj.add(mainMenuInfoJsonObj);
          	   	menuInfoRealJsonList.setMenuInfoRealJsonList(mainMenuInfoJsonListObj);
          	 
             }else {
            	 subMenuInfoJsonObj.setMenuId     (menuInfoValueEntity.getMenuId());
            	 subMenuInfoJsonObj.setDisporder  (menuInfoValueEntity.getDisporder());
            	 subMenuInfoJsonObj.setPmenuid    (menuInfoValueEntity.getPmenuid());
            	 subMenuInfoJsonObj.setMenuname   (menuInfoValueEntity.getMenuname());
            	 subMenuInfoJsonObj.setIcon       (menuInfoValueEntity.getIcon());
            	 subMenuInfoJsonObj.setMenudesc   (menuInfoValueEntity.getMenudesc());
          	  
                 subMenuInfoJsonListObj.add(subMenuInfoJsonObj);
                 menuInfoRealJsonList.setMenuInfoRealJsonList1(subMenuInfoJsonListObj);
          	 
             }
             */
        }
        
        return menuInfoRealJsonList;
    }
}
