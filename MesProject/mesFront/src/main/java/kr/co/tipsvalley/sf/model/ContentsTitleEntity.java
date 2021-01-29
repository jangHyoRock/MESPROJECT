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
@Table(name = "contents_title")

public class ContentsTitleEntity implements Serializable
{
	
    @Id

    @Column(name="menu_desc", nullable = true) private String menu_desc;
    @Column(name="locale",  nullable = true) private char locale;
    @Column(name="menu_title", nullable = true) private String menu_title;
    @Column(name="menu_name", nullable = true) private String menuname;
   
    
}
