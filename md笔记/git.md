# git操作
git是工作的基础,不会git就无法提交工作
## git是什么
git是一个开源的分布式版本控制系统,快速,高效地处理从小型到大型项目的所有事物管理.
结束了手动管理多个’版本’的史前时代

全局配置用户信息:
git config --global user.name xxx(用户名)
git config --global user.email xxx(邮箱地址)
git config --l 查看全局的配置

git和svn的区别
git 分布式
svn 集中式


冗余 意味着 安全

分支管理 实现多人协作  
可离线操作

工作区(本地仓库) 文件夹   add
进入暂存区 整合文件夹  commit  
版本库(仓库)	master是默认分支名

git init  创建本地版本库
git status 查看文件状态

git add .  工作区所有文件提交到暂存区
git commit -m ”描述”  提交到仓库 并附带描述

git diff  查看工作区文件的具体修改
git diff --cached  查看暂存区具体修改
git checkout 路径    恢复文件/文件夹
git checkout .		恢复所有文件

第一种情况：撤销工作区的修改

#  git checkout 文件路径 

第二种情况：撤销暂存区的修改

#  1. git reset 文件路径 （把暂存区的修改撤回工作区）
#  2. git checkout 文件路径 

第三种情况：	版本回退

#  git reset --hard HEAD^ //回退到上个版本
#  git reset --hard HEAD^^ //上上个版本
HEAD~n //回退到n个版本上

回退到指定版本（回到现在过去）

git reset --hard commit_id(e66aa88...)
回退到指定版本（回到现在过去）

git reset --hard commit_id(e66aa88...)

如何获取所有版本的commit_id呢？
针对这个需求，需要分两种情况：
* 第一，git bash窗口没有关闭，使用前面查过的commit_id
* 第二，git bash窗口关闭。比如，昨天做的操作，今天后悔了。 使用 git reflog




存在文件差异不允许推送
存在差异,需要先将远程仓库克隆到本地

克隆完 是一个文件夹 名字是仓库名
git clone git@github.com:xu315895238/lianxi.git   连接远程仓库

推送有两种方法  https协议 ssh协议
SSH:		git@github.com:LittleDropsOfWater/1612bb.git
HTTPS:	https://github.com/LittleDropsOfWater/1612bb.git
https协议提交代码时需要输入用户名跟密码
ssh协议不需要
设置ssh密钥   包含(创建密钥,上传密钥)
https://blog.csdn.net/heimu24/article/details/81171422

$ ssh-keygen -t rsa -C "651027540@qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/OR/.ssh/id_rsa):
Created directory '/c/Users/OR/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/OR/.ssh/id_rsa.
Your public key has been saved in /c/Users/OR/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:Cb6hKr4ESr8FpGDrsSAHXBtfMQZ8F5H2WK9asvuqVnw 651027540@qq.com
The key's randomart image is:
+---[RSA 2048]----+
|   o...=.o+      |
|. . +.o..+ .     |
|oo o .o o + .    |
|o.+  . . o . .   |
|+=..  o S   .    |
|B.+ .. o + E     |
|.+ .... . *      |
|o  .o  . o       |
|.+o.  ...o+.     |
+----[SHA256]-----+


master 用户可见
dev 测试团队
分支相关：
git branch -a  同时查看本地和远程分支
git branch -r 　查看远程分支
git checkout -b 分支名  创建并切换到新分支
git push origin -d 分支名  删除远程分支	
分支之间只能用git merge合并

流程整合：本地项目推送远程仓库
git init		初始化本地仓库
git add .		工作区提交暂存区
git commit -m `描述`	提交仓库
git remote add origin  `远程仓库地址`  关联远程仓库
git remote -v   查看关联的远程仓库
git push origin master 推送到远程仓库

流程整合: 从远程仓库创建分支
连接远程仓库
git clone git@github.com:xu315895238/lianxi.git
创建属于自己的分支
 git checkout -b 'ywc'
上传分支
git push -u origin ywc
使用-u方式上传后  git push 默认上传到该分支



代码冲突时,需要手动解决,口头交流

提交文件的保险流程
提交远程之前，必须把当前的文件提交干净。
git status
(若提示有文件修改,git add .)
git commit -m ‘描述’
git pull origin 当前分支名
git push origin 当前分支名

切换分支的保险流程
切换分支之前，必须将当前分支文件提交干净。
合并分支的流程
切换到要合并的分支， 把被合并的分支合并；
git checkout  要合并的分支
git merge 被合并的分支
git pull origin 要合并的分支
git push origin 要合并的分支

第一步：
至少需要4个分支
master
dev
ywc
txb
每个人把代码往自己分支提交
代码差不多了往dev合并
dev测试完毕往master合  
确保master一定不要出问题