package kr.co.tipsvalley.sf.dto;

import java.time.LocalDate;

import kr.co.tipsvalley.sf.httpEntity.ProductionMgmtEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductionMgmtSaveRequestDTO {
	private Long product_no;
	private String order_no;
	private String customers;
	private String product_name;
	private int product_size;
	private int quantity;
	private String materials;
	private int required_quantity;
	private int product_quantity;
	private String outsourcing;
	private LocalDate deadline;
	private LocalDate start_date;
	private LocalDate end_date;
	
	@Builder
	public ProductionMgmtSaveRequestDTO(Long product_no, String order_no, String customers, String product_name, int product_size, 
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
	
	public ProductionMgmtEntity toEntity() {
		return ProductionMgmtEntity.builder()
				.product_no(product_no)
				.order_no(order_no)
				.customers(customers)
				.product_name(product_name)
				.product_size(product_size)
				.quantity(product_quantity)
				.materials(materials)
				.required_quantity(required_quantity)
				.product_quantity(product_quantity)
				.outsourcing(outsourcing)
				.deadline(deadline)
				.start_date(start_date)
				.end_date(end_date)
				.build();
	}
}
