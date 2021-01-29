package kr.co.tipsvalley.sf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tipsvalley.sf.model.PartnerInfoEntity;

public interface PartnerMgmtRepository extends JpaRepository<PartnerInfoEntity, Long> {

}
