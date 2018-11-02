const fs = require('fs');
const puppeteer = require('puppeteer')
const getDataRe = /friend_mngfrd_get.cgi/;

// qq 号和密码， 两者必须都是字符串类型
const qq = '****';
const pwd = '****';
const storeFileName = './friend.txt';
// 是否使用 headless 模式, 不建议使用, 登录时如果弹出安全验证需要自己手动验证
const headless = false;
// 获取到qq好友后存储的文件



// 检测当前页面是否是 qq 空间个人中心页面
const indexRe = new RegExp(`^https://user.qzone.qq.com/${qq}`);

async function init() {

  let isMainPage = false;
  global.browser = await puppeteer.launch({ headless });

  browser.on('targetchanged', target => {
    // target 对应着浏览器上的标签栏， 只是 url 变动时触发 targetchanged 事件， 
    isMainPage = indexRe.test(target.url())
  });

  // 登录
  let page = await browser.newPage();
  page.on('load', () => {
    if (isMainPage) {
      getAndStore(page);
    }
  });

  await page.setBypassCSP(true);
  await page.goto('https://qzone.qq.com');
  let frame = page.frames()[1];
  await frame.click('#switcher_plogin');
  await frame.type('#switcher_plogin', qq, { delay: 100 });
  await frame.type('#p', pwd, { delay: 100 });

  // 点击登录按钮后会触发browser 的 targetchanged 事件
  await frame.click('a.login_button');
  
}

async function getAndStore(page) {
  const stream = fs.createWriteStream(storeFileName);
  // 监听从服务器端获取到数据
  page.on('response', async res => {
    if (getDataRe.test(res.url())) {
      console.log('从后端获取到数据');
      
      let text = await res.text();
      stream.write(text, err => {
        if (err) {
          console.error('发生了错误', err);
        }
        console.log('数据写入完成');
        page.removeAllListeners('response');
        stream.close();
        browser.close();
      });
    }
  });

  // 点击发表说说输入框， 会从后台获取 QQ 好友
  page.click('.textinput.textarea.c_tx3');

}

init();