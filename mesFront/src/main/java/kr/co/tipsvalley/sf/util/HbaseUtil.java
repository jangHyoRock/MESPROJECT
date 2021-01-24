package kr.co.tipsvalley.sf.util;

import java.io.IOException;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HConstants;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.ColumnFamilyDescriptor;
import org.apache.hadoop.hbase.client.ColumnFamilyDescriptorBuilder;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.client.TableDescriptor;
import org.apache.hadoop.hbase.client.TableDescriptorBuilder;
import org.apache.hadoop.hbase.util.Bytes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HbaseUtil {
	static final Logger logger = LoggerFactory.getLogger(HbaseUtil.class);
	static Connection connection = null;
	
	public static Connection getConnection() {
		if (connection == null) {
			try {
				// connection 설정 내용
				Configuration config = HBaseConfiguration.create();
				config.set("hbase.master", "name1.tipsbdsys:16010"); // master info
				config.set("hbase.zookeeper.quorum", "name1.tipsbdsys,util1.tipsbdsys,util2.tipsbdsys");
				config.set("hbase.zookeeper.property.clientPort", "2181");
				config.set("zookeeper.znode.parent","/hbase-unsecure");
				
				connection = ConnectionFactory.createConnection(config);
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
		}
		
		return connection;
	}
	
	public static ColumnFamilyDescriptor getColumnFamilyDescriptor(String columnFamily) {
		return HbaseUtil.getColumnFamilyDescriptor(columnFamily, HConstants.REPLICATION_SCOPE_LOCAL);
	}
	
	public static ColumnFamilyDescriptor getColumnFamilyDescriptor(String columnFamily, int scope) {
		ColumnFamilyDescriptor cfd = ColumnFamilyDescriptorBuilder.newBuilder(Bytes.toBytes(columnFamily))
			.setMaxVersions(10)
			.setInMemory(true)
			.setBlocksize(8 * 1024)
			.setScope(scope)
			.build();
		
		return cfd;
	}
	
	public static TableDescriptor getTableDescriptor(TableName tableName, String columnFamily) {
		return HbaseUtil.getTableDescriptor(tableName, columnFamily, HConstants.REPLICATION_SCOPE_LOCAL);
	}
	
	public static TableDescriptor getTableDescriptor(TableName tableName, String columnFamily, int scope) {
		TableDescriptor tableD = TableDescriptorBuilder.newBuilder(tableName)
			.setColumnFamily(HbaseUtil.getColumnFamilyDescriptor(columnFamily))
			.build();
		
		return tableD;
	}
	
	public static Put getPut(String row, String columnFamily, String qualifier, String value) {
		Put p = new Put(Bytes.toBytes(row));
		p.addColumn(Bytes.toBytes(columnFamily), Bytes.toBytes(qualifier), Bytes.toBytes(value));
		
		return p;
	}
	
	public static String getValue(Table table , String row, String columnFamily, String qualifier) {
		Get g = new Get(Bytes.toBytes(row));
		Result r = null;
		
		try {
			r = table.get(g);
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		
		return Bytes.toString(r.getValue(Bytes.toBytes(columnFamily), Bytes.toBytes(qualifier)));
	}
	
	public static void closeAdmin() {
		try {
			HbaseUtil.getConnection().getAdmin().close();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	public static void closeConnection() {
		try {
			HbaseUtil.getConnection().close();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
	
}