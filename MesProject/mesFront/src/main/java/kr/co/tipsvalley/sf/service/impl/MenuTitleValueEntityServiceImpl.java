package kr.co.tipsvalley.sf.service.impl;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tipsvalley.sf.model.MenuTitleValue;
import kr.co.tipsvalley.sf.model.json.MenuTitleValueJson;
import kr.co.tipsvalley.sf.model.json.MenuTitleValueJsonList;
import kr.co.tipsvalley.sf.repository.MenuInfoRealEntityRepository;
import kr.co.tipsvalley.sf.service.MenuTitleValueEntityService;

@Transactional
@Service
public class MenuTitleValueEntityServiceImpl implements MenuTitleValueEntityService  {
	
	@Autowired
	MenuInfoRealEntityRepository menuInfoRealEntityRepository;
    
    public MenuTitleValueJsonList menuTitleValueEntity(String locale) throws InvalidParameterException{
    	
    	MenuTitleValueJsonList MenuTitleValueJsonList = new MenuTitleValueJsonList();
        
        // Retune value
    	ArrayList<MenuTitleValueJson> menuTitleValueJsonListObj = new ArrayList<MenuTitleValueJson>();

        List<MenuTitleValue> MenuTitleValueByJPA = null;
             
       // MenuTitleValueByJPA = this.menuInfoRealEntityRepository.findMenuDesc(locale);
        
        
        // JPA return value
         for(MenuTitleValue MenuInfoEntity : MenuTitleValueByJPA)
        {
            
        	 MenuTitleValueJson menuTitleValueJsonObj = new MenuTitleValueJson();
        	 
        	 menuTitleValueJsonObj.setMenuId     (MenuInfoEntity.getMenuId());
        	 menuTitleValueJsonObj.setPmenuid    (MenuInfoEntity.getPmenuid());
        	 menuTitleValueJsonObj.setIcon       (MenuInfoEntity.getIcon());
        	 menuTitleValueJsonObj.setLocale     (MenuInfoEntity.getLocale());
      	   
      	   
        	 menuTitleValueJsonListObj.add(menuTitleValueJsonObj);
        	 
        	// System.out.println("aaaaaaaaaaaaa "+MenuTitleValueEntity.getMenuId());
        }
        
         MenuTitleValueJsonList.setMenuTitleValueJsonList(menuTitleValueJsonListObj);
         
        return MenuTitleValueJsonList;
    }
}
