package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MeasureInfoRealJson
{
	@JsonProperty("id") private Long id;
	@JsonProperty("data_time") private String datatime;
	@JsonProperty("sido_name") private String sidoname;
	@JsonProperty("station_name") private String stationname;
	@JsonProperty("mang_name") private String mangname;
	@JsonProperty("so2_value") private String so2value;
	@JsonProperty("co_value") private String covalue;
	@JsonProperty("o3_value") private String o3value;
	@JsonProperty("no2_value") private String no2value;
	@JsonProperty("pm10_value") private String pm10value;
	@JsonProperty("pm10_value_24h") private String pm10value24;
	@JsonProperty("pm25_value") private String pm25value;
	@JsonProperty("pm25_value_24h") private String pm25value24;
	@JsonProperty("khai_value") private String khaivalue;
	@JsonProperty("so2_grade") private String so2grade;
	@JsonProperty("co_grade") private String cograde;
	@JsonProperty("o3_grade") private String o3grade;
	@JsonProperty("no2_grade") private String no2grade;
	@JsonProperty("pm10_grade") private String pm10grade;
	@JsonProperty("pm10_grade_1h") private String pm10grade1h;
	@JsonProperty("pm25_grade") private String pm25grade;
	@JsonProperty("pm25_grade_1h") private String pm25grade1h;
	@JsonProperty("khai_grade") private String khaigrade;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDatatime() {
		return datatime;
	}
	public void setDatatime(String datatime) {
		this.datatime = datatime;
	}
	public String getSidoname() {
		return sidoname;
	}
	public void setSidoname(String sidoname) {
		this.sidoname = sidoname;
	}
	public String getStationname() {
		return stationname;
	}
	public void setStationname(String stationname) {
		this.stationname = stationname;
	}
	public String getMangname() {
		return mangname;
	}
	public void setMangname(String mangname) {
		this.mangname = mangname;
	}
	public String getSo2value() {
		return so2value;
	}
	public void setSo2value(String so2value) {
		this.so2value = so2value;
	}
	public String getCovalue() {
		return covalue;
	}
	public void setCovalue(String covalue) {
		this.covalue = covalue;
	}
	public String getO3value() {
		return o3value;
	}
	public void setO3value(String o3value) {
		this.o3value = o3value;
	}
	public String getNo2value() {
		return no2value;
	}
	public void setNo2value(String no2value) {
		this.no2value = no2value;
	}
	public String getPm10value() {
		return pm10value;
	}
	public void setPm10value(String pm10value) {
		this.pm10value = pm10value;
	}
	public String getPm10value24() {
		return pm10value24;
	}
	public void setPm10value24(String pm10value24) {
		this.pm10value24 = pm10value24;
	}
	public String getPm25value() {
		return pm25value;
	}
	public void setPm25value(String pm25value) {
		this.pm25value = pm25value;
	}
	public String getPm25value24() {
		return pm25value24;
	}
	public void setPm25value24(String pm25value24) {
		this.pm25value24 = pm25value24;
	}
	public String getKhaivalue() {
		return khaivalue;
	}
	public void setKhaivalue(String khaivalue) {
		this.khaivalue = khaivalue;
	}
	public String getSo2grade() {
		return so2grade;
	}
	public void setSo2grade(String so2grade) {
		this.so2grade = so2grade;
	}
	public String getCograde() {
		return cograde;
	}
	public void setCograde(String cograde) {
		this.cograde = cograde;
	}
	public String getO3grade() {
		return o3grade;
	}
	public void setO3grade(String o3grade) {
		this.o3grade = o3grade;
	}
	public String getNo2grade() {
		return no2grade;
	}
	public void setNo2grade(String no2grade) {
		this.no2grade = no2grade;
	}
	public String getPm10grade() {
		return pm10grade;
	}
	public void setPm10grade(String pm10grade) {
		this.pm10grade = pm10grade;
	}
	public String getPm10grade1h() {
		return pm10grade1h;
	}
	public void setPm10grade1h(String pm10grade1h) {
		this.pm10grade1h = pm10grade1h;
	}
	public String getPm25grade() {
		return pm25grade;
	}
	public void setPm25grade(String pm25grade) {
		this.pm25grade = pm25grade;
	}
	public String getPm25grade1h() {
		return pm25grade1h;
	}
	public void setPm25grade1h(String pm25grade1h) {
		this.pm25grade1h = pm25grade1h;
	}
	public String getKhaigrade() {
		return khaigrade;
	}
	public void setKhaigrade(String khaigrade) {
		this.khaigrade = khaigrade;
	}
}
