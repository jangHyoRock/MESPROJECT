package kr.co.tipsvalley.sf.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.tipsvalley.sf.dto.ProductionMgmtSaveRequestDTO;
import kr.co.tipsvalley.sf.httpEntity.ProductionMgmtEntity;
import kr.co.tipsvalley.sf.repository.ProductionMgmtRepository;

@Service
public class ProductionMgmtServiceImpl {

	@Autowired
	ProductionMgmtRepository productionMgmtRepository;
	
	@Transactional
	public List<ProductionMgmtEntity> getProductionMgmtList() {
		List<ProductionMgmtEntity> productionMgmtEntity = productionMgmtRepository.findAll();
		return productionMgmtEntity;
	}
	
	@Transactional
	public Long save(ProductionMgmtSaveRequestDTO param) {
		return productionMgmtRepository.save(param.toEntity()).getProduct_no();
	}
	
	public ProductionMgmtEntity save(ProductionMgmtEntity param) {
		productionMgmtRepository.save(param);
		return param;
	}
}
