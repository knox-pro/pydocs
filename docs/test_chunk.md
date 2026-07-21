# Pandas

# 1 Pandas介绍

## 学习目标

  * 目标
    * 了解Numpy与Pandas的不同
    * 了解Pandas的MultiIndex与panel结构
    * 说明Pandas的Series与Dataframe两种结构的区别
  * 应用
    * 股票涨跌幅数据的修改


* * *

## 1 Pandas介绍

![pandas](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/pandas.png)

  * 2008年WesMcKinney开发出的库
  * 专门用于数据挖掘的开源python库
  * **以 Numpy为基础，借力Numpy模块在计算方面性能高的优势**
  * **基 于matplotlib，能够简便的画图**
  * **独 特的数据结构**


## 2 为什么使用Pandas

Numpy已经能够帮助我们处理数据，能够结合matplotlib解决部分数据展示等问题，那么pandas学习的目的在什么地方呢？

  * **便 捷的数据处理能力**


![处理前](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/%E5%A4%84%E7%90%86%E5%89%8D.png)

![处理后](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/%E5%A4%84%E7%90%86%E5%90%8E.png)

  * **读 取文件方便**
  * **封 装了Matplotlib、Numpy的画图和计算**


## 3 案例：
    
    
    # 导入pandas
    
    import pandas as pd
    

回忆我们在numpy当中创建的股票涨跌幅数据形式？**
    
    
    # 创建一个符合正太分布的10个股票5天的涨跌幅数据
    stock_change = np.random.normal(0, 1, (10, 5))
    
    array([[-0.06544031, -1.30931491, -1.45451514,  0.57973008,  1.48602405],
           [-1.73216741, -0.83413717,  0.45861517, -0.80391793, -0.46878575],
           [ 0.21805567,  0.19901371,  0.7134683 ,  0.5484263 ,  0.38623412],
           [-0.42207879, -0.33702398,  0.42328531, -1.23079202,  1.32843773],
           [-1.72530711,  0.07591832, -1.91708358, -0.16535818,  1.07645091],
           [-0.81576845, -0.28675278,  1.20441981,  0.73365951, -0.06214496],
           [-0.98820861, -1.01815231, -0.95417342, -0.81538991,  0.50268175],
           [-0.10034128,  0.61196204, -0.06850331,  0.74738433,  0.143011  ],
           [ 1.00026175,  0.34241958, -2.2529711 ,  0.93921064,  1.14080312],
           [ 2.52064693,  1.55384756,  1.72252984,  0.61270132,  0.60888092]])
    

**但 是这样的数据形式很难看到存储的是什么的样的数据，并也很难获取相应的数据，比如需要获取某个指定股票的数据，就很难去获取！！**

#### 问题：如何让数据更有意义的显示？处理刚才的股票数据
    
    
    # 使用Pandas中的数据结构
    stock_day_rise = pd.DataFrame(stock_change)
    

#### 给股票涨跌幅数据增加行列索引,显示效果更佳

效果：

![stockdf](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/stockdf.png)

  * 增加行索引

# 构造行索引序列

stock_code = ['股票' + str(i) for i in range(stock_day_rise.shape[0])]

# 添加行索引

data = pd.DataFrame(stock_change, index=stock_code)

  * 增加列索引


股票的日期是一个时间的序列，我们要实现从前往后的时间还要考虑每月的总天数等，不方便。使用pd.date_range()：用于生成一组连续的时间序列(暂时了解)
    
    
    date_range(start=None,end=None, periods=None, freq='B')
    
        start:开始时间
    
        end:结束时间
    
        periods:时间天数
    
        freq:递进单位，默认1天,'B'默认略过周末
    
    
    
    # 生成一个时间的序列，略过周末非交易日
    date = pd.date_range('2017-01-01', periods=stock_day_rise.shape[1], freq='B')
    
    # index代表行索引，columns代表列索引
    data = pd.DataFrame(stock_change, index=stock_code, columns=date)
    

## 4 DataFrame

### 4.1 DataFrame结构

DataFrame对象既有行索引，又有列索引

  * 行索引，表明不同行，横向索引，叫index，0轴，axis=0
  * 列索引，表名不同列，纵向索引，叫columns，1轴，axis=1


![df](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/df.png)

### 4.2 DatatFrame的属性

  * **shape**

data.shape

# 结果

(10, 5)

  * **index**


DataFrame的行索引列表
    
    
    data.index
    
    Index(['股票0', '股票1', '股票2', '股票3', '股票4', '股票5', '股票6', '股票7', '股票8', '股票9'], dtype='object')
    

  * **columns**


DataFrame的列索引列表
    
    
    data.columns
    
    DatetimeIndex(['2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05',
                   '2017-01-06'],
                  dtype='datetime64[ns]', freq='B')
    

  * **values**


直接获取其中array的值
    
    
    data.values
    
    array([[-0.06544031, -1.30931491, -1.45451514,  0.57973008,  1.48602405],
           [-1.73216741, -0.83413717,  0.45861517, -0.80391793, -0.46878575],
           [ 0.21805567,  0.19901371,  0.7134683 ,  0.5484263 ,  0.38623412],
           [-0.42207879, -0.33702398,  0.42328531, -1.23079202,  1.32843773],
           [-1.72530711,  0.07591832, -1.91708358, -0.16535818,  1.07645091],
           [-0.81576845, -0.28675278,  1.20441981,  0.73365951, -0.06214496],
           [-0.98820861, -1.01815231, -0.95417342, -0.81538991,  0.50268175],
           [-0.10034128,  0.61196204, -0.06850331,  0.74738433,  0.143011  ],
           [ 1.00026175,  0.34241958, -2.2529711 ,  0.93921064,  1.14080312],
           [ 2.52064693,  1.55384756,  1.72252984,  0.61270132,  0.60888092]])
    

  * **T**


转置
    
    
    data.T
    

结果

![DF转置结果](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/DF%E8%BD%AC%E7%BD%AE%E7%BB%93%E6%9E%9C.png)

  * **head(5)** ：显示前5行内容


如果不补充参数，默认5行。填入参数N则显示前N行
    
    
    data.head(5)
    
    2017-01-02 00:00:00    2017-01-03 00:00:00    2017-01-04 00:00:00    2017-01-05 00:00:00    2017-01-06 00:00:00
    股票0    -0.065440    -1.309315    -1.454515    0.579730    1.486024
    股票1    -1.732167    -0.834137    0.458615    -0.803918    -0.468786
    股票2    0.218056    0.199014    0.713468    0.548426    0.386234
    股票3    -0.422079    -0.337024    0.423285    -1.230792    1.328438
    股票4    -1.725307    0.075918    -1.917084    -0.165358    1.076451
    

  * **tail(5)** :显示后5行内容


如果不补充参数，默认5行。填入参数N则显示后N行
    
    
    data.tail(5)
    
     2017-01-02 00:00:00    2017-01-03 00:00:00    2017-01-04 00:00:00    2017-01-05 00:00:00    2017-01-06 00:00:00
    股票5    -0.815768    -0.286753    1.204420    0.733660    -0.062145
    股票6    -0.988209    -1.018152    -0.954173    -0.815390    0.502682
    股票7    -0.100341    0.611962    -0.068503    0.747384    0.143011
    股票8    1.000262    0.342420    -2.252971    0.939211    1.140803
    股票9    2.520647    1.553848    1.722530    0.612701    0.608881
    

### 4.3 DatatFrame索引的设置

#### **4.3.1 修改行列索引值**
    
    
    stock_code = ["股票_" + str(i) for i in range(stock_day_rise.shape[0])]
    
    # 必须整体全部修改
    data.index = stock_code
    

结果
    
    
    2017-01-02 00:00:00    2017-01-03 00:00:00    2017-01-04 00:00:00    2017-01-05 00:00:00    2017-01-06 00:00:00
    股票_0    -0.065440    -1.309315    -1.454515    0.579730    1.486024
    股票_1    -1.732167    -0.834137    0.458615    -0.803918    -0.468786
    股票_2    0.218056    0.199014    0.713468    0.548426    0.386234
    股票_3    -0.422079    -0.337024    0.423285    -1.230792    1.328438
    股票_4    -1.725307    0.075918    -1.917084    -0.165358    1.076451
    股票_5    -0.815768    -0.286753    1.204420    0.733660    -0.062145
    股票_6    -0.988209    -1.018152    -0.954173    -0.815390    0.502682
    股票_7    -0.100341    0.611962    -0.068503    0.747384    0.143011
    股票_8    1.000262    0.342420    -2.252971    0.939211    1.140803
    股票_9    2.520647    1.553848    1.722530    0.612701    0.608881
    

注意：以下修改方式是错误的
    
    
    # 错误修改方式
    data.index[3] = '股票_3'
    

#### 4.3.2 重设索引

  * reset_index(drop=False)

    * 设置新的下标索引
    * drop:默认为False，不删除原来索引，如果为True,删除原来的索引值

# 重置索引,drop=False

data.reset_index()
    
    index    2017-01-02 00:00:00    2017-01-03 00:00:00    2017-01-04 00:00:00    2017-01-05 00:00:00    2017-01-06 00:00:00
    

0 股票_0 -0.065440 -1.309315 -1.454515 0.579730 1.486024 1 股票_1 -1.732167 -0.834137 0.458615 -0.803918 -0.468786 2 股票_2 0.218056 0.199014 0.713468 0.548426 0.386234 3 股票_3 -0.422079 -0.337024 0.423285 -1.230792 1.328438 4 股票_4 -1.725307 0.075918 -1.917084 -0.165358 1.076451 5 股票_5 -0.815768 -0.286753 1.204420 0.733660 -0.062145 6 股票_6 -0.988209 -1.018152 -0.954173 -0.815390 0.502682 7 股票_7 -0.100341 0.611962 -0.068503 0.747384 0.143011 8 股票_8 1.000262 0.342420 -2.252971 0.939211 1.140803 9 股票_9 2.520647 1.553848 1.722530 0.612701 0.608881

# 重置索引,drop=True

data.reset_index(drop=True)

2017-01-02 00:00:00 2017-01-03 00:00:00 2017-01-04 00:00:00 2017-01-05 00:00:00 2017-01-06 00:00:00 0 -0.065440 -1.309315 -1.454515 0.579730 1.486024 1 -1.732167 -0.834137 0.458615 -0.803918 -0.468786 2 0.218056 0.199014 0.713468 0.548426 0.386234 3 -0.422079 -0.337024 0.423285 -1.230792 1.328438 4 -1.725307 0.075918 -1.917084 -0.165358 1.076451 5 -0.815768 -0.286753 1.204420 0.733660 -0.062145 6 -0.988209 -1.018152 -0.954173 -0.815390 0.502682 7 -0.100341 0.611962 -0.068503 0.747384 0.143011 8 1.000262 0.342420 -2.252971 0.939211 1.140803 9 2.520647 1.553848 1.722530 0.612701 0.608881


#### 4.3.3 以某列值设置为新的索引

  * set_index( _keys_ , _drop=True_ )

    * **keys** : 列索引名成或者列索引名称的列表
    * **drop** : boolean, default True.当做新的索引，删除原来的列
    * #### 设置新索引案例


1、创建
    
    
    df = pd.DataFrame({'month': [1, 4, 7, 10],
                        'year': [2012, 2014, 2013, 2014],
                        'sale':[55, 40, 84, 31]})
    
       month  sale  year
    0  1      55    2012
    1  4      40    2014
    2  7      84    2013
    3  10     31    2014
    

2、以月份设置新的索引
    
    
    df.set_index('month')
           sale  year
    month
    1      55    2012
    4      40    2014
    7      84    2013
    10     31    2014
    

3、设置多个索引，以年和月份
    
    
    df.set_index(['year', 'month'])
                sale
    year  month
    2012  1     55
    2014  4     40
    2013  7     84
    2014  10    31
    

> 注：通过刚才的设置，这样DataFrame就变成了一个具有MultiIndex的DataFrame。

## 5 Series结构

什么是Series结构呢，我们直接看下面的图：

![series](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/series.png)

  * series结构只有行索引


我们将之前的涨跌幅数据进行转置，然后获取'股票0'的所有数据
    
    
    # series
    type(data['2017-01-02'])
    pandas.core.series.Series
    
    # 这一步相当于是series去获取行索引的值
    data['2017-01-02']['股票_0']
    -0.18753158283513574
    

### 1 创建series

通过已有数据创建

  * 指定内容，默认索引

pd.Series(np.arange(10))

  * 指定索引

pd.Series([6.7,5.6,3,10,2], index=[1,2,3,4,5])


通过字典数据创建
    
    
    pd.Series({'red':100, ''blue':200, 'green': 500, 'yellow':1000})
    

#### 2 series获取属性和值

  * index
  * values


# 2 基本数据操作

## 学习目标

  * 目标
    * 记忆DataFrame的形状、行列索引名称获取等基本属性
    * 应用Series和DataFrame的索引进行切片获取
    * 应用sort_index和sort_values实现索引和值的排序
  * 应用
    * 股票每日数据的操作


* * *

为了更好的理解这些基本操作，我们将读取一个真实的股票数据。关于文件操作，后面在介绍，这里只先用一下API
    
    
    # 读取文件
    data = pd.read_csv("./data/stock_day.csv")
    
    # 删除一些列，让数据更简单些，再去做后面的操作
    data = data.drop(["ma5","ma10","ma20","v_ma5","v_ma10","v_ma20"], axis=1)
    

![stockday](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/stockday.png)

## 1 索引操作

Numpy当中我们已经讲过使用索引选取序列和切片选择，pandas也支持类似的操作，也可以直接使用列名、行名

称，甚至组合使用。

### 1.1 **直 接使用行列索引(先列后行)**

获取'2018-02-27'这天的'close'的结果
    
    
    # 直接使用行列索引名字的方式（先列后行）
    data['open']['2018-02-27']
    23.53
    
    # 不支持的操作
    # 错误
    data['2018-02-27']['open']
    # 错误
    data[:1, :2]
    

### 1.2 **结 合loc或者iloc使用索引**

获取从'2018-02-27':'2018-02-22'，'open'的结果
    
    
    # 使用loc:只能指定行列索引的名字
    data.loc['2018-02-27':'2018-02-22', 'open']
    
    2018-02-27    23.53
    2018-02-26    22.80
    2018-02-23    22.88
    Name: open, dtype: float64
    
    # 使用iloc可以通过索引的下标去获取
    # 获取前100天数据的'open'列的结果
    data.iloc[0:100, 0:2].head()
    
                open    high    close    low
    2018-02-27    23.53    25.88    24.16    23.53
    2018-02-26    22.80    23.78    23.53    22.80
    2018-02-23    22.88    23.37    22.82    22.71
    

### 1.3 **使 用ix组合索引**

> Warning:Starting in 0.20.0, the `.ix` indexer is deprecated, in favor of the more strict `.iloc` and `.loc` indexers.

获取行第1天到第4天，['open', 'close', 'high', 'low']这个四个指标的结果
    
    
    # 使用ix进行下表和名称组合做引
    data.ix[0:4, ['open', 'close', 'high', 'low']]
    
    # 推荐使用loc和iloc来获取的方式
    data.loc[data.index[0:4], ['open', 'close', 'high', 'low']]
    data.iloc[0:4, data.columns.get_indexer(['open', 'close', 'high', 'low'])]
    
                open    close    high    low
    2018-02-27    23.53    24.16    25.88    23.53
    2018-02-26    22.80    23.53    23.78    22.80
    2018-02-23    22.88    22.82    23.37    22.71
    2018-02-22    22.25    22.28    22.76    22.02
    

## 2 赋值操作

对DataFrame当中的close列进行重新赋值为1
    
    
    # 直接修改原来的值
    data['close'] = 1
    # 或者
    data.close = 1
    

## 3 排序

排序有两种形式，一种对于索引进行排序，一种对于内容进行排序

  * 使用df.sort_values(by=, ascending=)

    * 单个键或者多个键进行排序,默认升序
    * ascending=False:降序
    * ascending=True:升序

# 按照涨跌幅大小进行排序 , 使用ascending指定按照大小排序

data = data.sort_values(by='p_change', ascending=False).head()
    
    open    high    close    low        volume price_change p_change turnover
    

2015-08-28 15.40 16.46 16.46 15.00 117827.60 1.50 10.03 4.03 2015-05-21 27.50 28.22 28.22 26.50 121190.11 2.57 10.02 4.15 2016-12-22 18.50 20.42 20.42 18.45 150470.83 1.86 10.02 3.77 2015-08-04 16.20 17.35 17.35 15.80 94292.63 1.58 10.02 3.23 2016-07-07 18.66 18.66 18.66 18.41 48756.55 1.70 10.02 1.67

# 按照过个键进行排序

data = data.sort_values(by=['open', 'high']) open high close low volume price_change p_change turnover 2015-06-15 34.99 34.99 31.69 31.69 199369.53 -3.52 -10.00 6.82 2015-06-12 34.69 35.98 35.21 34.01 159825.88 0.82 2.38 5.47 2015-06-10 34.10 36.35 33.85 32.23 269033.12 0.51 1.53 9.21 2017-11-01 33.85 34.34 33.83 33.10 232325.30 -0.61 -1.77 5.81 2015-06-11 33.17 34.98 34.39 32.51 173075.73 0.54 1.59 5.92

  * 使用df.sort_index给索引进行排序


这个股票的日期索引原来是从大到小，现在重新排序，从小到大
    
    
    # 对索引进行排序
    data.sort_index()
    
                open    high    close    low    volume    price_change    p_change    turnover
    2015-03-02    12.25    12.67    12.52    12.20    96291.73    0.32    2.62    3.30
    2015-03-03    12.52    13.06    12.70    12.52    139071.61    0.18    1.44    4.76
    2015-03-04    12.80    12.92    12.90    12.61    67075.44    0.20    1.57    2.30
    2015-03-05    12.88    13.45    13.16    12.87    93180.39    0.26    2.02    3.19
    2015-03-06    13.17    14.48    14.28    13.13    179831.72    1.12    8.51    6.16
    

  * 使用series.sort_values(ascending=True)进行排序


series排序时，只有一列，不需要参数
    
    
    data['p_change'].sort_values(ascending=True).head()
    
    2015-09-01   -10.03
    2015-09-14   -10.02
    2016-01-11   -10.02
    2015-07-15   -10.02
    2015-08-26   -10.01
    Name: p_change, dtype: float64
    

  * 使用series.sort_index()进行排序


与df一致
    
    
    # 对索引进行排序
    data['p_change'].sort_index().head()
    
    2015-03-02    2.62
    2015-03-03    1.44
    2015-03-04    1.57
    2015-03-05    2.02
    2015-03-06    8.51
    Name: p_change, dtype: float64
    

## 4 总结

  * 1.索引【掌握】
    * 直接索引 -- 先列后行,是需要通过索引的字符串进行获取
    * loc -- 先行后列,是需要通过索引的字符串进行获取
    * iloc -- 先行后列,是通过下标进行索引
    * ix -- 先行后列, 可以用上面两种方法混合进行索引
  * 2.赋值【知道】
    * data[""] = **
    * data. **=**
  * 3.排序【知道】
    * dataframe
      * 对象.sort_values()
      * 对象.sort_index()
    * series
      * 对象.sort_values()
      * 对象.sort_index()


# 3 DataFrame运算

## 1 算术运算

  * add(other)


比如进行数学运算加上具体的一个数字
    
    
    data['open'].add(1)
    
    2018-02-27    24.53
    2018-02-26    23.80
    2018-02-23    23.88
    2018-02-22    23.25
    2018-02-14    22.49
    

  * sub(other)


如果想要得到每天的涨跌大小？求出每天 close- open价格差
    
    
    # 1、筛选两列数据
    close = data['close']
    open1 = data['open']
    # 2、收盘价减去开盘价
    data['m_price_change'] = close.sub(open1)
    data.head()
    
                open     high   close   low   volume  price_change  p_change  turnover my_price_change
    2018-02-27    23.53    25.88    24.16    23.53    95578.03    0.63    2.68    2.39    0.63
    2018-02-26    22.80    23.78    23.53    22.80    60985.11    0.69    3.02    1.53    0.73
    2018-02-23    22.88    23.37    22.82    22.71    52914.01    0.54    2.42    1.32    -0.06
    2018-02-22    22.25    22.76    22.28    22.02    36105.01    0.36    1.64    0.90    0.03
    2018-02-14    21.49    21.99    21.92    21.48    23331.04    0.44    2.05    0.58    0.43
    

## 2 逻辑运算

### 2.1 逻辑运算符号&lt;、 &gt;、|、 &amp;

  * 例如筛选p_change > 2的日期数据

    * data['p_change'] > 2返回逻辑结果

data['p_change'] > 2

2018-02-27 True 2018-02-26 True 2018-02-23 True 2018-02-22 False 2018-02-14 True

# 逻辑判断的结果可以作为筛选的依据

data[data['p_change'] > 2]

pen high close low volume price_change p_change turnover my_price_change 2018-02-27 23.53 25.88 24.16 23.53 95578.03 0.63 2.68 2.39 0.63 2018-02-26 22.80 23.78 23.53 22.80 60985.11 0.69 3.02 1.53 0.73 2018-02-23 22.88 23.37 22.82 22.71 52914.01 0.54 2.42 1.32 -0.06 2018-02-14 21.49 21.99 21.92 21.48 23331.04 0.44 2.05 0.58 0.43 2018-02-12 20.70 21.40 21.19 20.63 32445.39 0.82 4.03 0.81 0.49

  * 完成一个多个逻辑判断， 筛选p_change > 2并且open > 15

data[(data['p_change'] > 2) & (data['open'] > 15)]

open high close low volume price_change p_change turnover my_price_change 2017-11-14 28.00 29.89 29.34 27.68 243773.23 1.10 3.90 6.10 1.34 2017-10-31 32.62 35.22 34.44 32.20 361660.88 2.38 7.42 9.05 1.82 2017-10-27 31.45 33.20 33.11 31.45 333824.31 0.70 2.16 8.35 1.66 2017-10-26 29.30 32.70 32.41 28.92 501915.41 2.68 9.01 12.56 3.11


### 2.2 逻辑运算函数

  * query(expr)
    * expr:查询字符串


通过query使得刚才的过程更加方便简单
    
    
    data.query("p_change > 2 & turnover > 15")
    

  * isin(values)


例如判断'turnover'是否为4.19, 2.39
    
    
    # 可以指定值进行一个判断，从而进行筛选操作
    data[data['turnover'].isin([4.19, 2.39])]
    
    open    high    close    low    volume    price_change    p_change    turnover    my_price_change
    2018-02-27    23.53    25.88    24.16    23.53    95578.03    0.63    2.68    2.39    0.63
    2017-07-25    23.07    24.20    23.70    22.64    167489.48    0.67    2.91    4.19    0.63
    2016-09-28    19.88    20.98    20.86    19.71    95580.75    0.98    4.93    2.39    0.98
    2015-04-07    16.54    17.98    17.54    16.50    122471.85    0.88    5.28    4.19    1.00
    

## 3 统计运算

### 3.1 describe()

综合分析: 能够直接得出很多统计结果,`count`, `mean`, `std`, `min`, `max` 等
    
    
    # 计算平均值、标准差、最大值、最小值
    data.describe()
    

![describe结果](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/describe%E7%BB%93%E6%9E%9C.png)

### 3.2 统计函数

Numpy当中已经详细介绍，在这里我们演示min(最小值), max(最大值), mean(平均值), median(中位数), var(方差), std(标准差),mode(众数)结果,

`count` | Number of non-NA observations  
---|---  
`sum` | **Sum of values**  
`mean` | **Mean of values**  
`median` | Arithmetic median of values  
`min` | **Minimum**  
`max` | **Maximum**  
`mode` | Mode  
`abs` | Absolute Value  
`prod` | Product of values  
`std` | **Bessel-corrected sample standard deviation**  
`var` | **Unbiased variance**  
`idxmax` | compute the index labels with the maximum  
`idxmin` | compute the index labels with the minimum  
  
**对 于单个函数去进行统计的时候，坐标轴还是按照这些默认为"columns" (axis=0, default)，如果要对行"index" 需要指定(axis=1)**

  * max()、min()

# 使用统计函数：0 代表列求结果， 1 代表行求统计结果

data.max(0)

open 34.99 high 36.35 close 35.21 low 34.01 volume 501915.41 price_change 3.03 p_change 10.03 turnover 12.56 my_price_change 3.41 dtype: float64

  * std()、var()

# 方差

data.var(0)

open 1.545255e+01 high 1.662665e+01 close 1.554572e+01 low 1.437902e+01 volume 5.458124e+09 price_change 8.072595e-01 p_change 1.664394e+01 turnover 4.323800e+00 my_price_change 6.409037e-01 dtype: float64

# 标准差

data.std(0)

open 3.930973 high 4.077578 close 3.942806 low 3.791968 volume 73879.119354 price_change 0.898476 p_change 4.079698 turnover 2.079375 my_price_change 0.800565 dtype: float64

  * median()：中位数


中位数为将数据从小到大排列，在最中间的那个数为中位数。如果没有中间数，取中间两个数的平均值。
    
    
    df = pd.DataFrame({'COL1' : [2,3,4,5,4,2],
                       'COL2' : [0,1,2,3,4,2]})
    
    df.median()
    
    COL1    3.5
    COL2    2.0
    dtype: float64
    

  * idxmax()、idxmin()

# 求出最大值的位置

data.idxmax(axis=0)

open 2015-06-15 high 2015-06-10 close 2015-06-12 low 2015-06-12 volume 2017-10-26 price_change 2015-06-09 p_change 2015-08-28 turnover 2017-10-26 my_price_change 2015-07-10 dtype: object

# 求出最小值的位置

data.idxmin(axis=0)

open 2015-03-02 high 2015-03-02 close 2015-09-02 low 2015-03-02 volume 2016-07-06 price_change 2015-06-15 p_change 2015-09-01 turnover 2016-07-06 my_price_change 2015-06-15 dtype: object


## 4 累计统计函数

函数 | 作用  
---|---  
`cumsum` | **计 算前1/2/3/…/n个数的和**  
`cummax` | 计算前1/2/3/…/n个数的最大值  
`cummin` | 计算前1/2/3/…/n个数的最小值  
`cumprod` | 计算前1/2/3/…/n个数的积  
  
**那 么这些累计统计函数怎么用？**

![cumsum1](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/cumsum1.png)

以上这些函数可以对series和dataframe操作

这里我们按照时间的从前往后来进行累计

  * 排序

# 排序之后，进行累计求和

data = data.sort_index()

  * 对p_change进行求和

stock_rise = data['p_change']

# plot方法集成了前面直方图、条形图、饼图、折线图

stock_rise.cumsum()

2015-03-02 2.62 2015-03-03 4.06 2015-03-04 5.63 2015-03-05 7.65 2015-03-06 16.16 2015-03-09 16.37 2015-03-10 18.75 2015-03-11 16.36 2015-03-12 15.03 2015-03-13 17.58 2015-03-16 20.34 2015-03-17 22.42 2015-03-18 23.28 2015-03-19 23.74 2015-03-20 23.48 2015-03-23 23.74


**那 么如何让这个连续求和的结果更好的显示呢？**

![cumsum](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/cumsum.png)

如果要使用plot函数，需要导入matplotlib.
    
    
    import matplotlib.pyplot as plt
    # plot显示图形
    stock_rise.cumsum().plot()
    # 需要调用show，才能显示出结果
    plt.show()
    

> 关于plot，稍后会介绍API的选择

## 5 自定义运算

  * apply(func, axis=0)
    * func:自定义函数
    * axis=0:默认是列，axis=1为行进行运算
  * 定义一个对列，最大值-最小值的函数

data[['open', 'close']].apply(lambda x: x.max() - x.min(), axis=0)

open 22.74 close 22.85 dtype: float64


## 6 小结

  * 算术运算【掌握】
  * 逻辑运算【知道】
    * 1.逻辑运算符号
    * 2.逻辑运算函数
    * 对象.query()
    * 对象.isin()
  * 统计运算【知道】
    * 1.对象.describe()
    * 2.统计函数
    * 3.累积统计函数
  * 自定义运算【知道】
    * apply(func, axis=0)


# 4 Pandas画图

## 学习目标

  * 目标
    * 了解DataFrame的画图函数
    * 了解Series的画图函数
  * 应用
    * 股票每日数据的统计


* * *

## 1 pandas.DataFrame.plot

  * `DataFrame.plot`( _x=None_ , _y=None_ , _kind= 'line'_)

    * x : label or position, default None
    * y : label, position or list of label, positions, default None
      * Allows plotting of one column versus another
    * kind : str
      * 'line' : line plot (default)
      * 'bar' : vertical bar plot
      * 'barh' : horizontal bar plot
        * 关于"barh"的解释：
        * http://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.plot.barh.html
      * 'hist' : histogram
      * 'pie' : pie plot
      * 'scatter' : scatter plot


# 5 文件读取与存储

## 学习目标

  * 目标
    * 了解Pandas的几种文件读取存储操作
    * 应用CSV方式和HDF方式实现文件的读取和存储
  * 应用
    * 实现股票数据的读取存储


* * *

我们的数据大部分存在于文件当中，所以pandas会支持复杂的IO操作，pandas的API支持众多的文件格式，如CSV、SQL、XLS、JSON、HDF5。

> 注：最常用的HDF5和CSV文件

![读取存储](http://cyc.chenyangstudy.cn/book_chenyang/a01数据处理与统计分析/images/%E8%AF%BB%E5%8F%96%E5%AD%98%E5%82%A8.png)

## 1 CSV

### 1.1 read_csv

  * pandas.read_csv(filepath_or_buffer, sep =',' )
    * filepath_or_buffer:文件路径