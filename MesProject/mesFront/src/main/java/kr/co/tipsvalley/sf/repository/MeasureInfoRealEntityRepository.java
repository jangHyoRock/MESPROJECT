package kr.co.tipsvalley.sf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import kr.co.tipsvalley.sf.model.KhaiValueInfoReal;
import kr.co.tipsvalley.sf.model.MeasureInfoReal;

@Repository
public interface MeasureInfoRealEntityRepository extends JpaRepository<MeasureInfoReal, Long>
{
	@Query(value="SELECT \"datatime\" " +
			     "     , \"sidoname\" " + 
			     "     , \"stationname\" " + 
			     "     , \"mangname\" " + 
			     "     , \"khaivalue\" " + 
			     "     , \"khaigrade\" " +
				 "  FROM (SELECT \"datatime\" " + 
				 "             , \"sidoname\" " + 
				 "             , \"stationname\" " + 
				 "             , \"mangname\" " + 
				 "             , \"khaivalue\" " + 
				 "             , \"khaigrade\" " + 
				 "             , row_number() over (partition by \"stationname\", \"mangname\" order by \"datatime\" desc) rn " + 
				 "	 	  FROM \"SYSTEM\".\"SparkController_fine_dust_stage\" ) a" + 
				 "	 	,system.sido_code b " +
				 "  WHERE a.\"stationname\" = b.sido_code " + 
				 "    AND a.\"stationname\" = ?1 " + 
				 "  order by \"datatime\", \"stationname\" ;", 
      nativeQuery=true)
	List<KhaiValueInfoReal> findKhaiValueInfoRealBySidonameAndMangname(String stationName);
	
	@Query(value="SELECT \"datatime\" " +
		     "     , \"sidoname\" " + 
		     "     , \"stationname\" " + 
		     "     , \"mangname\" " + 
		     "     , \"khaivalue\" " + 
		     "     , \"khaigrade\" " +
			 "  FROM (SELECT \"datatime\" " + 
			 "             , \"sidoname\" " + 
			 "             , \"stationname\" " + 
			 "             , \"mangname\" " + 
			 "             , \"khaivalue\" " + 
			 "             , \"khaigrade\" " + 
			 "             , row_number() over (partition by \"stationname\", \"mangname\" order by \"datatime\" desc) rn " + 
			 "	 	  FROM \"SYSTEM\".\"SparkController_fine_dust_stage\" ) a" + 
			 "	 	,system.sido_code b " +
			 "  WHERE a.\"stationname\" = b.sido_code " + 
			 "  order by \"datatime\", \"stationname\" ;", 
	 nativeQuery=true)
	List<KhaiValueInfoReal> findKhaiValueInfoRealBySidonameAndMangname();
	
	@Query(value="SELECT sido_code as stationname " +
		     	 "     , sido_name as sidoname    " + 
		     	 "   FROM system.sido_code    " + 
		     	"   WHERE sido_code = ?1    " +
			     " ORDER BY sido_code ;", 
	 nativeQuery=true)
	List<KhaiValueInfoReal> findSidoAll(String stationName);
	
	@Query(value="SELECT sido_code as stationname " +
	     	 "     , sido_name as sidoname    " + 
	     	"   FROM system.sido_code    " + 
		     " ORDER BY sido_code ;", 
	nativeQuery=true)
	List<KhaiValueInfoReal> findSidoAll();
	
	
}
