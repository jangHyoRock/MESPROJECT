package kr.co.tipsvalley.sf.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "user_menu")

public class MenuTitleValueEntity implements Serializable
{
	
    @Id
    @JoinColumn(name="menu_id") private String menu_id;
    
    @Column(name="p_menu_id") private String p_menu_id;
    @Column(name="icon",  nullable = true) private String icon;
    @Column(name="menu_name", nullable = true) private String menu_name;
    @Column(name="menu_desc", nullable = true) private String menu_desc;
   
    
}
