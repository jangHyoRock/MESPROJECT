package kr.co.tipsvalley.sf.service;

import java.security.InvalidParameterException;

import kr.co.tipsvalley.sf.model.json.MeasureInfoRealJsonList;

public interface MeasureInfoRealEntityService{
    public MeasureInfoRealJsonList findKhaiValueInfoRealEntity(String stationName) throws InvalidParameterException;
}