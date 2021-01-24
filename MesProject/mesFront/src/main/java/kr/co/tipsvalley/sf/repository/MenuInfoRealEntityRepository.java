package kr.co.tipsvalley.sf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import kr.co.tipsvalley.sf.model.MenuInfoReal;
import kr.co.tipsvalley.sf.model.MenuKhaiValueInfoReal;

@Repository
public interface MenuInfoRealEntityRepository extends JpaRepository<MenuInfoReal, Long>
{
	@Query(value="select menu_id  as menuid " +
	     	//"     ,	to_char(disp_order,'9999999') as  disporder   " + 
	     	"     ,	disp_order as  disporder   " +
			"     ,	p_menu_id as  pmenuid  " + 
			"     ,	menu_name as menuname   " +
			"     ,	icon  as icon   " +
			"     ,	menu_desc as menudesc    " +
			"     ,	use_yn as useyn    " +
	     	"   FROM user_menu    " + 
	     	"	where use_yn ='Y' order by disp_order asc ;			",
	nativeQuery=true)
	List<MenuKhaiValueInfoReal> findmenuAll();
}
