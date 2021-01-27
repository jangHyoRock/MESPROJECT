package kr.co.tipsvalley.sf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import kr.co.tipsvalley.sf.model.MenuInfoEntity;
import kr.co.tipsvalley.sf.model.MenuInfoValue;

@Repository
public interface MenuInfoRealEntityRepository extends JpaRepository<MenuInfoEntity, Long>
{
	@Query(value="select a.menu_id as menuid" +
	     	//"     ,	to_char(disp_order,'9999999') as  disporder   " + 
	     	"     ,	a.disp_order as disporder     " +
			"     ,	a.p_menu_id  as pmenuid" + 
			"     ,	a.menu_name  as menuname" +
			"     ,	a.icon as icon " +
			"     ,	a.menu_desc as menudesc    " +
			"     ,	a.use_yn  as  useyn  " +
	     	"   FROM user_menu a   " + 
	     	"	where a.use_yn ='Y' order by a.disp_order asc ;			",
	nativeQuery=true)
	List<MenuInfoValue> findmenuAll();
}
