package kr.co.tipsvalley.sf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tipsvalley.sf.httpEntity.ProductionMgmtEntity;

public interface ProductionMgmtRepository extends JpaRepository<ProductionMgmtEntity, Integer>{

}
