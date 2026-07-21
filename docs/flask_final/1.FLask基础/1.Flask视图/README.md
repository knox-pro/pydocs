__

      * [****Flask 简介](<#flask-简介>)
      * [****二 、创建项目](<#二、创建项目>)
      * [****路 由配置](<#路由配置>)
      * [****请 求参数](<#请求参数>)
      * [****abort 函数](<#abort-函数>)
      * [****重 定向](<#重定向>)
      * [****响 应数据](<#响应数据>)
      * [****Cookie](<#cookie>)
      * [****Session](<#session>)
      * [****请 求钩子](<#请求钩子>)
      * [****Flask 上下文](<#flask-上下文>)



### [ __](<#flask-简介>)Flask简介

#### [__](<#1、简介>)1、简介

Flask诞生于2010年，是Armin ronacher（人名）用Python语言基于Werkzeug工具箱编写的轻量级Web开发框架，又称之为微框架。。微框架中的“微”意味着 Flask 旨在保持核心，Flask本身相当于一个内核，其他几乎所有的功能都要用到扩展（邮件扩展Flask-Mail，用户认证Flask-Login），都需要用第三方的扩展来实现。比如可以用Flask-extension加入ORM、窗体验证工具，文件上传、身份验证等。Flask没有默认使用的数据库，你可以选择MySQL，也可以用NoSQL。其 WSGI 工具箱采用 Werkzeug（路由模块） ，模板引擎则使用 Jinja2 。

Django框架是尽可能多的提供功能给你，就象一个暖男一样，只要你想要我就提供给你。而Flask不同，Flask设计的思想是每个人开发的web可能都不一样，用到的技术点也都是不一样的。如果都帮web开发者设计好的话可能会束缚开发者的思想，所以Flask只提供最核心的路由分发，你要什么功能自己集成进来，Flask给你提供最大的自由性,所以这儿也是Flask受欢迎的原因之一。

Flask也算是python众多web框架中最灵活的框架。

[Flask官方中文版文档](<http://docs.jinkan.org/docs/flask/foreword.html#flask>)

常用第三方扩展包：

Flask-SQLalchemy：操作数据库；

Flask-migrate：管理迁移数据库；

Flask-Mail:邮件；

Flask-WTF：表单；

Flask-script：插入脚本；

Flask-Login：认证用户状态；

Flask-RESTful：开发REST API的工具；

Flask-Bootstrap：集成前端Twitter Bootstrap框架；

Flask-Moment：本地化日期和时间；

Flask-Uploads: 上传文件处理

#### [__](<#2、flask与django的对比>)2、Flask与Django的对比

**Django**

Django功能齐全，它提供一站式解决方案，集成了MVT（Model-View-Template）和ORM，以及后台管理。

用一个很形象的例子： Django就像一个精装修的房子，什么家具(功能)都有，直接拎包入住。

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/01.jpg)

django提供了：

> django-admin 快速创建项目工程目录 manage.py 管理项目工程 orm 模型（数据库抽象层） admin 后台管理站点 缓存机制 文件存储系统 用户认证系统

**Flask**

Flask相对于Django而言是轻量级的Web框架,Flask的两个主要核心应用是Werkzeug和模板引擎Jinja2。

django的后台管理，表单，orm等都有现成的直接使用，而是Flask都没提供，需要使用第三方扩展包。

Flask就好比待装修的房子：

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/02.jpg)

### [__](<#二、创建项目>)二、创建项目

#### [__](<#1、-创建flask工程>)1、 创建Flask工程

创建Flask项目没有命令快捷方式，只需要在项目文件夹下创建一个普通的py文件，导入Flask实例化一个Flask应用程序。

示例：
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask
    
    # Flask 接收一个参数__name__，当前模块的文件名
    # Flask 在查找静态文件，或者模板时候默认以当前文件所在的目录去查找
    # 如果传一个不存在的模块名，将默认使用当前文件
    app = Flask(__name__)
    
    
    # 装饰器将路由映射到视图index
    @app.route('/')
    def index():
        return "ok"
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

#### [__](<#2、-初始化参数>)2、 初始化参数

  * import_name: 导包的目录
  * static_path: 访问静态资源的路径
  * static_url_path: 访问静态文件的url前缀
  * static_folder: 默认‘static’
  * template_folder: 默认‘templates’



实例化Flask对象之后，静态文件默认在Flask第一个参数指定的模块所在的目录下，静态文件使用`static`目录，模板使用`templates`目录。

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/03.jpg)

在static目录下放一张图片 01.jpg，然后通过静态文件路径可以访问到：<http://127.0.0.1:5000/static/01.jpg>
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask
    
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__,
                # static_path='/static/aaa',  # 访问静态资源的路径，跟static_url_path 参数冲突，static_path优先级比较高
                static_url_path='/python',  # 访问静态资源的url前缀
                static_folder='static',   # 静态文件目录名，默认static
                template_folder='templates',  # 模板文件目录名，默认templates
                )
    
    # 装饰器将路由映射到视图index
    @app.route('/')
    # 定义一个视图
    def index():
        return "ok"
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run()
    
[/code]

#### [__](<#3、-配置>)3、 配置

django项目中有一个setting.py的配置文件，但是Flask中没有，需要自己定义。

常见的两种方式：

  * 从配置文件中读取配置 app.config.from_pyfile('文件名') 
  * 从类中读取配置信息 app.config.from_object(类名)



Flask 默认是运行在线上模式，也就是说出错了是看不到错误堆栈信息的，为了好调试一般开发阶段会将调试打开。 django中默认开启调试DEBUG = True,Flask中开启调试同样只需要在配置中写入 DEBUG=True。

从配置文件中读取配置 示例： 创建一个文件 `config.cfg` 保存配置信息

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/04.jpg)
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask
    
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__,
                # static_path='/static/aaa',  # 访问静态资源的路径，跟static_url_path 参数冲突，static_path优先级比较高
                static_url_path='/python',  # 访问静态资源的url前缀
                static_folder='static',   # 静态文件目录名，默认static
                template_folder='templates',  # 模板文件目录名，默认templates
                )
    
    # 设置配置信息获取方式，从配置文件中查找
    # app.config.from_pyfile('config.cfg')
    
    # 配置类
    class Config(object):
        DEBUG = True
    # 设置配置信息获取方式，从配置对象中查找
    app.config.from_object(Config)
    
    # 装饰器将路由映射到视图index
    @app.route('/')
    # 定义一个视图
    def index():
        return "ok"
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run()
    
[/code]

注意：配置的变量名需要用大写。如果注册多个配置文件，后面注册的同名配置会覆盖掉前面的配置。一般使用一个工程只用一个配置文件。

#### [__](<#读取配置参数>)读取配置参数

第一种方式： 在能访问到app对象的文件中可直接使用app.config.get方式获取配置参数 app.config.get('配置') 

第二种方式： 需要从flask中导入current_app，在整个Flask项目中都可以使用，实际上也是app对象相到于一个别名。 current_app.config.get('配置名')
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask,current_app
    
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__,
                # static_path='/static/aaa',  # 访问静态资源的路径，跟static_url_path 参数冲突，static_path优先级比较高
                static_url_path='/python',  # 访问静态资源的url前缀
                static_folder='static',   # 静态文件目录名，默认static
                template_folder='templates',  # 模板文件目录名，默认templates
                )
    
    # 设置配置信息获取方式，从配置文件中查找
    # app.config.from_pyfile('config.cfg')
    
    class Config(object):
        DEBUG = False
        A = 1
        B = 2
    
    # 设置配置信息获取方式，从配置对象中查找
    app.config.from_object(Config)
    
    
    # 装饰器将路由映射到视图index
    @app.route('/')
    # 定义一个视图
    def index():
        a = app.config.get('A')
        b = current_app.config.get('B')
        print(a+b)
        return str(a+b)
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run()
    
[/code]

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/05.jpg)

#### [__](<#apprun参数>)app.run参数

run方法源码
[code] 
        def run(self, host=None, port=None, debug=None, **options):
            from werkzeug.serving import run_simple
            if host is None:
                host = '127.0.0.1'
            if port is None:
                server_name = self.config['SERVER_NAME']
                if server_name and ':' in server_name:
                    port = int(server_name.rsplit(':', 1)[1])
                else:
                    port = 5000
            if debug is not None:
                self.debug = bool(debug)
            options.setdefault('use_reloader', self.debug)
            options.setdefault('use_debugger', self.debug)
            try:
                run_simple(host, port, self, **options)
            finally:
                self._got_first_request = False
    
[/code]

从源码中可以看出run方法是启动一个werkzug工具箱提供的简易服务器。 参数：

host 服务器主机地址，默认使用本机地址'127.0.0.1'

port 端口号,默认5000

debug 调试，参数是bool值 ,表示是否开启调试，True开启调试。默认Flase
[code] 
    app.run(host='0.0.0.0') # 这样可以监听本机所有ip地址
    
[/code]

### [__](<#路由配置>)路由配置

路由就是根据请求的 url 找到对应处理的函数视图的过程。在请求之前应该建立好一张路由表保存url与视图的对应关系，这样有请求过来才能正确找到对应的视图。

Flask中有两种常用方式构建路由规则：

1、@app.route('url规则') decorator装饰器方式

2、app.add_url_rule()

  * add_url_rule(self, rule, endpoint=None, view_func=None, **options)参数的含义如下：
    * rule： url 规则字符串，可以是静态的 /path，也可以包含 /
    * endpoint：要注册规则的 endpoint，默认是 view_func 的名字
    * view_func：对应 url 的处理函数，也被称为视图函数


[code] 
    # 装饰器将路由映射到视图index
    @app.route('/')
    # 定义一个视图
    def index():
        return 'ok'
    
    #这两种方法是等价的
    
    #app.add_url_rule('/', 'index', index)
    
[/code]

#### [__](<#查看路由信息>)查看路由信息

在django中url统一配置在URLconf配置文件中，但是Flask直接配置在视图没有统一的配置文件如何查看路由信息呢？

  * app.url_map查看所有路由



示例：
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask, current_app
    
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__)
    # 装饰器将路由映射到视图index
    @app.route('/')
    # 定义一个视图
    def index():
        print(app.url_map)
        return 'ok'
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

执行视图会打印出下面url信息：

每一条 Rule对应信息：

  * url规则
  * 支持的请求方式，默认支持get请求，不支持psot.
  * 对应的视图


[code] 
    Map([<Rule '/' (HEAD, GET, OPTIONS) -> index>,
     <Rule '/static/<filename>' (HEAD, GET, OPTIONS) -> static>])
    
[/code]

可以在python shell中导入flask项目查看：
[code] 
    In [5]: from one_day_route import app
    
    In [6]: app.url_map
    Out[6]: 
    Map([<Rule '/' (OPTIONS, HEAD, GET) -> index>,
     <Rule '/static/<filename>' (OPTIONS, HEAD, GET) -> static>])
    
[/code]

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/06.jpg)

#### [__](<#同一路由装饰不同视图>)同一路由装饰不同视图

同一个路由规则装饰不同函数，只有第一个视图函数会匹配到。虽然都生成了路由表，但是url匹配中第一个规则之后就会调用视图，不再继续往下匹配。
[code] 
    # 同一个url规则装饰不同的视图函数
    @app.route('/index')
    def index1():
        return 'index1'
    
    @app.route('/index')
    def index2():
        return 'index2'
    
[/code]

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/07.jpg)

#### [__](<#一个视图函数多个路由装饰器>)一个视图函数多个路由装饰器

同一个视图函数有多个路由装饰器，会生成多条路由信息，每条对应规则的url都可以访问到视图函数。
[code] 
    # 同一个url规则装饰不同的视图函数
    @app.route('/index')
    @app.route('/index1')
    def index1():
        print(app.url_map)
        return 'index1'
    
[/code]

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/08.jpg)

#### [__](<#methods-参数>)methods参数

HTTP （与 Web 应用会话的协议）有许多不同的访问 URL 方法。默认情况下，路由只回应 GET 请求，但是通过 route() 装饰器传递 methods 参数可以改变这个行为

methods 参数接收一个字典，元素为字符串形式的请求方式名称。 如果不传methods参数，默认支持 GET, HEAD, OPTIONS

OPTIONS 给客户端提供一个敏捷的途径来弄清这个 URL 支持哪些 HTTP 方法。 从 Flask 0.6 开始，实现了自动处理。

HEAD 浏览器告诉服务器：欲获取信息，但是只关心 消息头 。应用应像处理 GET 请求一样来处理它，但是不分发实际内容。在 Flask 中你完全无需 人工 干预，底层的 Werkzeug 库已经替你打点好了。
[code] 
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            do_the_login()
        else:
            show_the_login_form()
    
[/code]

#### [__](<#反向解析>)反向解析

url_for 可以通过视图函数名称，反向解析得到视图对应的url.

url_for函数：
[code] 
    def url_for(endpoint, **values):
        pass
    
[/code]
[code] 
    @app.route("/python")
    def req_python():
        return 'python'
    
    @app.route("/url_for")
    def req_url():
        """url_for 反向解析"""
        return '<a href="%s">链接</a>' % url_for("req_python")
    
[/code]

#### [__](<#动态路由>)动态路由

要给 URL 添加变量部分，把这些特殊的字段标记为 ， 这个部分将会作为命名参数传递到你的函数。

变量放在\<> 中
[code] 
    @app.route('/param/<name>')
    def get_url_param(name):
        return '参数是：%s' % name
    
[/code]

规则可以用 \ 指定一个可选的转换器。

转换器： 默认匹配的是不带/的字符串 int： 接受整数 float：接受浮点数 path： 和默认的相似，但也接受斜线,
[code] 
    # 默认<>的规则匹配不带/的整数
    @app.route('/param_int/<int:id>')
    def get_url_param_int(id):
        return '获取的参数是： %s '% id
    
    # 默认<>的规则匹配不带/的 浮点数
    @app.route('/param_float/<float:f>')
    def get_url_param_float(f):
        return '获取的参数是： %s '% f
    # 匹配参数后面带/
    @app.route('/param_path/<path:p>')
    def get_url_param_path(p):
        return '获取的参数是： %s '% p
    
[/code]

#### [__](<#自定义正则转换器>)自定义正则转换器

Flask路由转换器，没有提供基于正则的，但是我们可以自定义基于正则的路由转换器。

  * 自定义转换器必须继承BaseConverter类，自定义转换器需要重写父类的init方法
  * 注册转换器，url_map中保存了所有的路由转换器，是字典类型


[code] 
    from werkzeug.routing import BaseConverter
    
    # 正则转换器
    class RegexConverter(BaseConverter):
        def __init__(self, url_map, *args):
            # 调用父类的初始化方法
            super(RegexConverter, self).__init__(url_map)
            # 将正则表达式传给转换器对象，flask在解析路径的时候，会来这里获取regex保存的正则表达式
            self.regex = args[0]
    
        def to_python(self, value):
            # 对获取到的参数进行处理
            # 默认获取到是字符串，可以对获取到的参数进行处理，比如类型转换
            # 这样就可以在视图中直接使用
            print(type(value))
            print(value)
            return value
    
        def to_url(self, value):
            # 当使用反解析的时候会调用这个方法,可以对参数进行处理
            print(value)
            return value
    
    # 注册re 转换器  RegexConverter
    app.url_map.converters['re'] = RegexConverter
    
    @app.route("/param_re/<re('\d'):num>/<re('\d+'):num2>")
    def get_param_re(num, num2):
        """url中提取参数"""
        return '自定义正则转换器获取参数1：%s ，   参数2：%s' % (num, num2)
    
    
    @app.route('/get_param_re_url/')
    def get_param_url():
        """在视图函数中获取url"""
        return '<a href="%s">to_url演示</a>' % (url_for('get_param_re', num='1', num2='2'))
    
[/code]

### [__](<#请求参数>)请求参数

#### [__](<#1、request对象>)1、request对象

Flask中获取请求数据，与django中不同，django视图中第一个参数必须是HttpRequest对象，Flask中需要导入从flask中导入request对象，request对象中已经封装所有的请求参数。

属性 | 功能 | 类型  
---|---|---  
form | 一个包含解析过的从 POST 或 PUT 请求发送的表单对象的 MultiDict 。请注意上传的文件会在这里，而是在 files 属性中。 | MultiDict  
args | 一个包含解析过的查询字符串（URL 中问号后的部分）内容的 | MultiDict  
values | 一个包含 form 和 args 全部内容 | CombinedMultiDict  
cookies | 一个包含请求中传送的所有 cookie 内容 | dict  
headers | 请求头存为一个类似字典的对象 | dict  
method | 当前请求的 HTTP 方法 (POST ， GET 等等) | string  
files | 一个包含 POST 和 PUT 请求中上传的文件的 MultiDict 。每个文件存储为 FileStorage 对象。其基本的行为类似你在 Python 中见到的标准文件对象，差异在于这个对象有一个 save() 方法可以把文件存储到文件系统上。  
  
路径：

path

script_root

url

base_url

url_root 

比如用户访问这个链接：

<http://www.example.com/myapplication/page.html?x=y>

这个情况下，上面提到的属性的值会为如下:

属性 | 获取路径  
---|---  
path | /page.html  
script_root | /myapplication  
base_url | <http://www.example.com/myapplication/page.html>  
url | <http://www.example.com/myapplication/page.html?x=y>  
url_root | <http://www.example.com/myapplication/>  
  
#### [__](<#2、postman-插件使用>)2、Postman 插件使用

谷歌浏览器加载扩展程序

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/09.jpg)

将解压好的扩展程序加载进去启动，第一次启动会要求填写一些内容，直接将窗口关闭，第二次启动就不需要填写了。

利用这个插件了以模拟浏览器以不同的请求方式向服务器提交参数。

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/10.jpg)
[code] 
    # coding=utf-8
    
    from flask import Flask,request
    
    app = Flask(__name__)
    
    
    @app.route('/',methods=['GET','POST'])
    def index():
    
        # form 获取post提交的数据
        post_dict = request.form
        print(post_dict)
        # args 获取查询字符串，即url ？ 后面的参数
        query_dict = request.args
        print(query_dict)
        # 获取所有查询参数，跟post参数
        all_dict = request.values
        print(all_dict)
        # 获取cookie
        cookie = request.cookies
        print(cookie)
    
        # 获取某个参数值get方法,如果不存在这个key会报错，为了不报错可以传一个默认值，如果不存在key，将使用默认值。
        # 如果是多值使用getlist方法,如果不存在，则返回空列表。
        a = query_dict.get('a','')
        a = query_dict.getlist('b')
        print(a)
        return 'ok'
    
    
    if __name__ == '__main__':
        app.run(debug=True)
    
[/code]

#### [__](<#4、文件上传>)4、文件上传

已上传的文件存储在内存或是文件系统中一个临时的位置。你可以通过请求对象的 files 属性访问它们。每个上传的文件都会存储在这个字典里。它表现近乎为一个标准的 Python file 对象，但它还有一个 save() 方法，这个方法允许你把文件保存到服务器的文件系统上。
[code] 
    from flask import request
    
    @app.route('/upload', methods=['GET', 'POST'])
    def upload_file():
        if request.method == 'POST':
            f = request.files['the_file']
            f.save('uploaded_file.txt')
    
[/code]

如果你想知道上传前文件在客户端的文件名是什么，你可以访问 filename 属性。但请记住， 永远不要信任这个值，这个值是可以伪造的。如果你要把文件按客户端提供的文件名存储在服务器上，那么请把它传递给 Werkzeug 提供的 secure_filename() 函数:

传递一个文件名，它会返回一个安全的文件名,防止上传的文件名不符合服务器文件命名要求。

示例：
[code] 
    >>>from werkzeug.utils import secure_filename
    >>> secure_filename("My cool movie.mov")
    'My_cool_movie.mov'
    >>> secure_filename("../../../etc/passwd")
    'etc_passwd'
    >>> secure_filename(u'i contain cool \xfcml\xe4uts.txt')
    'i_contain_cool_umlauts.txt'
    
[/code]
[code]
    from flask import request
    from werkzeug.utils import secure_filename
    
    @app.route('/upload', methods=['GET', 'POST'])
    def upload_file():
        # 判断是Post请求方式  
        if request.method == 'POST':
            f = request.files['the_file']
            f.save('./uploads/' + secure_filename(f.filename))
    
[/code]

注意：secure_filename 不能识别中文。 secure_filename仅返回ASCII字符。所以， 非ASCII（比如汉字）会被过滤掉，空格会被替换为下划线。你也可以自己处理文件名自动生成一个随机文件名，或是在使用这个函数前将中文替换为拼音或是英文。

secure_filename 函数源码
[code] 
    def secure_filename(filename):
        r"""Pass it a filename and it will return a secure version of it.  This
        filename can then safely be stored on a regular file system and passed
        to :func:`os.path.join`.  The filename returned is an ASCII only string
        for maximum portability.
    
        On windows systems the function also makes sure that the file is not
        named after one of the special device files.
    
        >>> secure_filename("My cool movie.mov")
        'My_cool_movie.mov'
        >>> secure_filename("../../../etc/passwd")
        'etc_passwd'
        >>> secure_filename(u'i contain cool \xfcml\xe4uts.txt')
        'i_contain_cool_umlauts.txt'
    
        The function might return an empty filename.  It's your responsibility
        to ensure that the filename is unique and that you generate random
        filename if the function returned an empty one.
    
        .. versionadded:: 0.5
    
        :param filename: the filename to secure
        """
        if isinstance(filename, text_type):
            from unicodedata import normalize
            filename = normalize('NFKD', filename).encode('ascii', 'ignore')
            if not PY2:
                filename = filename.decode('ascii')
        for sep in os.path.sep, os.path.altsep:
            if sep:
                filename = filename.replace(sep, ' ')
        filename = str(_filename_ascii_strip_re.sub('', '_'.join(
                       filename.split()))).strip('._')
    
        # on nt a couple of special files are present in each folder.  We
        # have to ensure that the target file is not such a filename.  In
        # this case we prepend an underline
        if os.name == 'nt' and filename and \
           filename.split('.')[0].upper() in _windows_device_files:
            filename = '_' + filename
    
        return filename
    
[/code]

### [__](<#abort-函数>)abort函数

#### [__](<#1、abort-函数>)1、abort 函数

about函数的作用是：放弃请求并返回错误代码

相当于python中的 `raise` 抛出异常

[详细HTTP状态码 ](<http://tool.oschina.net/commons?type=5>)
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask, abort
    
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__)
    
    
    @app.route('/')
    def index():
        # 终止视图执行，并返回HTTP状态码
        # abort 函数只能接受标准http代码
        abort(404)
        return 'ok'
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

#### [__](<#2、自定义错误处理视图>)2、自定义错误处理视图

  * 使用 errorhandler 装饰器，接受一个http状态码为参数。
  * 自定义的错误视图不单单作用于abort函数抛出的错误，也作用于整个Flask应用对应错误码。
  * 自定义错误处理视图接收一个参数，是Flask应用的默认报错信息


[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask, abort
    
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__)
    
    
    @app.route('/')
    def index():
        # 终止视图执行，并返回HTTP状态码
        # abort 函数只能接受标准http代码
        abort(404)
        return 'ok'
    
    
    # 自定义错误处理视图函数
    # 使用 errorhandler 装饰器，接受一个http状态码为参数。
    # 自定义的错误视图不单单作用于abort函数抛出的错误，也作用于整个Flask应用对应错误码。
    # 自定义错误处理视图接收一个参数，是Flask应用的默认报错信息
    @app.errorhandler(404)
    def error(e):
        return '哈哈哈，url错误. e= %s' % e
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

### [__](<#重定向>)重定向

#### [__](<#1、redirect-函数>)1、redirect 函数

Flask中的重定向使用 `redirect` 函数，接收一个url为参数

案例：
[code] 
    from flask import  Flask,redirect
    
    @app.route('/index')
    def index():
        """index视图"""
        return '我是首页'
    
    
    @app.route('/login')
    def login():
        # 重定向到 index 视图，使用url_for反解析获得url
        return redirect(url_for('index'))
    
[/code]

### [__](<#响应数据>)响应数据

#### [__](<#1、关于响应>)1、关于响应

视图函数的`return`值会自动转换为一个响应对象。如果返回值是一个字符串， 它被转换为该字符串为主体的、状态码为 `200` 的 ，MIME 类型是 `text/html` 的响应对象。

Flask 把返回值转换为响应对象的逻辑：

  * 如果返回的是一个字符串，响应对象会用字符串数据和默认参数创建。
  * 如果返回的是一个元组，且元组中的元素可以提供额外的信息。这样的元组必须是 (response, status, headers) 的形式，且至少包含一个元素。 status 值会覆盖状态代码， headers 可以是一个列表元素是元祖或字典，作为额外的消息标头值。
  * 如果返回的是一个合法的响应对象，它会从视图直接返回。



我们之前都是直接返回字符串，Flask会帮我们自动创建response对象。

返回元祖：
[code] 
    @app.route('/')
    def index():
        # 第一个参数是响应体，第二个参数是响应状态码，第三个参数响应头 可以是一个字典，
        # 也可以是列表元素以元祖形式[('subject','python'),( 'chapter', 2)]
        # 状态码后面可以给一段文本说明，可以浏览器开发者管理工具中可以看到
        # return 'hello world', '300', {'subject': 'python', 'chapter': 'Flask'}
        return 'hello world', '300 python', {'subject': 'python', 'chapter': 'Flask'}
    
[/code]

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/11.jpg)

#### [__](<#2、响应对象>)2、响应对象

make_response 创建响应对象
[code] 
    from flask import Flask, make_response
    @app.route('/make_response')
    def request_make_response():
        # 创建一个响应对象，需要接收一个字符串为响应体
        # response = make_response('hello world', 888)
        response = make_response('hello python')
        # 自定义状态码
        response.status = '888'
        # 自定义请求头
        response.headers['subject'] = 'python'
        # 返回响应对象
        return response
    
[/code]

#### [__](<#3、返回json数据。>)3、返回json数据。

在前面内容中我们都是返回字符串，但是很多web开发中都是要求前后端分离的，前端一般会要求后端返回json数据。

在django的学习中我们知道返回json数据有一个JsonResponse对象，接收一个python字典作为参数。Flask中也有一个类似的对象可以返回json数据。

jsonify： 返回json格式的数据
[code] 
    @app.route('/request_json')
    def request_json():
        import json
        resp = {
            'a': 1,
            'b': 2
        }
        # 普通方式返回json数据
        # 将字典对象转为json字符串
        # resp_json = json.dumps(resp)
        # 创建一个响应对象
        # response = make_response(resp_json)
        #  添加响应头，表示返回的是json数据
        # response.headers["Content-Type"] = "application/json"
        # return response
    
        # 将字典转换成json对象后返回
        return jsonify(resp)
    
[/code]

### [__](<#cookie>)Cookie

#### [__](<#1、-cookie简介>)1、 Cookie简介

response对象的 set_cookie 方法来设置 Cookies。 request对象的 cookies 属性是客户端提交过来的所有cookie键值对，字典类型。

#### [__](<#2、设置cookie>)2、设置cookie

cookie 是以键值对的形式保存在浏览器中。

设置cookie我们比较关心的三个参数：

key cookie的键

value cookie的值

max_age=None 超时时间，单位是秒

expires=None 超时时间，datatime对象
[code] 
    @app.route('/set_cookie')
    def set_cookie():
        """设置cookie"""
        resp = make_response('设置cookie')
        # 向浏览其中写入一个key为a,值为python，超时时间在2018,1,31日
        #resp.set_cookie('a', 'python', expires=datetime.datetime(2018, 1, 31))
        # 向浏览其中写入一个key为a,值为python，超时时间是60*60秒之后
        resp.set_cookie('a', 'python', max_age=60*60)
        return resp
    
[/code]

访问视图在浏览器开发者工具中可以看到写入的cookie:

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/12.jpg)

#### [__](<#3、获取cookie>)3、获取cookie

request 对象中的cookie属性是包含了所有浏览器上传到服务器的cookie。 get 方法获取其中的键值，可以传一个默认值。
[code] 
    @app.route('/get_cookie')
    def get_cookie():
        """获取cookie"""
        # 通过键获取cookie值，如果没有这个键返回None
        a = request.cookies.get('a')
        print(a)
        # 可以传一个默认值，如果不存在这个键，将使用默认值。
        b = request.cookies.get('b', 'not found')
        print(b)
        return '获取到的cookie是： a: %s   b:%s' % (a, b)
    
[/code]

#### [__](<#4、-删除cookie>)4、 删除cookie
[code] 
    @app.route('/del_cookie')
    def del_cookie():
        """删除cookie"""
        response = make_response('删除cookie')
        # 将key为a的cookie 删除
        response.delete_cookie('a')
        return response
    
[/code]

### [__](<#session>)Session

#### [__](<#1-、session简介>)1、Session简介

在学习django中的所有的session是保存在服务器中的数据库的。将sessionid写到浏览器，浏览器发送请求的时候将sessionid传回给服务器，然后再利用sessionid到数据库中匹配对应用户的session信息。django中创建好项目就有默认的数据库，这个保存在数据库中好理解。

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/13.jpg)

但是在Flask中，我们并没有数据库配置，那么session信息保存在哪个位置呢。实际上Flask的session是基于cookie加secret_key 进行加密后保存在cookie中的。

session具体的使用方法：

首先设置SECRET_KEY:
[code] 
    # Flask中需要使用session必须先配置SECRET_KEY
    app.config['SECRET_KEY'] = os.urandom(24)
    或者 自己输入一个字符串
    app.config['SECRET_KEY'] = 'sdfsdfs&&^%dsdf*/*$#'
    ----------
    import os 
    os.urandom(n)
    返回n个字节的加密的随机字符串
    
    视图函数中使用session跟python字典类似使用key获取值，或者使用get方法。
    
[/code]

案例：
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask, session
    import datetime
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = 'qweqwr^%%&123?><\][ddd'
    
    
    @app.route('/set_session')
    def set_session():
        # 设置session 字典形式
        session['name'] = 'python'
        session['password'] = '123456'
        return 'session'
    
    
    @app.route('/get_session')
    def get_session():
        # 获取session 采用[key]方式取值，如果key不存在会报错。
        name = session['name']
        print(name)
        # 获取session 采用get方式取值，如果key不存在返回None,
        pwd = session.get('haha')
        print(pwd)
        return 'name:%s ' % name
    
    def 
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

设置session之后在浏览器查看cookie信息，可以看到多了个session信息。

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/14.jpg)

#### [__](<#删除session>)删除session

可以直接使用session.pop('key',None)：

session.pop('name',None)

如果要删除session中所有数据使用：clear()：

session.clear()
[code] 
    @app.route('/del_session')
    def del_session():
        # 删除session的某个键值对,返回删除的session值on，如果不存在可以设置一个默认值。
        result = session.pop('name', None)
        # 清除整个session.
        session.clear()
        return '删除session %s ' % result
    
[/code]

#### [__](<#设置session超时时间>)设置session超时时间

Flask的默认session利用了Werkzeug的SecureCookie，把信息做序列化(pickle)后编码(base64)，放到cookie里了。

过期时间是通过cookie的过期时间实现的。

为了防止cookie内容被篡改，session会自动打上一个叫session的hash串，这个串是经过session内容、SECRET_KEY计算出来的，看得出，这种设计虽然不能保证session里的内容不泄露，但至少防止了不被篡改。

过期时间是这样来设置:
[code] 
        from datetime import timedelta
    
        session.permanent = True
        app.permanent_session_lifetime = timedelta(minutes=5)
        session['key'] = value
    
[/code]

### [__](<#请求钩子>)请求钩子

#### [__](<#1、请求钩子>)1、请求钩子

在每个请求执行视图之前或者执行完成之后，需要做一些操作，为了避免每个视图都重写重复代码，Flask提供了四个通用函数完成一系列操作，即请求钩子。

请求钩子使用修饰器实现。Flask支持以下4种钩子：

  * before_first_request：注册一个在处理第一个请求之前运行的函数。
  * before_request：注册一个在处理请求之前运行的函数。
  * after_request：注册一个函数，如果没有未处理的异常抛出，在每次请求之后运行，接收一个响应对象为参数，需要返回一个响应对象
  * teardown_request：注册一个函数，即使有未处理的异常抛出，也在每次请求之后运行，接收一个响应对象为参数，需要返回一个响应对象。


[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask, abort
    import datetime
    # Flask 接收一个参数__name__,
    # 导入模块的目录， flask以这个目录为基础，寻找静态文件目录static和模板目录templates
    app = Flask(__name__)
    
    
    # 只有在第一次请求的时候执行
    @app.before_first_request
    def first_request():
        print("before_first_request 执行")
    
    
    # 每次请求之前执行
    @app.before_request
    def before_request_():
        print('before_request执行')
    
    
    # 每次执行完成后没有未处理的异常抛出才会执行
    @app.after_request
    def after_request(response):
        print('after_request 执行')
        return response
    
    
    # 即使视图函数有未处理的异常抛出都执行
    @app.teardown_request
    def teardown_request_(response):
        print('teardown_request 执行')
        return response
    
    
    @app.route('/')
    def index():
        print('index 执行')
        return 'ok'
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

请求钩子执行顺序：

![](http://cyc.chenyangstudy.cn/book-flask/Flask%E6%A1%86%E6%9E%B6/chapter01/img/15.jpg)

### [__](<#flask-上下文>)Flask上下文

#### [__](<#1、-应用上下文>)1、 应用上下文

Flask 中有两个应用上下文对象：
[code] 
    current_app  对象
    
    g 对象
    
[/code]

#### [__](<#2、currentapp对象>)2、current_app对象

current_app 对象,它被绑定到当前请求的应用的引用。

如果在程序中需要访问应用，那么需要将应用显式地到处传递应用，如果使用current_app对象，我们不需要关心创建的应用，当我们访问current_app对象的时候，实际上是访问请求的应用。
[code] 
    # coding=utf-8
    # 导入Flask类
    from flask import Flask, current_app
    
    
    # 在创建app应用的时候，每个创建的对象名可能都不一样。
    # 使用current_app 应用上下文，我们可以不用关心应用怎么创建的。
    #app = Flask(__name__)
    #app_2 = Flask(__name__)
    my_app = Flask(__name__)
    
    class Config(object):
        USERNAME = 'hello'
        PASSWORD = '123456'
    
    app.config.from_object(Config)
    
    @app.route('/')
    def index():
        username = current_app.config.get("USERNAME")  # 可以不通过Flask实例名称获取配置
        password = current_app.config.get("PASSWORD")  # 获取配置
        return 'username=%s,password=%s'%(username,password)
    
    
    if __name__ == '__main__':
        # Flask 应用程序实例的方法run启动web服务器
        app.run(debug=True)
    
[/code]

#### [__](<#3、g对象>)3、g对象

有时候应用上下文会在必要时被创建和销毁。它不会在线程间移动，并且也不会在不同的请求之间共享。

处理请求时，临时存储的对象，每次请求都会重设这个变量。

比如 数据库连接，请求进来的时候创建连接，在处理完成之后，释放连接。

通过请求钩子deardown_request函数中通过g对象将数据库连接对象传到这个函数中去关闭连接。确保数据库资源能被释放。

g对象是应用上下文的一种，每一个请求过来都会创建一个g对象。g对象就是一个作用于app应用的全局变量。每个请求进来g对象都先置为空。

在钩子函数与视图函数中变量的传递，可以用g对象做为全局变量去传递。
[code] 
    from flask import Flask, g
    
    # 每次请求之前执行
    @app.before_request
    def before_request_():
        g.s = 'g对象传过来的参数'
        print('before_request执行')
    
    @app.route('/')
    def index():
        print('index 执行')
        # 在视图函数中通过g对象获取参数
        print(g.get('s'))
        return 'ok'
    
[/code]

#### [__](<#4、请求上下文>)4、请求上下文

请求上下文保存了客户端和服务器交互的数据

Flask 中请求上下文有两个对象：
[code] 
    request  对象
    session 对象
    
[/code]

Iyoyo电子书 一本集作者多年开发经验的python电子书 all right reserved，powered by Gitbook文件修订时间： 2018年 16:10:44
