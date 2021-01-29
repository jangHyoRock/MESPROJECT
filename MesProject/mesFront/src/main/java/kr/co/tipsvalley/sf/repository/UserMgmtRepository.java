package kr.co.tipsvalley.sf.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Repository;

import kr.co.tipsvalley.sf.httpEntity.UserMgmt;

import org.springframework.data.jpa.repository.JpaRepository;

@Configuration
@Repository
public interface UserMgmtRepository extends JpaRepository<UserMgmt, String> {

}
