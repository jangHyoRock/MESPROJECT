package kr.co.tipsvalley.sf.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map.Entry;
import java.util.Properties;

import org.apache.hadoop.hbase.Cell;
import org.apache.hadoop.hbase.CellUtil;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tipsvalley.sf.httpEntity.RestResponseEntity;
import kr.co.tipsvalley.sf.model.json.CpuHbaseInfo;
import kr.co.tipsvalley.sf.model.json.KafkaSensorInfo;
import kr.co.tipsvalley.sf.util.HbaseUtil;

/*
 * A controller that manages the sensor APIs.
 */
@RestController
@RequestMapping("/spark")
public class SparkStreamingController {

	static final Logger logger = LoggerFactory.getLogger(SparkStreamingController.class);
	
	@GetMapping("/data")
	public RestResponseEntity<List<KafkaSensorInfo>> kafka(Model model) throws IOException {
		System.out.println("spark.data call");
		RestResponseEntity<List<KafkaSensorInfo>> result = null;
		List<KafkaSensorInfo> data = new ArrayList<KafkaSensorInfo>();
		HashMap<String, KafkaSensorInfo> data2 = new HashMap<String, KafkaSensorInfo>();
		KafkaConsumer<String, String> consumer = null;
		
		try {
			Properties props = new Properties();
			props.put("bootstrap.servers", "kafka1:9092,kafka2:9092,kafka3:9092");	//카프카 서버목록
			props.put("group.id", "sensor-consumer-spark-web"); //카프카 컨슈머 그룹 아이디
			props.put("group.id", "sensor-consumer-spark-web-local"); //카프카 컨슈머 그룹 아이디(로컬용)
			props.put("enable.auto.commit", "true");	//자동 커밋
			props.put("auto.offset.reset", "latest");	//옵셋 옵션 커밋 이후 데이터 요청
			props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
			props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

			consumer = new KafkaConsumer<>(props);

			//카프카 요청 토픽 목록 리스트
			consumer.subscribe(Arrays.asList("sensor-topic-spark-w"));
			
			ConsumerRecords<String, String> records = consumer.poll(1000);	//폴링 타임 1000ms
			
			logger.info("/spark/data records count: {}", records.count());

			//레코드로 부터 토픽별 처리
			for (ConsumerRecord<String, String> record : records) {
				logger.info("all recored kafka record: {}", record);
				switch (record.topic()) {
				case "sensor-topic-spark-w":	//토픽명
					logger.info("kafka record: {}", record);
					String rowData[] = record.value().split(","); // split문자(,)로 문자 배열 생성
					KafkaSensorInfo kafkaSensorInfo = new KafkaSensorInfo();

					if(rowData[4].indexOf("T")>0) { //날짜 유형 문자열 처리
						kafkaSensorInfo.setTime(rowData[4].substring(rowData[4].indexOf("T")+1, rowData[4].indexOf("T")+9));
					}else {
						kafkaSensorInfo.setTime(rowData[4]);
					}
					kafkaSensorInfo.setIlluminance(Double.parseDouble(rowData[1]));	//조도센서값
					kafkaSensorInfo.setTemperature(Double.parseDouble(rowData[2]));	//온도센서값
					kafkaSensorInfo.setHumidity(Double.parseDouble(rowData[3]));	//습도센서값
					kafkaSensorInfo.setDeviceMacAddr(rowData[0]);	//센서 맥주소값

					data2.put(rowData[0], kafkaSensorInfo);
					break;
				default:
					break;
				}
			}
			for (Entry<String, KafkaSensorInfo> entry : data2.entrySet()) {
				data.add(entry.getValue());
			}
			result = new RestResponseEntity<List<KafkaSensorInfo>>(data);
		} catch (Exception e) {
			result = new RestResponseEntity<List<KafkaSensorInfo>>(e);
		} finally {
			if (consumer != null) consumer.close();
		}
		
		return result;
	}
	
	@GetMapping("/cpuInfo")
	public RestResponseEntity<List<CpuHbaseInfo>> fluentdCpuInfo(Model model) throws IOException {
		System.out.println("spark.cpuInfo call");
		
		ResultScanner scanner = null;
		RestResponseEntity<List<CpuHbaseInfo>> result = null;
		List<CpuHbaseInfo> cpuInfoList = new ArrayList<CpuHbaseInfo>();
		
		try {
			// HBase 설정
			TableName tableName = TableName.valueOf("TIPS:FluentD_Spark");
			Connection connection = HbaseUtil.getConnection();
			Table table = connection.getTable(tableName);
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss", Locale.ENGLISH);
			Calendar cal = Calendar.getInstance();
			cal.setTime(new Date());
			cal.add(Calendar.SECOND, -205);

			// 기준 날짜
			String stdDate = sdf.format(cal.getTime());
			
			Scan scan = new Scan();
			scan.addColumn("cpu".getBytes(), "_p".getBytes());
			scan.setLimit(20).withStartRow(stdDate.getBytes());
			
			scanner = table.getScanner(scan);
			for (Result r : scanner) {
				if (logger.isDebugEnabled() ) {
					logger.debug("Found row: {}", r);
					logger.debug("key: {}", new String(r.getRow()));
				}
				
				for (Cell cell : r.listCells()) {
					if (logger.isDebugEnabled() ) {
						logger.debug("key: {}", Bytes.toString(r.getRow()));
						logger.debug("family: " + Bytes.toString(CellUtil.cloneFamily(cell)));
						logger.debug("qualifier: " + Bytes.toString(CellUtil.cloneQualifier(cell)));
						logger.debug("timestamp: " + cell.getTimestamp());
					}
					
					CpuHbaseInfo cpuHbaseInfo = new CpuHbaseInfo();
					cpuHbaseInfo.setKey(Bytes.toString(r.getRow()));
					cpuHbaseInfo.setCpuP(Double.valueOf(Bytes.toString(CellUtil.cloneValue(cell))));
					cpuHbaseInfo.setTimestamp(cell.getTimestamp());
					cpuHbaseInfo.setTime(cpuHbaseInfo.getKey());
					
					cpuInfoList.add(cpuHbaseInfo);
				}
			}
			
			result = new RestResponseEntity<List<CpuHbaseInfo>>(cpuInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			result = new RestResponseEntity<List<CpuHbaseInfo>>(e);
		} finally {
			if (scanner != null) scanner.close();
		}
		
		return result;
	}
	
}