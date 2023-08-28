---
id: 'connector-develop'
title: '数据源开发'
---

Connector 是 Datavines 中一个核心概念，一个 Connector 表示一个连接器，用于连接数据源。Metric 采用插件化设计，用户可以根据自己的需求来实现一个 Connector。下面我们来详细讲解一下如何自定义`Connector`。

### 第一步
我们先了解下几个接口和抽象类，它们是实现自定义 Connector 的关键。

#### ConnectorFactory 接口
`ConnectorFactory`接口中定义了 Connector 需要的Connector、Executor、Dialect、TypeConverter等接口。

```
@SPI
public interface ConnectorFactory {

    String getCategory();

    Connector getConnector();

    ResponseConverter getResponseConverter();

    Dialect getDialect();

    ConnectorParameterConverter getConnectorParameterConverter();

    Executor getExecutor();

    TypeConverter getTypeConverter();
}
```

#### Connector 接口
Connector 接口中主要定义了获取数据源中数据库、表和列、测试链接、配置参数和关键属性等接口。

```
public interface Connector {

    default ConnectorResponse getDatabases(GetDatabasesRequestParam param) throws SQLException {
        return null;
    }

    default ConnectorResponse getTables(GetTablesRequestParam param) throws SQLException {
        return null;
    }

    default ConnectorResponse getColumns(GetColumnsRequestParam param) throws SQLException {
        return null;
    }

    default ConnectorResponse getPartitions(ConnectorRequestParam param) {
        return null;
    }

    default String getConfigJson(boolean isEn) {
        return null;
    }

    default ConnectorResponse testConnect(TestConnectionRequestParam param) {
        return null;
    }

    List<String> keyProperties();
}
```

#### Executor 接口
Executor 接口中主要定义执行数据查询的接口。

```
public interface Connector {

    default ConnectorResponse queryForPage(ExecuteRequestParam param) throws Exception {
        return null;
    }

    default ConnectorResponse queryForList(ExecuteRequestParam param) throws Exception {
        return null;
    }

    default ConnectorResponse queryForOne(ExecuteRequestParam param) throws Exception {
        return null;
    }

    default ConnectorResponse deleteData(ExecuteRequestParam param) throws Exception {
        return null;
    }
}
```

#### Dialect 接口

Dialect 接口中定义了数据源的各种方言、查询脚本和支持的特性。
```
public interface Dialect {

    String getDriver();

    String getColumnPrefix();

    String getColumnSuffix();

    default Map<String,String> getDialectKeyMap() {
        return new HashMap<>();
    }

    List<String> getExcludeDatabases();

    default String invalidateItemCanOutput(){
        return "true";
    }

    default String invalidateItemCanOutputToSelf(){
        return "false";
    }

    default boolean supportToBeErrorDataStorage(){
        return false;
    }

    default String getJDBCType(DataType dataType){
        return dataType.toString();
    }

    default DataType getDataType(String jdbcType) {
        return DataType.valueOf(jdbcType);
    }

    default String quoteIdentifier(String column) {
        return "`" + column + "`";
    }

    default String getTableExistsQuery(String table) {
        return String.format("SELECT * FROM %s WHERE 1=0", table);
    }

    default String getSchemaQuery(String table) {
        return String.format("SELECT * FROM %s WHERE 1=0", table);
    }

    default String getCountQuery(String table) {
        return String.format("SELECT COUNT(1) FROM %s", table);
    }

    default String getSelectQuery(String table) {
        return String.format("SELECT * FROM %s", table);
    }

    default String getCreateTableAsSelectStatement(String srcTable, String targetDatabase, String targetTable) {
        return String.format("CREATE TABLE %s.%s AS SELECT * FROM %s", quoteIdentifier(targetDatabase), quoteIdentifier(targetTable), quoteIdentifier(srcTable));
    }

    default String getCreateTableStatement(String table, List<StructField> fields, TypeConverter typeConverter) {
        if (CollectionUtils.isNotEmpty(fields)) {
            String columns = fields.stream().map(field -> {
                return quoteIdentifier(field.getName()) + " " + typeConverter.convertToOriginType(field.getDataType());
            }).collect(Collectors.joining(","));

            return String.format("CREATE TABLE IF NOT EXISTS %s (%s)", table, columns);
        }

        return "";
    }

    default String getInsertAsSelectStatement(String srcTable, String targetDatabase, String targetTable) {
        return String.format("INSERT INTO %s.%s SELECT * FROM %s", quoteIdentifier(targetDatabase), quoteIdentifier(targetTable), quoteIdentifier(srcTable));
    }

    String getErrorDataScript(Map<String, String> configMap);

    String getValidateResultDataScript(Map<String, String> configMap);
}

```
#### ConnectorParameterConverter 接口

ConnectorParameterConverter 接口负责对输入的参数进行转换，转换成符合引擎执行的格式。
```
public interface ConnectorParameterConverter {

    Map<String,Object> converter(Map<String,Object> parameter);

    default String getConnectorUUID(Map<String,Object> parameter) {
        Map<String, Object> convertResult = converter(parameter);
        return DigestUtils.md5Hex(
                String.valueOf(convertResult.get(URL)) +
                convertResult.get(TABLE) +
                convertResult.get(USER) +
                convertResult.get(PASSWORD));
    }
}
```

#### TypeConverter 接口

TypeConverter 接口定义数据源中的字段类型转换方法，支持将原始类型与系统类型的互相转换。

```
public interface TypeConverter {

    DataType convert(String originType);

    String convertToOriginType(DataType dataType);
}
```

#### ConfigBuilder 接口

ConfigBuilder 接口定义了连接器配置参数的构造，用于返回给给前端进行展示。

```
public interface ConfigBuilder {

    String build(boolean isEn);
}
```

#### datavines-connector-jdbc 模块

datavines-connector-jdbc 模块是 JDBC 类型数据源的基础实现，实现了 JDBC 类型 的 Connector 的基本操作，如果要新增一个 JDBC 类型的 Connector，引入该模块再做一些修改即可。

### 第二步

了解完上面的接口和 datavines-connector-jdbc 模块以后，自定义一个JDBC类型 的`Connector`就变得格外简单了。

#### 基础工作
在 datavines-connector-plugins 下创建一个新 Connector 的 module

![plugin_develop_connector_module](/doc/image/plugin_develop_connector_module.png)

在 pom.xml 中添加
```
<dependency>
    <groupId>io.datavines</groupId>
    <artifactId>datavines-connector-jdbc</artifactId>
    <version>${project.version}</version>
</dependency>
```

#### 以 MySQL Connector 为例来讲解

新增一个`JDBC`类型的`Connector` 可以继承 datavines-connector-jdbc 模块中的各种实现类。

- 创建 MysqlConfigBuilder 继承 JdbcConfigBuilder，对 getPropertiesInput 进行重写，这里重写的目的是增加一些连接数据源的配置，如果不需要则无需重写。
```java
public class MysqlConfigBuilder extends JdbcConfigBuilder {

    @Override
    protected InputParam getPropertiesInput(boolean isEn) {
        return getInputParam("properties",
                isEn ? "properties" : "参数",
                isEn ? "please enter properties,like key=value&key1=value1" : "请填入参数，格式为key=value&key1=value1", 2, null,
                "useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai");
    }
}
```
- 创建 MysqlDataSourceInfo 继承 BaseJdbcDataSourceInfo，主要是实现数据源的连接URL、Driver等方法。
```java
public class MysqlDataSourceInfo extends BaseJdbcDataSourceInfo {

    public MysqlDataSourceInfo(JdbcConnectionInfo jdbcConnectionInfo) {
        super(jdbcConnectionInfo);
    }

    @Override
    public String getAddress() {
        return "jdbc:mysql://"+getHost()+":"+getPort();
    }

    @Override
    public String getDriverClass() {
        return "com.mysql.cj.jdbc.Driver";
    }

    @Override
    public String getType() {
        return "mysql";
    }

    @Override
    protected String getSeparator() {
        return "?";
    }

    @Override
    protected String filterProperties(String other){
        return other;
    }
}
```

- 创建 MysqlConnector 继承 JdbcConnector， JdbcConnector里面已经默认实现了获取数据库列表、表列表、列列表、测试连接等接口，不同的数据源在通过 jdbc 连接时要传给 DatabaseMetaData 的参数可能都不太一样，需要根据不同的数据去实现。
```java
public class MysqlConnector extends JdbcConnector {

    @Override
    public BaseJdbcDataSourceInfo getDatasourceInfo(JdbcConnectionInfo jdbcConnectionInfo) {
        return new MysqlDataSourceInfo(jdbcConnectionInfo);
    }

    @Override
    public ResultSet getMetadataColumns(DatabaseMetaData metaData, String catalog, String schema, String tableName, String columnName) throws SQLException {
        return metaData.getColumns(schema, null, tableName, columnName);
    }

    @Override
    public ResultSet getMetadataTables(DatabaseMetaData metaData, String catalog, String schema) throws SQLException {
        return metaData.getTables(schema, null, null, TABLE_TYPES);
    }

    @Override
    public ResultSet getMetadataDatabases(Connection connection) throws SQLException {
        DatabaseMetaData metaData = connection.getMetaData();
        return metaData.getCatalogs();
    }
    
}
```
- 创建 MysqlConnectorParameterConverter 继承 JdbcConnectorParameterConverter， 该接口已经默认了参数的格式化转换，只需要对URL的构造做个性化的实现。
```java
public class MysqlConnectorParameterConverter extends JdbcConnectorParameterConverter {

    @Override
    protected String getUrl(Map<String, Object> parameter) {
        String url = String.format("jdbc:mysql://%s:%s/%s",
                parameter.get(HOST),
                parameter.get(PORT),
                parameter.get(DATABASE));
        String properties = (String)parameter.get(PROPERTIES);
        if (StringUtils.isNotEmpty(properties)) {
            url += "?" + properties;
        }

        return url;
    }

}
```
- 创建 MysqlDialect 继承 JdbcDialect， 针对不同的数据源的方言做一些个性化实现。
```java
public class MysqlDialect extends JdbcDialect {

    @Override
    public Map<String, String> getDialectKeyMap() {
        super.getDialectKeyMap();
        dialectKeyMap.put(STRING_TYPE, "char");
        return dialectKeyMap;
    }

    @Override
    public String getDriver() {
        return "com.mysql.cj.jdbc.Driver";
    }

    @Override
    public String invalidateItemCanOutputToSelf() {
        return "true";
    }

    @Override
    public boolean supportToBeErrorDataStorage() {
        return true;
    }
}
```
- 创建 MysqlExecutor 继承 BaseJdbcExecutor， BaseJdbcExecutor中已经实现了各种数据查询的接口，如果数据源存在特殊的查询逻辑，可进行重写来实现自有的查询逻辑。
```java
public class MysqlExecutor extends BaseJdbcExecutor {

    @Override
    public BaseJdbcDataSourceInfo getDatasourceInfo(JdbcConnectionInfo jdbcConnectionInfo) {
        return new MysqlDataSourceInfo(jdbcConnectionInfo);
    }
}
```

- 最后创建 MysqlConnectorFactory 继承 AbstractJdbcConnectorFactory，将上面的实现类通过 Factory 接口进行实例构造。
```java
public class MysqlConnectorFactory extends AbstractJdbcConnectorFactory {

    @Override
    public ConnectorParameterConverter getConnectorParameterConverter() {
        return new MysqlConnectorParameterConverter();
    }

    @Override
    public Dialect getDialect() {
        return new MysqlDialect();
    }

    @Override
    public Connector getConnector() {
        return new MysqlConnector();
    }

    @Override
    public Executor getExecutor() {
        return new MysqlExecutor();
    }

    @Override
    public ConfigBuilder getConfigBuilder() {
        return new MysqlConfigBuilder();
    }
}

```

### 第三步
非常重要的一步
- 在 resources 目录下创建`META-INF`目录，再创建`plugins`目录。
- 在 plugins 目录下创建文件并且命名为`io.datavines.connector.api.ConnectorFactory`。
- 在文件中添加`mysql=io.datavines.connector.plugin.MysqlConnectorFactory`。

### 第四步
打包成`jar`放到 datavines 目录下的`libs`目录下，重启服务即可。