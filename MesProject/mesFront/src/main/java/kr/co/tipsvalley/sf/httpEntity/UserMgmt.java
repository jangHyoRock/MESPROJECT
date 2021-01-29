package kr.co.tipsvalley.sf.httpEntity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity  
@Getter
@NoArgsConstructor
@Table(name="t_usermgmt")
public class UserMgmt {
	/*
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String user_id;
	
	
	@Column
	/*
	 * private String user_name; private String create_user; private char
	 * phone_number; private char birth_date; private String email; private String
	 * address; private char employment_status; private char join_date; private
	 * String department; private String position; private String job; private
	 * String password;
	 */
	@Id
	@Column(name="user_id") private String user_id;
	@Column(name="user_name") private String user_name;
    @Column(name="phone_number",columnDefinition = "bpchar") private String phone_number;
    @Column(name="birth_date",columnDefinition = "bpchar") private String birth_date;
    @Column(name="email") private String email;
    @Column(name="address") private String address;
    @Column(name="employment_status",columnDefinition = "bpchar") private String employment_status;
    @Column(name="join_date",columnDefinition = "bpchar") private String join_date;
    @Column(name="department") private String department;
    @Column(name="position") private String position;
    @Column(name="job") private String job;
    @Column(name="password") private String password;
    @Column(name="create_user") private String create_user;
    
	
	@Builder
	public UserMgmt(String user_id,String user_name,String phone_number,String birth_date,String email,String address,String employment_status,String join_date, String department,String position,String job,String password,String create_user) {
		this.user_id=user_id;
		this.user_name=user_name;
		this.phone_number=phone_number;
		this.birth_date = birth_date;
		this.email=email;
		this.address=address;
		this.employment_status=employment_status;
		this.join_date=join_date;
		this.department=department;
		this.position=position;
		this.job=job;
		this.password=password;
		this.create_user=create_user;
	}
	
	public UserMgmt toEntity() {
		return UserMgmt.builder()
							  .user_id(user_id)
							  .user_name(user_name)
							  .phone_number(phone_number)
							  .birth_date(birth_date)
							  .email(email)
							  .address(address)
							  .employment_status(employment_status)
							  .join_date(join_date)
							  .department(department)
							  .position(position)
							  .job(job)
							  .password(password)
							  .create_user(create_user)
							  .build();
		}
		
	

}
