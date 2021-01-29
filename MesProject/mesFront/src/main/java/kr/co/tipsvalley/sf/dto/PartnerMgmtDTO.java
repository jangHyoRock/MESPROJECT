package kr.co.tipsvalley.sf.dto;

import kr.co.tipsvalley.sf.model.PartnerInfoEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PartnerMgmtDTO {
	
	private String customer_code;
	private String customer_person;
	private String customer_name;
	private char person_phone_number;
	private String fax_number;
	private String representative;
	private String email;
	private char business_license_number;
	private String address;
	private String business_actual;
	private String bank_account_number;
	private String business;
	private String bank_name;
	private String phone;
	private String depositor;
	private String remark;
	private String division;
	private Long partner_number;
	
	@Builder
	public PartnerMgmtDTO(String customer_code, String customer_person, String customer_name, char person_phone_number, String fax_number, 
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
	
	public PartnerInfoEntity toEntity() {
		return PartnerInfoEntity.builder()
				.customer_code(customer_code)
				.customer_person(customer_person)
				.customer_name(customer_name)
				.person_phone_number(person_phone_number)
				.fax_number(fax_number)
				.representative(representative)
				.email(email)
				.business_license_number(business_license_number)
				.address(address)
				.business_actual(business_actual)
				.bank_account_number(bank_account_number)
				.business(business)
				.bank_name(bank_name)
				.phone(phone)
				.depositor(depositor)
				.remark(remark)
				.division(division)
				.partner_number(partner_number)
				.build();
	}
}
