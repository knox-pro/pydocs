# 第3章 项目发布

## 项目发布
### 项目合并
当项目开发完成之后，需要进行项目的合并与发布，每组员将开发的分支逐个合并到dev分支，如果有冲突则解决冲突，在dev上的代码经过测试没有问题后，合并到master分支，完成发布
逐个合并
组员将自己分支上开发的代码，合并到dev分支上
前题：已经完成了自己分支代码的开发并完成添加、提交及推送 1.切换到dev分支
    
    git checkout dev
    
2.同步服务器dev代码
    
    git pull
    
3.合并，如果有冲突则与上一个组员商量解决冲突
    
    git merge agou
    
4.添加git根目录下。
    
    git add ./
    
5.提交 git commit -m 'agou合并'
6.推送
    
    git push origin dev
    
所有组员都合并完成之后，在dev测试代码没问题则可以同步到master分支
1.切换到dev分支
    
    git checkout dev
    
2.获取项目代码，即所有组员合并完成之后的代码。
    
    git pull
    
3.切换到master分支
    
    git checkout master
    
4.合并dev分支到master分支
    
    git merge dev
    
5.将文件添加到暂存区
    
    git add ./
    
6.提交
    
    git commit -m '发布'
    
7、打标签 版本号 v1.0，起一个容易记住的名字
    
    git tag 标签名称
    
8、同步到服务器
    
    git push origin master
    
Git和码云使用 all right reserved，powered by Gitbook文件修订时间： 2024年07月30日 20:22:08