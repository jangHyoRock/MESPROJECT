package kr.co.tipsvalley.sf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tipsvalley.sf.httpEntity.UserMgmt;
import kr.co.tipsvalley.sf.repository.UserMgmtRepository;

@Service
public class UserMgmtService {

	@Autowired
	private UserMgmtRepository usermgmtrepository; 
	
	@Transactional
	public UserMgmt Save(UserMgmt board) {
		
		return usermgmtrepository.save(board.toEntity());
	}
	
}
