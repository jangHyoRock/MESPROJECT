package kr.co.tipsvalley.sf.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "user_menu")

public class MenuInfoEntity implements Serializable
{
	
    @Id

    @Column(name="menu_id") private String menuid;
    @Column(name="disp_order",columnDefinition = "int8") private int disporder;
    @Column(name="p_menu_id",  nullable = true) private String pmenuid;
    @Column(name="icon", nullable = true) private String icon;
    
}
