问题:Windows环境下配有Node.js 性能平台（alinode）的项目开发频繁报错
原因:性能监控不支持Windows系统
解决方法:
alinode配置修改为enable: false.
```
exports.alinode = {
  enable: false,
  server: 'wss://agentserver.node.aliyun.com:8080',
  appid: '66666',
  secret: 'itisasecrectsoicannottellyougays',
}
```

问题:获取全部试题出现报错情况ERROR 66000 [-/169.254.0.233/-/21ms GET /exam/questions/condition] nodejs.ENOENTError: ENOENT: no such file or directory, open 'D:\APPS\login_system\api\questions_save\ew7chh-j8no1-zk7evii-lvt3gp.json'
原因:并不存在对应的json文件
解决方法:
app\service\exam\questions.js
78行处为dealQuestions方法加入try catch判断
```JavaScript
dealQuestions(result){
        return result.map(item=>{
            let jsonContent ;
            try{
                jsonContent= fs.readFileSync(path.join(this.app.config.questionsRootPath,item.json_path));
                jsonContent = JSON.parse(jsonContent);
                let {questions_stem,questions_answer} = jsonContent;
                return {
                    ...item,
                    questions_stem,
                    questions_answer
                }

            } catch{
                return {
                    ...item,
                    questions_stem:'',
                    questions_answer:''
                }
            }
        });
    }
```