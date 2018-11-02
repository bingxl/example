# 使用 puppeteer 获取 QQ 好友

## 安装模块
```
npm install
```
**安装 puppeteer 时会下载 chromium 浏览器，需要翻墙，或者跳过，自己下载安装**

## 配置自己的QQ号和密码
在 index.js 文件里的 qq， pwd 两个变量的值改为自己的qq号和手机号。

## 运行
`node index.js`

## 结果
当在控制台看到有数据写入完成的字样时说明成功了，好友数据就在 friend.txt 文件里。