package kr.co.tipsvalley.sf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.tipsvalley.sf.httpEntity.Contents9_table;
import kr.co.tipsvalley.sf.repository.Contents9_tableRepository;

@Service
public class Contents9_tableService {
	
	@Autowired
	private Contents9_tableRepository boardrepository2;
	
	
	@Transactional
	public Contents9_table Save(Contents9_table board) {
		
		return boardrepository2.save(board.toEntity());
	}
	
	@Transactional
	public void delete(int num1) {
		 
		boardrepository2.deleteById(num1);
	}

	
}
