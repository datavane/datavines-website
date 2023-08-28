---
id: 'metric-develop'
title: '检查规则开发'
---

Metric 是 Datavines 中一个核心概念，一个 Metric 表示一个数据质量检查规则，比如空值检查和表行数检查都是一个规则。Metric 采用插件化设计，用户可以根据自己的需求来实现一个 Metric。下面我们来详细讲解一下如何自定义`Metric`。

### 第一步
我们先了解下几个接口和抽象类，它们是实现自定义 Metric 的关键。

#### SqlMetric 接口
`SqlMetric`接口中定义了规则的各种属性和操作的接口。

```
@SPI
public interface SqlMetric {
    // 中文名
    String getName();
    // 英文名
    String getZhName();
    // 根据系统的语言进行名字返回
    default String getNameByLanguage(boolean isEn) {
        return isEn ? getName() : getZhName();
    }
    // 规则属于哪个维度，比如准确性、唯一性等等
    MetricDimension getDimension();
    // 规则的类型，包括单表检查、单表自定义检查
    MetricType getType();
    // 规则的级别，比如表级别、列级别
    default MetricLevel getLevel() {
        return MetricLevel.NONE;
    }
    // 是否支持错误数据输出
    boolean isInvalidateItemsCanOutput();

    /**
     * 获取不符合规则的数据的SQL语句
     * @return ExecuteSql
     */
    ExecuteSql getInvalidateItems(String uniqueKey);

    /**
     * 计算实际值的SQL语句
     * @return ExecuteSql
     */
    ExecuteSql getActualValue(String uniqueKey);

    /**
     * 实际值的字段名
     */
    default String getActualName() {
        return "actual_value";
    }
    // 实际值的类型，比如数字，百分比或者列表
    default String getActualValueType() {
        return MetricActualValueType.COUNT.getDescription();
    }
    // 对参数进行检查并输出检查结果
    CheckResult validateConfig(Map<String,Object> config);
    //规则所需要的参数
    Map<String, ConfigItem> getConfigMap();
    //构造规则前需要做的检查
    void prepare(Map<String,String> config);

    default String getIssue() {
        return "";
    }
    // 适合哪些字段类型
    List<DataVinesDataType> suitableType();
    // 是否支持多选，比如表行数检查支持多张表
    default boolean supportMultiple() {
        return false;
    }
    // 对规则参数的重新构造，配合表行数多张表检查
    default List<Map<String,Object>> getMetricParameter(Map<String,Object> metricParameter) {
        return Collections.singletonList(metricParameter);
    }
}
```
#### BaseSingleTable 抽象类

`BaseSingleTable`是实现了 SqlMetric 接口的抽象类，实现了表级别检查规则中所需要参数的添加、错误数据SQL语句构造和实际值计算SQL语句构造和对过滤条件的处理等。

- 这里定义了获取不符合规则的数据的基础SQL语句，判断类型的规则比如正则表达式检查和枚举值检查，只需要在基础SQL语句后面添加过滤条件即可。
```
    protected StringBuilder invalidateItemsSql = new StringBuilder("select * from ${table}");
```
-  实际值计算SQL语句默认是计算不符合规则数据的行数
```
String actualValueSql = "select count(1) as actual_value_"+ uniqueKey +" from ${invalidate_items_table}"; 
```
- 计算平均值、汇总值等统计类型的规则需要重新实现`getActualValue()`中的`ExecuteSql`。

```
public abstract class BaseSingleTable implements SqlMetric {
    // 这里定义了获取不符合规则的数据的基础 SQL 语句，判断类的规则比如正则表达式和枚举值检查，只需要在基础SQL后面添加过滤条件即可。
    protected StringBuilder invalidateItemsSql = new StringBuilder("select * from ${table}");

    protected List<String> filters = new ArrayList<>();

    protected HashMap<String,ConfigItem> configMap = new HashMap<>();

    protected Set<String> requiredOptions = new HashSet<>();

    public BaseSingleTable() {
        configMap.put("table",new ConfigItem("table", "表名", "table"));
        configMap.put("filter",new ConfigItem("filter", "过滤条件", "filter"));

        requiredOptions.add("table");
    }

    @Override
    public ExecuteSql getInvalidateItems(String uniqueKey) {
        ExecuteSql executeSql = new ExecuteSql();
        executeSql.setResultTable("invalidate_items_" + uniqueKey);
        executeSql.setSql(invalidateItemsSql.toString());
        executeSql.setErrorOutput(isInvalidateItemsCanOutput());
        return executeSql;
    }

    @Override
    public ExecuteSql getActualValue(String uniqueKey) {
        ExecuteSql executeSql = new ExecuteSql();
        executeSql.setResultTable("invalidate_count_" + uniqueKey);
        String actualValueSql = "select count(1) as actual_value_"+ uniqueKey +" from ${invalidate_items_table}";
        executeSql.setSql(actualValueSql);
        executeSql.setErrorOutput(false);
        return executeSql;
    }

    @Override
    public CheckResult validateConfig(Map<String, Object> config) {
        return ConfigChecker.checkConfig(config, requiredOptions);
    }

    @Override
    public void prepare(Map<String, String> config) {
        if (config.containsKey("filter")) {
            filters.add(config.get("filter"));
        }

        addFiltersIntoInvalidateItemsSql();
    }

    private void addFiltersIntoInvalidateItemsSql() {
        if (filters.size() > 0) {
            invalidateItemsSql.append(" where ").append(String.join(" and ", filters));
        }
    }

    @Override
    public MetricLevel getLevel() {
        return MetricLevel.TABLE;
    }
}
```
#### BaseSingleTableColumn 抽象类

`BaseSingleTableColumn`是列级别的抽象实现类，主要是添加列级别规则的通用参数。
```
public abstract class BaseSingleTableColumn extends BaseSingleTable {

    public BaseSingleTableColumn() {
        super();
        configMap.put("column",new ConfigItem("column", "列名", "column"));
        requiredOptions.add("column");
    }

    @Override
    public Map<String, ConfigItem> getConfigMap() {
        return configMap;
    }

    @Override
    public MetricLevel getLevel() {
        return MetricLevel.COLUMN;
    }

    @Override
    public boolean isInvalidateItemsCanOutput() {
        return false;
    }
}
```

### 第二步

了解完上面的三个基础类以后，自定义一个`Metric`就变得格外简单了。

#### 基础工作
在 datavines-metric-plugins 下创建一个新规则的 module

![plugin_develop_metric_module](/doc/image/plugin_develop_metric_module.png)

在 pom.xml 中添加
```
 <dependency>
     <groupId>io.datavines</groupId>
     <artifactId>datavines-metric-base</artifactId>
     <version>${project.version}</version>
 </dependency>
```

#### 以 枚举值检查 规则为例来讲解

- 判断要实现的规则的级别，因为枚举值检查是列级别，所以继承 BaseSingleTableColumn 即可。
- 在构造函数中的`configMap`添加`enum_list`参数用于返回给前端进行展示，在`requiredOptions`添加`enum_list`用于参数的检查。
- 实现英文名、中文名、规则维度、规则类型这些基础的属性。
- 因为枚举值检查规则是为了找出在枚举值列表中的数据，所以只需要在`fileters`这个数组里面加入`(${column} in ( ${enum_list} ))`，`prepare()`方法会自动进行不符合规则的SQL语句构造。
- 实现`suitableType()`方法添加规则适用的字段类型。

```
public class ColumnInEnums extends BaseSingleTableColumn {

    public ColumnInEnums(){
        super();
        configMap.put("enum_list",new ConfigItem("enum_list", "枚举值列表", "enum_list"));
        requiredOptions.add("enum_list");
    }

    @Override
    public String getName() {
        return "column_in_enums";
    }

    @Override
    public String getZhName() {
        return "枚举值检查";
    }

    @Override
    public MetricDimension getDimension() {
        return MetricDimension.EFFECTIVENESS;
    }

    @Override
    public MetricType getType() {
        return MetricType.SINGLE_TABLE;
    }

    @Override
    public boolean isInvalidateItemsCanOutput() {
        return true;
    }

    @Override
    public void prepare(Map<String, String> config) {
        if (config.containsKey("enum_list") && config.containsKey("column")) {
            filters.add(" (${column} in ( ${enum_list} )) ");
        }
        super.prepare(config);
    }

    @Override
    public List<DataVinesDataType> suitableType() {
        return Arrays.asList(DataVinesDataType.NUMERIC_TYPE, DataVinesDataType.STRING_TYPE, DataVinesDataType.DATE_TIME_TYPE);
    }
}
```

### 第三步
非常重要的一步
- 在 resources 目录下创建`META-INF/plugins`目录。
- 在 plugins 目录下创建文件并且命名为`io.datavines.metric.api.SqlMetric`。
- 在文件中添加`column_in_enums=io.datavines.metric.plugin.ColumnInEnums`。

### 第四步
打包成`jar`放到 datavines 目录下的`libs`目录下，重启服务即可。
