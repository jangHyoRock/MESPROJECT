package kr.co.tipsvalley.sf.model.json;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MeasureInfoRealJsonList {
    @JsonProperty("list")
    private ArrayList<MeasureInfoRealJson> measureInfoRealJsonList;

	public ArrayList<MeasureInfoRealJson> getMeasureInfoRealJsonList() {
		return measureInfoRealJsonList;
	}

	public void setMeasureInfoRealJsonList(ArrayList<MeasureInfoRealJson> measureInfoRealJsonList) {
		this.measureInfoRealJsonList = measureInfoRealJsonList;
	}	
    
}
