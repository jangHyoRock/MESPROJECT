package kr.co.tipsvalley.sf.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "user_menu")

public class MenuInfoReal implements Serializable
{
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id") private long id;
    
    @Column(name="menu_id") private String menuid;
    @Column(name="disp_order",columnDefinition = "int8") private int disp_order;
    @Column(name="p_menu_id",  nullable = true) private String p_menu_id;
    @Column(name="menu_name", nullable = true) private String menu_name;
    @Column(name="icon", nullable = true) private String icon;
    @Column(name="menu_desc", nullable = true) private String menu_desc;
   
    
}
