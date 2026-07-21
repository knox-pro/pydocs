Flask诞生于2010年，是Armin ronacher（人名）用Python语言基于Werkzeug工具箱编写的轻量级Web开发框架，又称之为微框架。。微框架中的“微”意味着 Flask 旨在保持核心，Flask本身相当于一个内核，其他几乎所有的功能都要用到扩展（邮件扩展Flask-Mail，用户认证Flask-Login），都需要用第三方的扩展来实现。比如可以用Flask-extension加入ORM、窗体验证工具，文件上传、身份验证等。Flask没有默认使用的数据库，你可以选择MySQL，也可以用NoSQL。其 WSGI 工具箱采用 Werkzeug（路由模块） ，模板引擎则使用 Jinja2 。

Django框架是尽可能多的提供功能给你，就象一个暖男一样，只要你想要我就提供给你。而Flask不同，Flask设计的思想是每个人开发的web可能都不一样，用到的技术点也都是不一样的。如果都帮web开发者设计好的话可能会束缚开发者的思想，所以Flask只提供最核心的路由分发，你要什么功能自己集成进来，Flask给你提供最大的自由性,所以这儿也是Flask受欢迎的原因之一。

Flask也算是python众多web框架中最灵活的框架。

Iyoyo电子书 一本集作者多年开发经验的python电子书 all right reserved，powered by Gitbook文件修订时间： 2022年 16:02:03
