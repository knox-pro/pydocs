import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Python Docs",
  description: "一个python的文档站",

  // 处理 markdown 中 <script> 标签避免 Vue 编译报错
  vite: {
    plugins: [
      {
        name: 'fix-markdown-script',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.md')) {
            // 保护 Vue <script setup> 和 <style scoped> 块，避免被转义
            const protectedBlocks = []
            code = code.replace(/<(script\s+setup|style\s+scoped)[\s\S]*?<\/\1>/gi, match => {
              protectedBlocks.push(match)
              return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`
            })

            // 转义剩余的 <script> 和 <style> 标签为 HTML 实体
            code = code.replace(/<script\b/gi, '&lt;script')
            code = code.replace(/<\/script\b/gi, '&lt;/script')
            code = code.replace(/<style\b/gi, '&lt;style')
            code = code.replace(/<\/style\b/gi, '&lt;/style')

            // 恢复被保护的块
            code = code.replace(/__PROTECTED_BLOCK_(\d+)__/g, (_, idx) => protectedBlocks[parseInt(idx)])
            return code
          }
        }
      }
    ]
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AI算法与数据分析', link: '/ai算法与数据分析_final/README' },
      { text: 'Flask', link: '/flask_final/README' },
      { text: 'Git', link: '/git_final/README' },
      { text: '爬虫', link: '/spider_final/README' },
      { text: 'SQL', link: '/sql_final/README' },
    ],

    sidebar: {
      '/ai算法与数据分析_final/': [
        {
          text: 'AI算法与数据分析',
          collapsed: false,
          items: [
            {
              text: '开发环境',
              collapsed: false,
              items: [
                { text: 'Windows虚拟环境Python', link: '/ai算法与数据分析_final/1.开发环境/1.01windows虚拟环境python' },
                { text: 'Linux环境下安装Python', link: '/ai算法与数据分析_final/1.开发环境/2.02linux环境下安装python' },
                { text: 'CUDA11.6安装', link: '/ai算法与数据分析_final/1.开发环境/3.03CUDA11.6安装' },
                { text: 'PyTorch GPU安装', link: '/ai算法与数据分析_final/1.开发环境/4.04pytorch_gpu安装' },
              ]
            },
            {
              text: '数据处理与统计分析',
              collapsed: false,
              items: [
                { text: '导学', link: '/ai算法与数据分析_final/2.数据处理与统计分析/1.00导学' },
                { text: '机器学习概述', link: '/ai算法与数据分析_final/2.数据处理与统计分析/2.01机器学习概述' },
                { text: '基础环境安装与使用', link: '/ai算法与数据分析_final/2.数据处理与统计分析/3.02基础环境安装与使用' },
                { text: 'Numpy', link: '/ai算法与数据分析_final/2.数据处理与统计分析/4.03Numpy' },
                { text: 'Pandas', link: '/ai算法与数据分析_final/2.数据处理与统计分析/5.04Pandas' },
                { text: 'Matplotlib', link: '/ai算法与数据分析_final/2.数据处理与统计分析/6.05Matplotlib' },
                { text: 'jieba和nltk文本处理', link: '/ai算法与数据分析_final/2.数据处理与统计分析/7.06jieba和nltk文本处理' },
                { text: '数据预处理', link: '/ai算法与数据分析_final/2.数据处理与统计分析/8.07数据预处理' },
              ]
            },
            {
              text: '机器学习',
              collapsed: false,
              items: [
                { text: '线性回归', link: '/ai算法与数据分析_final/3.机器学习/1.01线性回归' },
                { text: '决策树算法', link: '/ai算法与数据分析_final/3.机器学习/2.02决策树算法' },
                { text: 'K近邻算法', link: '/ai算法与数据分析_final/3.机器学习/3.03K近邻算法' },
                { text: '支持向量机', link: '/ai算法与数据分析_final/3.机器学习/4.04支持向量机' },
                { text: '逻辑回归', link: '/ai算法与数据分析_final/3.机器学习/5.05逻辑回归' },
                { text: '朴素贝叶斯算法', link: '/ai算法与数据分析_final/3.机器学习/6.06朴素贝叶斯算法' },
                { text: '集成学习', link: '/ai算法与数据分析_final/3.机器学习/7.07集成学习' },
                { text: '聚类算法', link: '/ai算法与数据分析_final/3.机器学习/8.08聚类算法' },
                { text: '神经网络与OCR字符识别', link: '/ai算法与数据分析_final/3.机器学习/9.09神经网络与OCR字符识别' },
                {
                  text: '泰坦尼克获救预测',
                  collapsed: true,
                  items: [
                    { text: 'Section 1', link: '/ai算法与数据分析_final/3.机器学习/11泰坦尼克获救预测/1.section1' },
                    { text: 'Section 2', link: '/ai算法与数据分析_final/3.机器学习/11泰坦尼克获救预测/2.section2' },
                  ]
                },
                {
                  text: '结合人工智能的全栈Web项目',
                  link: '/ai算法与数据分析_final/3.机器学习/12结合人工智能的全栈web项目/README',
                }
              ]
            },
            {
              text: '深度学习与自然语言处理',
              collapsed: false,
              items: [
                { text: 'PyTorch', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/1.2pytorch/1.1.2pytorch' },
                { text: '循环神经网络', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/1.3循环神经网络/1.1.3循环神经网络' },
                { text: '项目准备', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/2.1项目准备/1.2.1项目准备' },
                { text: 'FastText文本分类', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/2.2fasttext文本分类/1.2.2fasttext文本分类' },
                { text: 'Seq2Seq模型和闲聊机器人', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/2.3Seq2Seq模型和闲聊机器人/1.2.3Seq2Seq模型和闲聊机器人' },
                { text: 'QA机器人', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/2.4QA机器人/1.2.4QA机器人' },
                {
                  text: '补充',
                  collapsed: true,
                  items: [
                    { text: '最大匹配法', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/补充/1.最大匹配法' },
                    { text: 'HMM', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/补充/2.HMM' },
                    { text: 'MEMM和CRF', link: '/ai算法与数据分析_final/4.深度学习与自然语言处理/补充/3.MEMM和CRF' },
                  ]
                },
              ]
            },
            {
              text: 'OpenCV',
              collapsed: false,
              items: [
                { text: 'OpenCV简介', link: '/ai算法与数据分析_final/5.OpenCV/1.01OpenCV简介' },
                { text: 'OpenCV基本操作', link: '/ai算法与数据分析_final/5.OpenCV/2.02Opencv基本操作' },
                { text: 'OpenCV图像处理1', link: '/ai算法与数据分析_final/5.OpenCV/3.03OpenCV图像处理1' },
                { text: 'OpenCV图像处理2', link: '/ai算法与数据分析_final/5.OpenCV/4.03OpenCV图像处理2' },
                { text: '图像特征提取与描述', link: '/ai算法与数据分析_final/5.OpenCV/5.04图像特征提取与描述' },
                { text: '视频操作', link: '/ai算法与数据分析_final/5.OpenCV/6.05视频操作' },
                { text: '人脸案例', link: '/ai算法与数据分析_final/5.OpenCV/7.06人脸案例' },
                { text: '车牌识别系统项目', link: '/ai算法与数据分析_final/5.OpenCV/8.07车牌识别系统opencv项目' },
              ]
            },
            {
              text: '深度学习与机器视觉',
              collapsed: false,
              items: [
                {
                  text: '数据处理与网络模型构建',
                  collapsed: true,
                  items: [
                    { text: 'Dataloader与Dataset', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/01数据处理与网络模型构建/1.01Dataloader与Dataset' },
                    { text: '数据增强与转换', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/01数据处理与网络模型构建/2.02数据增强与转换' },
                    { text: 'Pytorch中的模型创建', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/01数据处理与网络模型构建/3.03Pytorch中的模型创建' },
                    { text: 'PyTorch模型训练Mnist', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/01数据处理与网络模型构建/4.04PyTorch模型训练Mnist' },
                    { text: 'Pytorch训练自己的数据集', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/01数据处理与网络模型构建/5.05Pytorch训练自己的数据集' },
                    { text: 'Pytorch封装软件onnx_pyqt5', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/01数据处理与网络模型构建/6.06pytorch封装软件onnx_pyqt5' },
                  ]
                },
                {
                  text: '卷积神经网络',
                  collapsed: true,
                  items: [
                    { text: '卷积神经网络原理', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/02卷积神经网络/1.01卷积神经网络原理' },
                    { text: '梯度下降算法改进', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/02卷积神经网络/2.02梯度下降算法改进' },
                    { text: '经典网络结构', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/02卷积神经网络/3.03经典网络结构' },
                  ]
                },
                {
                  text: '移动端AI高效率分组模型',
                  collapsed: true,
                  items: [
                    { text: '卷积拆分分组与Xception', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/03移动端AI高效率分组模型/1.01卷积拆分分组与Xception' },
                    { text: 'MobileNet系列', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/03移动端AI高效率分组模型/2.02MobileNet系列' },
                    { text: 'ShuffleNet', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/03移动端AI高效率分组模型/3.03ShuffleNet' },
                  ]
                },
                {
                  text: '卷积注意力模型',
                  collapsed: true,
                  items: [
                    { text: '注意力模型基础', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/04卷积注意力模型/1.01注意力模型基础' },
                    { text: '空间注意力模型', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/04卷积注意力模型/2.02空间注意力模型' },
                    { text: '混合注意力模型', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/04卷积注意力模型/3.03混合注意力模型' },
                  ]
                },
                {
                  text: 'Transformer模型',
                  collapsed: true,
                  items: [
                    { text: '自注意力机制', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/05Transformer模型/1.01自注意力机制' },
                    { text: 'Transformer模型结构', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/05Transformer模型/2.02Transformer模型结构' },
                  ]
                },
                {
                  text: 'Vision Transformer模型',
                  collapsed: true,
                  items: [
                    { text: 'VisionTransformer模型', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/06Vision_Transformer模型/1.01VisionTransformer模型' },
                    { text: '轻量级VisionTransformer', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/06Vision_Transformer模型/2.02轻量级VisionTransformer' },
                  ]
                },
                {
                  text: '图像分类技术与项目实战',
                  collapsed: true,
                  items: [
                    { text: '图像分类基础', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/07图像分类技术与项目实战/1.01图像分类基础' },
                    { text: '多标签图像分类与实战', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/07图像分类技术与项目实战/2.02多标签图像分类与实战' },
                  ]
                },
                {
                  text: '目标检测技术与项目实战',
                  collapsed: true,
                  items: [
                    { text: '目标检测基础', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/1.01目标检测基础' },
                    { text: 'YOLOV1', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/2.02YOLOV1' },
                    { text: 'YOLOv2', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/3.03YOLOv2' },
                    { text: 'YOLOv3', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/4.04YOLOv3' },
                    { text: 'YOLOv4', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/5.05YOLOv4' },
                    { text: 'YOLOv5', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/6.06YOLOv5' },
                    { text: '基于YOLOv5的车牌检测', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/08目标检测技术与项目实战/7.07基于YOLOv5的车牌检测' },
                  ]
                },
                {
                  text: '图像分割技术与项目实战',
                  collapsed: true,
                  items: [
                    { text: '图像分割基础', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/09图像分割技术与项目实战/1.01图像分割基础' },
                    { text: '经典语义分割模型', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/09图像分割技术与项目实战/2.02经典语义分割模型' },
                    { text: '语义分割关键问题改进', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/09图像分割技术与项目实战/3.03语义分割关键问题改进' },
                    { text: '人脸语义分割实战', link: '/ai算法与数据分析_final/6.深度学习与机器视觉/09图像分割技术与项目实战/4.04人脸语义分割实战' },
                  ]
                },
              ]
            },
            {
              text: '大语言模型LLM',
              collapsed: false,
              items: [
                { text: '什么是大语言模型LLM', link: '/ai算法与数据分析_final/7.大语言模型LLM/1.01什么是大语言模型LLM' },
                { text: '千问大模型API演示', link: '/ai算法与数据分析_final/7.大语言模型LLM/2.02千问大模型APi演示' },
              ]
            },
          ]
        }
      ],
      '/flask_final/': [
        {
          text: 'Flask',
          collapsed: false,
          items: [
            {
              text: 'FLask基础',
              collapsed: false,
              items: [
                {
                  text: 'Flask视图',
                  collapsed: true,
                  items: [
                    { text: '创建项目', link: '/flask_final/1.FLask基础/1.Flask视图/1.创建项目' },
                    { text: '路由配置', link: '/flask_final/1.FLask基础/1.Flask视图/2.路由配置' },
                    { text: '请求参数', link: '/flask_final/1.FLask基础/1.Flask视图/3.请求参数' },
                    { text: 'abort函数', link: '/flask_final/1.FLask基础/1.Flask视图/4.abort函数' },
                    { text: '重定向', link: '/flask_final/1.FLask基础/1.Flask视图/5.重定向' },
                    { text: '响应数据', link: '/flask_final/1.FLask基础/1.Flask视图/6.响应数据' },
                    { text: 'Cookie', link: '/flask_final/1.FLask基础/1.Flask视图/7.Cookie' },
                    { text: 'Session', link: '/flask_final/1.FLask基础/1.Flask视图/8.Session' },
                    { text: '请求钩子', link: '/flask_final/1.FLask基础/1.Flask视图/9.请求钩子' },
                    { text: 'Flask上下文', link: '/flask_final/1.FLask基础/1.Flask视图/10.Flask上下文' },
                  ]
                },
                {
                  text: 'Flask模板',
                  collapsed: true,
                  items: [
                    { text: 'Jinja2模板引擎', link: '/flask_final/1.FLask基础/2.Flask模板/1.jinja2模板引擎' },
                    { text: '模板渲染', link: '/flask_final/1.FLask基础/2.Flask模板/2.模板渲染' },
                    { text: '基本语法', link: '/flask_final/1.FLask基础/2.Flask模板/3.基本语法' },
                    { text: '过滤器', link: '/flask_final/1.FLask基础/2.Flask模板/4.过滤器' },
                    { text: 'Flask-WTF扩展', link: '/flask_final/1.FLask基础/2.Flask模板/5.Flask-WTF扩展' },
                    { text: 'Jinja2宏', link: '/flask_final/1.FLask基础/2.Flask模板/6.jinja2宏' },
                    { text: '模板继承', link: '/flask_final/1.FLask基础/2.Flask模板/7.模板继承' },
                    { text: '模板包含', link: '/flask_final/1.FLask基础/2.Flask模板/8.模板包含' },
                    { text: '特殊变量', link: '/flask_final/1.FLask基础/2.Flask模板/9.特殊变量' },
                  ]
                },
                {
                  text: 'Flask模型',
                  collapsed: true,
                  items: [
                    { text: '数据库连接', link: '/flask_final/1.FLask基础/3.Flask模型/1.数据库连接' },
                    { text: '创建模型类', link: '/flask_final/1.FLask基础/3.Flask模型/2.创建模型类' },
                    { text: '数据保存', link: '/flask_final/1.FLask基础/3.Flask模型/3.数据保存' },
                    { text: '数据查询', link: '/flask_final/1.FLask基础/3.Flask模型/4.数据查询' },
                    { text: 'Flask-Script扩展命令行', link: '/flask_final/1.FLask基础/3.Flask模型/5.Flask-Script扩展命令行' },
                    { text: '数据库迁移', link: '/flask_final/1.FLask基础/3.Flask模型/6.数据库迁移' },
                    { text: '综合案例', link: '/flask_final/1.FLask基础/3.Flask模型/7.综合案例' },
                  ]
                },
                {
                  text: 'Flask项目配置',
                  collapsed: true,
                  items: [
                    { text: 'Flask蓝图', link: '/flask_final/1.FLask基础/4.Flask项目配置/1.Flask蓝图' },
                    { text: 'Flask邮件扩展', link: '/flask_final/1.FLask基础/4.Flask项目配置/2.Flask邮件扩展' },
                    { text: 'Flask Celery应用', link: '/flask_final/1.FLask基础/4.Flask项目配置/3.Flask celery应用' },
                  ]
                },
              ]
            },
            {
              text: 'Flask项目',
              collapsed: false,
              items: [
                {
                  text: '项目-课程教程',
                  collapsed: true,
                  items: [
                    { text: '项目结构模型创建', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/1.项目结构模型创建' },
                    { text: 'RESTful与验证码', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/2.RESTful与验证码' },
                    { text: '登录注册逻辑', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/3.登录注册逻辑' },
                    { text: 'Cache缓存', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/4.Cache缓存' },
                    { text: 'Paginate分页', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/5.paginate分页' },
                    { text: '支付宝支付', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/6.支付宝支付' },
                    { text: '全文检索与CSRF应用', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/7.全文检索与csrf应用' },
                    { text: '部署', link: '/flask_final/2.Flask项目/1.Flask项目-课程教程/8.部署' },
                  ]
                },
              ]
            },
          ]
        }
      ],
      '/git_final/': [
        {
          text: 'Git',
          collapsed: false,
          items: [
            {
              text: '项目创建',
              collapsed: false,
              items: [
                { text: '码云', link: '/git_final/1.项目创建/1.码云' },
                { text: 'Git安装', link: '/git_final/1.项目创建/2.Git安装' },
                { text: 'Git常用命令', link: '/git_final/1.项目创建/3.Git 常用命令' },
                { text: '创建仓库', link: '/git_final/1.项目创建/4.创建仓库' },
                { text: '添加SSH账户', link: '/git_final/1.项目创建/5.添加ssh账户' },
                { text: '克隆项目', link: '/git_final/1.项目创建/6.克隆项目' },
                { text: '创建项目分支', link: '/git_final/1.项目创建/7.创建项目分支' },
                { text: '搭建项目框架', link: '/git_final/1.项目创建/8.搭建项目框架' },
              ]
            },
            {
              text: '协作开发',
              collapsed: false,
              items: [
                { text: '添加SSH账户', link: '/git_final/2.协作开发/1.添加ssh账户' },
                { text: '克隆项目', link: '/git_final/2.协作开发/2.克隆项目' },
                { text: '同步服务器分支', link: '/git_final/2.协作开发/3.同步服务器分支' },
                { text: '工作区与暂存区', link: '/git_final/2.协作开发/4.工作区与暂存区' },
                { text: '暂存区与仓库区', link: '/git_final/2.协作开发/5.暂存区与仓库区' },
                { text: '本地与服务器', link: '/git_final/2.协作开发/6.本地与服务器' },
                { text: '分支合并', link: '/git_final/2.协作开发/7.分支合并' },
                { text: '合并冲突', link: '/git_final/2.协作开发/8.合并冲突' },
              ]
            },
            {
              text: '项目发布',
              link: '/git_final/3.项目发布/README',
            },
          ]
        }
      ],
      '/spider_final/': [
        {
          text: '爬虫',
          collapsed: false,
          items: [
            {
              text: '爬虫基础',
              collapsed: false,
              items: [
                { text: '爬虫基本原理', link: '/spider_final/1.爬虫基础/1.爬虫基本原理' },
                { text: 'Python3编码问题', link: '/spider_final/1.爬虫基础/2.python3编码问题' },
                { text: 'Requests基础应用', link: '/spider_final/1.爬虫基础/3.requests基础应用' },
                { text: 'Requests进阶', link: '/spider_final/1.爬虫基础/4.requests进阶' },
                { text: '抓包工具Fiddler', link: '/spider_final/1.爬虫基础/5.抓包工具fiddler' },
                { text: '了解Urllib', link: '/spider_final/1.爬虫基础/6.了解urllib' },
              ]
            },
            {
              text: '爬虫解析库',
              collapsed: false,
              items: [
                { text: '正则表达式', link: '/spider_final/2.爬虫解析库/1.正则表达式' },
                { text: '正则表达式案例', link: '/spider_final/2.爬虫解析库/2.正则表达式案例' },
                { text: 'XPath', link: '/spider_final/2.爬虫解析库/3.xpath' },
                { text: 'XPath案例', link: '/spider_final/2.爬虫解析库/4.xpath案例' },
                { text: 'Beautiful Soup', link: '/spider_final/2.爬虫解析库/5.beautiful soup' },
                { text: 'Beautiful Soup案例', link: '/spider_final/2.爬虫解析库/6.beautiful soup案例' },
              ]
            },
            {
              text: '数据存储',
              collapsed: false,
              items: [
                { text: 'TXT文件存储', link: '/spider_final/3.数据存储/1.txt文件存储' },
                { text: 'JSON文件存储', link: '/spider_final/3.数据存储/2.json文件存储' },
                { text: 'CSV文件存储', link: '/spider_final/3.数据存储/3.csv文件存储' },
                { text: '多线程爬虫+JSON存储', link: '/spider_final/3.数据存储/4.多线程爬虫+json存储' },
              ]
            },
            {
              text: '动态渲染页面爬取',
              collapsed: false,
              items: [
                { text: '动态HTML', link: '/spider_final/4.动态渲染页面爬取/1.动态html' },
                { text: 'Selenium+PhantomJS', link: '/spider_final/4.动态渲染页面爬取/2.selenium+phantosJS' },
                { text: '网站模拟登录', link: '/spider_final/4.动态渲染页面爬取/3.网站模拟登录' },
                { text: '动态页面模拟点击', link: '/spider_final/4.动态渲染页面爬取/4.动态页面模拟点击' },
                { text: '执行JS语句', link: '/spider_final/4.动态渲染页面爬取/5.执行js语句' },
              ]
            },
            {
              text: 'Scrapy框架',
              collapsed: false,
              items: [
                { text: 'Scrapy安装配置', link: '/spider_final/5.Scrapy框架/1.Scrapy安装配置' },
                { text: 'Scrapy Shell', link: '/spider_final/5.Scrapy框架/2.Scrapy shell' },
                { text: 'Item Pipeline', link: '/spider_final/5.Scrapy框架/3.Item Pipeline' },
                { text: 'Spider', link: '/spider_final/5.Scrapy框架/4.Spider' },
                { text: 'CrawlSpider', link: '/spider_final/5.Scrapy框架/5.CrawlSpider' },
                { text: 'Request-Response', link: '/spider_final/5.Scrapy框架/6.Request-Response' },
                { text: 'Downloader Middlewares', link: '/spider_final/5.Scrapy框架/7.Downloader Middlewares' },
                { text: 'Settings', link: '/spider_final/5.Scrapy框架/8.settings' },
              ]
            },
          ]
        }
      ],
      '/sql_final/': [
        {
          text: 'SQL与数据库',
          collapsed: false,
          items: [
            {
              text: 'MySQL基本使用',
              collapsed: false,
              items: [
                { text: 'MySQL简介', link: '/sql_final/1.MySQL基本使用/1.MySQL简介' },
                { text: 'MySQL安装', link: '/sql_final/1.MySQL基本使用/2.MySQL安装' },
                { text: '数据的完整性', link: '/sql_final/1.MySQL基本使用/3.数据的完整性' },
                { text: 'Navicat操作数据库', link: '/sql_final/1.MySQL基本使用/4.Navicat操作数据库' },
                { text: '命令行操作数据库', link: '/sql_final/1.MySQL基本使用/5.命令行操作数据库' },
                { text: '基础查询语句', link: '/sql_final/1.MySQL基本使用/6.基础查询语句' },
                { text: '插入数据语句', link: '/sql_final/1.MySQL基本使用/7.插入数据语句' },
                { text: '修改删除语句', link: '/sql_final/1.MySQL基本使用/8.修改删除语句' },
                { text: '数据库备份与恢复', link: '/sql_final/1.MySQL基本使用/9.数据库备份与恢复' },
              ]
            },
            {
              text: 'MySQL数据查询',
              collapsed: false,
              items: [
                { text: '条件查询', link: '/sql_final/2.MySQL数据查询/1.条件查询' },
                { text: '聚合函数', link: '/sql_final/2.MySQL数据查询/2.聚合函数' },
                { text: '分组与分页', link: '/sql_final/2.MySQL数据查询/3.分组与分页' },
                { text: '连接查询', link: '/sql_final/2.MySQL数据查询/4.连接查询' },
                { text: '子查询', link: '/sql_final/2.MySQL数据查询/5.子查询' },
                { text: '保存查询结果', link: '/sql_final/2.MySQL数据查询/6.保存查询结果' },
              ]
            },
            {
              text: 'MySQL高级',
              collapsed: false,
              items: [
                { text: '存储过程', link: '/sql_final/3.MySQL高级/1.存储过程' },
                { text: '存储过程变量', link: '/sql_final/3.MySQL高级/2.存储过程变量' },
                { text: '存储过程IF语句', link: '/sql_final/3.MySQL高级/3.存储过程if语句' },
                { text: '存储过程WHILE语句', link: '/sql_final/3.MySQL高级/4.存储过程WHILE语句' },
                { text: 'MySQL视图', link: '/sql_final/3.MySQL高级/5.MySQL视图' },
                { text: 'MySQL函数', link: '/sql_final/3.MySQL高级/6.MySQL函数' },
                { text: '索引', link: '/sql_final/3.MySQL高级/7.索引' },
              ]
            },
            {
              text: 'MySQL与Python交互',
              collapsed: false,
              items: [
                { text: '账户管理', link: '/sql_final/4.MySQL与Python交互/1.账户管理' },
                { text: '事务', link: '/sql_final/4.MySQL与Python交互/2.事务' },
                { text: '查询实战', link: '/sql_final/4.MySQL与Python交互/3.查询实战' },
                { text: 'Python与MySQL交互', link: '/sql_final/4.MySQL与Python交互/4.Python与MySQL交互' },
                { text: 'Python程序对MySQL操作', link: '/sql_final/4.MySQL与Python交互/5.Python程序对MySQL操作' },
              ]
            },
            {
              text: 'MongoDB数据库',
              collapsed: false,
              items: [
                { text: 'MongoDB介绍', link: '/sql_final/5.MongoDB数据库/1.MongoDB的介绍' },
                { text: 'MongoDB安装', link: '/sql_final/5.MongoDB数据库/2.MongoDB安装' },
                { text: '图形界面工具操作MongoDB', link: '/sql_final/5.MongoDB数据库/3.图形界面工具操作MongoDB' },
                { text: '命令行基本操作', link: '/sql_final/5.MongoDB数据库/4.命令行基本操作' },
                { text: '集合操作', link: '/sql_final/5.MongoDB数据库/5.集合操作' },
                { text: '数据类型', link: '/sql_final/5.MongoDB数据库/6.数据类型' },
                { text: 'MongoDB数据增删改查', link: '/sql_final/5.MongoDB数据库/7.MongoDB数据增删改查' },
                { text: 'MongoDB备份与恢复', link: '/sql_final/5.MongoDB数据库/8.MongoDB备份与恢复' },
                { text: 'MongoDB与Python交互', link: '/sql_final/5.MongoDB数据库/9.MongoDB与Python交互' },
              ]
            },
            {
              text: 'MongoDB高级',
              collapsed: false,
              items: [
                { text: 'MongoDB监控', link: '/sql_final/6.MongoDB高级/1.MongoDB监控' },
                { text: 'MongoDB关系', link: '/sql_final/6.MongoDB高级/2.MongoDB关系' },
                { text: 'MongoDB数据库引用', link: '/sql_final/6.MongoDB高级/3.MongoDB数据库引用' },
                { text: 'MongoDB全文检索', link: '/sql_final/6.MongoDB高级/4.MongoDB全文检索' },
                { text: 'MongoDB复制', link: '/sql_final/6.MongoDB高级/5.MongoDB复制' },
                { text: 'MongoDB分片集群', link: '/sql_final/6.MongoDB高级/6.MongoDB分片集群' },
              ]
            },
            {
              text: 'Redis数据库',
              collapsed: false,
              items: [
                { text: 'Redis安装与简介', link: '/sql_final/7.Redis数据库/1.Redis安装与简介' },
                { text: 'Redis数据库操作', link: '/sql_final/7.Redis数据库/2.Redis数据库操作' },
                { text: 'Python与Redis交互', link: '/sql_final/7.Redis数据库/3.Python与Redis交互' },
                { text: 'Redis搭建主从', link: '/sql_final/7.Redis数据库/4.Redis搭建主从' },
              ]
            },
          ]
        }
      ],
    },
  },
})
