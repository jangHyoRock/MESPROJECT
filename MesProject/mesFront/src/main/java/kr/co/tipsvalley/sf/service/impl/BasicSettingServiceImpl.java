package kr.co.tipsvalley.sf.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.tipsvalley.sf.dto.PartnerMgmtDTO;
import kr.co.tipsvalley.sf.model.PartnerInfoEntity;
import kr.co.tipsvalley.sf.repository.PartnerMgmtRepository;

@Service
public class BasicSettingServiceImpl {

	@Autowired
	PartnerMgmtRepository partnerMgmtRepository;
	
	@Transactional
	public Long save(PartnerMgmtDTO entity) {
		return partnerMgmtRepository.save(entity.toEntity()).getPartner_number();
	}
	
	public PartnerInfoEntity save(PartnerInfoEntity entity) {
		partnerMgmtRepository.save(entity);
		return entity;
	}
}
