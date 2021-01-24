package kr.co.tipsvalley.sf.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Equipments {
	private List<Equipment> equipmentList = null;

	public List<Equipment> getEquipmentList() {
		return equipmentList;
	}
	public void setEquipmentList(List<Equipment> equipmentList) {
		this.equipmentList = equipmentList;
	}
	
	public void setEquipmentListWithFiles() {
		Path text = Paths.get("equipments.txt");
		List<Equipment> equipmentList = new ArrayList<Equipment>();
		
		try {
			BufferedReader br = Files.newBufferedReader(text);
			
			String str = br.readLine();
			while (str != null) {
				System.out.println(str);
				
				String[] arr = str.split("\\#");
				Equipment equipment = new Equipment();
				equipment.setIpAddress(arr[0]);
				equipment.setPort(Integer.parseInt(arr[1]));
				equipmentList.add(equipment);
				
				str = br.readLine();
			}
			
			br.close();
		} catch (IOException e) {
			System.out.println("File Error.");
		}
		
		this.equipmentList = equipmentList;
	}

}