package kr.co.tipsvalley.sf.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.dto.PartnerMgmtDTO;
import kr.co.tipsvalley.sf.service.impl.BasicSettingServiceImpl;

@RestController
@RequestMapping("/basicSetting")
public class BasicSettingController {

	static final Logger logger = LoggerFactory.getLogger(BasicSettingController.class);
	
	@Autowired
	private BasicSettingServiceImpl basicSettingServiceImpl;
	
	@RequestMapping(value = "/partnerMgmt", method = RequestMethod.POST)
	public @ResponseBody Long partnerMgmt(@RequestBody PartnerMgmtDTO entity) {
		System.out.println(entity.getAddress());
		System.out.println(entity.getBank_account_number());
		System.out.println(entity.getBank_name());
		System.out.println(entity.getBusiness());
		System.out.println(entity.getBusiness_actual());
		System.out.println(entity.getBusiness_license_number());
		System.out.println(entity.getCustomer_code());
		System.out.println(entity.getCustomer_name());
		System.out.println(entity.getCustomer_person());
		System.out.println(entity.getDepositor());
		System.out.println(entity.getDivision());
		System.out.println(entity.getEmail());
		System.out.println(entity.getFax_number());
		System.out.println(entity.getPerson_phone_number());
		System.out.println(entity.getPhone());
		System.out.println(entity.getRemark());
		System.out.println(entity.getRepresentative());
		return basicSettingServiceImpl.save(entity);
	}
}
