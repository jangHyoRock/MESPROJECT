package kr.co.tipsvalley.sf.httpEntity;


import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.*;

@Entity  
@Getter
@NoArgsConstructor
@Table(name="contents9_table")
public class Contents9_table {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int num1;
	
	@Column
	private String order_num;
	private String buyer;
	private Date order_date;
	private String reference;
	private String price;
	private Date due_date;
	private String remark;
	
	
	@Builder
	public Contents9_table(int num1, String order_num, String buyer,Date order_date,String reference,String price,Date due_date,String remark) {
		this.num1=num1;
		this.order_num=order_num;
		this.buyer=buyer;
		this.order_date=order_date;
		this.reference=reference;
		this.price=price;
		this.due_date=due_date;
		this.remark=remark;
	}
	
	
	public Contents9_table toEntity() {
		return Contents9_table.builder()
							  .num1(num1)
							  .order_num(order_num)
							  .buyer(buyer)
							  .order_date(order_date)
							  .reference(reference)
							  .price(price)
							  .due_date(due_date)
							  .remark(remark)
							  .build();
		}
		
	
}
