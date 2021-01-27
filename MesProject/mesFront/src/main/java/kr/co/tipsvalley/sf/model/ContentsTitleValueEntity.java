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
@Table(name = "contents_title")

public class ContentsTitleValueEntity implements Serializable
{
	
    @Id

    @JoinColumn(name="menu_id") private String menu_id;
    @Column(name="menu_desc") private String menu_desc;
    @Column(name="locale",columnDefinition = "varchar",length = 255) private char locale;
    @Column(name="menu_name", nullable = true) private String menu_name;

   
    
}
