package kr.co.tipsvalley.sf.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.tipsvalley.sf.httpEntity.Contents9_table;

@Configuration
@Repository
public interface Contents9_tableRepository extends JpaRepository<Contents9_table, Integer> {


}
