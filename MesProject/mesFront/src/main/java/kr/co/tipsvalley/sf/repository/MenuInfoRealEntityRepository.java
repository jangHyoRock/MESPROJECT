package kr.co.tipsvalley.sf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.tipsvalley.sf.model.MenuInfoEntity;
import kr.co.tipsvalley.sf.model.MenuInfoValue;
import kr.co.tipsvalley.sf.model.MenuTitleValue;

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
	
	/*
	 * @Query(value="SELECT " + "a.menu_id" + ", a.p_menu_id as pmenuid" +
	 * ", a.icon as icon" + ", b.menu_desc as menu_desc" + ", b.locale as locale" +
	 * ", b.menu_name as menu_name " + "	FROM user_menu A " +
	 * "	INNER JOIN contents_title B " + "	ON a.menu_id = b.menu_id " +
	 * "	WHERE use_yn = 'Y' AND b.locale = :locale " + "	ORDER BY disp_order " ,
	 * nativeQuery=true) List<MenuTitleValue> findMenuDesc(@Param("locale") String
	 * locale);
	 */
}
