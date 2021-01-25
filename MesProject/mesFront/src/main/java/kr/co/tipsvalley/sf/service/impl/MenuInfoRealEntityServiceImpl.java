package kr.co.tipsvalley.sf.service.impl;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tipsvalley.sf.model.MenuKhaiValueInfoReal;
import kr.co.tipsvalley.sf.model.json.MenuInfoRealJson;
import kr.co.tipsvalley.sf.model.json.MenuInfoRealJsonList;
import kr.co.tipsvalley.sf.repository.MenuInfoRealEntityRepository;
import kr.co.tipsvalley.sf.service.MenuInfoRealEntityService;

@Transactional
@Service
public class MenuInfoRealEntityServiceImpl implements MenuInfoRealEntityService  {
	
	@Autowired
	MenuInfoRealEntityRepository menuInfoRealEntityRepository;
    
    public MenuInfoRealJsonList findKhaiValueInfoRealEntity() throws InvalidParameterException{
    	
    	MenuInfoRealJsonList menuInfoRealJsonList = new MenuInfoRealJsonList();
        
        // Retune value
    	ArrayList<MenuInfoRealJson> menuInfoRealJsonListObj = new ArrayList<MenuInfoRealJson>();

        List<MenuKhaiValueInfoReal> menukhaiValueInfoRealByJPA = null;
        
        
        menukhaiValueInfoRealByJPA = this.menuInfoRealEntityRepository.findmenuAll();

        // JPA return value
        for(MenuKhaiValueInfoReal menukhaiValueInfoRealEntity : menukhaiValueInfoRealByJPA)
        {
            MenuInfoRealJson menuInfoRealJsonObj = new MenuInfoRealJson();
           
            menuInfoRealJsonObj.setMenuId     (menukhaiValueInfoRealEntity.getMenuId());
            menuInfoRealJsonObj.setDisporder  (menukhaiValueInfoRealEntity.getDisporder());
            menuInfoRealJsonObj.setPmenuid    (menukhaiValueInfoRealEntity.getPmenuid());
            menuInfoRealJsonObj.setMenuname   (menukhaiValueInfoRealEntity.getMenuname());
            menuInfoRealJsonObj.setIcon       (menukhaiValueInfoRealEntity.getIcon());
            menuInfoRealJsonObj.setMenudesc   (menukhaiValueInfoRealEntity.getMenudesc());

            menuInfoRealJsonListObj.add(menuInfoRealJsonObj);
        }
        

        menuInfoRealJsonList.setMenuInfoRealJsonList(menuInfoRealJsonListObj);
        
        return menuInfoRealJsonList;
    }
}
