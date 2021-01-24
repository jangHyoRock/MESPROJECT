package kr.co.tipsvalley.sf.service.impl;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tipsvalley.sf.model.KhaiValueInfoReal;
import kr.co.tipsvalley.sf.model.json.MeasureInfoRealJson;
import kr.co.tipsvalley.sf.model.json.MeasureInfoRealJsonList;
import kr.co.tipsvalley.sf.repository.MeasureInfoRealEntityRepository;
import kr.co.tipsvalley.sf.service.MeasureInfoRealEntityService;

@Transactional
@Service
public class MeasureInfoRealEntityServiceImpl implements MeasureInfoRealEntityService {
    
	@Autowired
	MeasureInfoRealEntityRepository measureInfoRealRepository;
    
    public MeasureInfoRealJsonList findKhaiValueInfoRealEntity(String stationName) throws InvalidParameterException{
        MeasureInfoRealJsonList measureInfoRealJsonList = new MeasureInfoRealJsonList();
        
        // Retune value
        ArrayList<MeasureInfoRealJson> measureInfoRealJsonListObj = new ArrayList<MeasureInfoRealJson>();

        List<KhaiValueInfoReal> khaiValueInfoRealByJPA = null;
        
        if(stationName != "") {
        	khaiValueInfoRealByJPA = this.measureInfoRealRepository.findKhaiValueInfoRealBySidonameAndMangname(stationName);
        }else {
        	khaiValueInfoRealByJPA = this.measureInfoRealRepository.findKhaiValueInfoRealBySidonameAndMangname();
        }
        
        // JPA return value
        for(KhaiValueInfoReal khaiValueInfoRealEntity : khaiValueInfoRealByJPA)
        {
            MeasureInfoRealJson measureInfoRealJsonObj = new MeasureInfoRealJson();
            
            measureInfoRealJsonObj.setDatatime      (khaiValueInfoRealEntity.getDatatime   ());
            measureInfoRealJsonObj.setSidoname      (khaiValueInfoRealEntity.getSidoname   ());
            measureInfoRealJsonObj.setStationname   (khaiValueInfoRealEntity.getStationname());
            measureInfoRealJsonObj.setMangname      (khaiValueInfoRealEntity.getMangname   ());
            measureInfoRealJsonObj.setKhaivalue      (khaiValueInfoRealEntity.getKhaivalue  ());
            measureInfoRealJsonObj.setKhaigrade      (khaiValueInfoRealEntity.getKhaigrade());
            
            measureInfoRealJsonListObj.add(measureInfoRealJsonObj);
        }
          
        measureInfoRealJsonList.setMeasureInfoRealJsonList(measureInfoRealJsonListObj);
        
        return measureInfoRealJsonList;
    }
    
}