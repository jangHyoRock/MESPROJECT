package kr.co.tipsvalley.sf.model.json;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/*
 * Sensor information json model
 */
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KafkaSensorInfo {

	@JsonProperty("device_mac_addr")
	private String deviceMacAddr;
	private double temperature;
	private double illuminance;
	private double humidity;
	private String time;
	public String getDeviceMacAddr() {
		return deviceMacAddr;
	}
	public void setDeviceMacAddr(String deviceMacAddr) {
		this.deviceMacAddr = deviceMacAddr;
	}
	public double getTemperature() {
		return temperature;
	}
	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}
	public double getIlluminance() {
		return illuminance;
	}
	public void setIlluminance(double illuminance) {
		this.illuminance = illuminance;
	}
	public double getHumidity() {
		return humidity;
	}
	public void setHumidity(double humidity) {
		this.humidity = humidity;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}

}