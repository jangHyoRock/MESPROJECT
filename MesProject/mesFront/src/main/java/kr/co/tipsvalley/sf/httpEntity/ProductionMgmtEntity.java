package kr.co.tipsvalley.sf.httpEntity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "production_mgmt")
@NoArgsConstructor
public class ProductionMgmtEntity {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long product_no;
	
	@Column(length = 256)
	private String order_no;
	
	@Column(length = 20)
	private String customers;
	
	@Column(length = 20)
	private String product_name;
	
	@Column(length = 10)
	private int product_size;
	
	@Column(length = 10)
	private int quantity;
	
	@Column(length = 10)
	private String materials;
	
	@Column(length = 10)
	private int required_quantity;
	
	@Column(length = 10)
	private int product_quantity;
	
	@Column(length = 10)
	private String outsourcing;
	
	@Column()
	private LocalDate deadline;
	
	@Column()
	private LocalDate start_date;
	
	@Column()
	private LocalDate end_date;
	
	@Builder
	public ProductionMgmtEntity(Long product_no, String order_no, String customers, String product_name, int product_size, 
			int quantity, String materials, int required_quantity, int product_quantity, String outsourcing,
			LocalDate deadline, LocalDate start_date, LocalDate end_date) {
		this.product_no = product_no;
		this.order_no = order_no;
		this.customers = customers;
		this.product_name = product_name;
		this.product_size = product_size;
		this.quantity = quantity;
		this.materials = materials;
		this.required_quantity = required_quantity;
		this.product_quantity = product_quantity;
		this.outsourcing = outsourcing;
		this.deadline = deadline;
		this.start_date = start_date;
		this.end_date = end_date;
	}
}
