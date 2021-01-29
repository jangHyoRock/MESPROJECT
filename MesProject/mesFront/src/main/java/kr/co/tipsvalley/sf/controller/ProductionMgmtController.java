package kr.co.tipsvalley.sf.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.dto.ProductionMgmtSaveRequestDTO;
import kr.co.tipsvalley.sf.httpEntity.ProductionMgmtEntity;
import kr.co.tipsvalley.sf.service.impl.ProductionMgmtServiceImpl;


@RestController
@RequestMapping("/productionMgmt")
public class ProductionMgmtController {

	static final Logger logger = LoggerFactory.getLogger(ProductionMgmtController.class);
	
	@Autowired
	private ProductionMgmtServiceImpl productionMgmtServiceImpl;
	
	@RequestMapping("/register/productionList")
	public List<ProductionMgmtEntity> productList() {
		List<ProductionMgmtEntity> list = productionMgmtServiceImpl.getProductionMgmtList();
		return list;
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public @ResponseBody Long register(@RequestBody ProductionMgmtSaveRequestDTO param) {
		return productionMgmtServiceImpl.save(param);
	}
}
