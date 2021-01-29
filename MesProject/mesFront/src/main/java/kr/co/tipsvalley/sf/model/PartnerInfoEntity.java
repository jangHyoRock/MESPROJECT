package kr.co.tipsvalley.sf.model;

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
@Table(name = "t_partnermgmt")
@NoArgsConstructor

public class PartnerInfoEntity  {

	@Id 
	@Column(name="partner_number") @GeneratedValue(strategy = GenerationType.IDENTITY) private Long partner_number;

	@Column(name="customer_code") private String customer_code;
	@Column(name="customer_person") private String customer_person;
	@Column(name="customer_name") private String customer_name;
	@Column(name="person_phone_number") private char person_phone_number;
	@Column(name="fax_number") private String fax_number;
	@Column(name="representative") private String representative;
	@Column(name="email") private String email;
	@Column(name="business_license_number") private char business_license_number;
	@Column(name="address") private String address;
	@Column(name="business_actual") private String business_actual;
	@Column(name="bank_account_number") private String bank_account_number;
	@Column(name="business") private String business;
	@Column(name="bank_name") private String bank_name;
	@Column(name="phone") private String phone;
	@Column(name="depositor") private String depositor;
	@Column(name="remark") private String remark;
	@Column(name="division") private String division;
	
	@Builder
	public PartnerInfoEntity(String customer_code, String customer_person, String customer_name, char person_phone_number, String fax_number, 
			String representative, String email, char business_license_number, String address, String business_actual, String bank_account_number,
			String business, String bank_name, String phone, String depositor, String remark, String division, Long partner_number) {
		this.customer_code = customer_code;
		this.customer_person = customer_person;
		this.customer_name = customer_name;
		this.person_phone_number = person_phone_number;
		this.fax_number = fax_number;
		this.representative = representative;
		this.email = email;
		this.business_license_number = business_license_number;
		this.address = address;
		this.business_actual = business_actual;
		this.bank_account_number = bank_account_number;
		this.business = business;
		this.bank_name = bank_name;
		this.phone = phone;
		this.depositor = depositor;
		this.remark = remark;
		this.division = division;
		this.partner_number = partner_number;
	}
	
}
