const puppeteer = require('puppeteer-core');

const url = 'https://xxcapp.xidian.edu.cn/uc/wap/login?redirect=https%3A%2F%2Fxxcapp.xidian.edu.cn%2Fsite%2Fncov%2Fdailyup';

const config = {
    account: '', // 学号
    password: '', // 登录密码
    browserPath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // chrome或firefox浏览器可执行路径
};

// 填写提交
async function submit() {
    globalThis.browser = await puppeteer.launch({
        headless: false,
        executablePath: config.browserPath,

    }).catch(err => {
        console.error(err);
    });

    globalThis.page = (await browser.pages())[0];

    await page.goto(url);
    await page.type('#app > div.content > div:nth-child(1) > input[type=text]', config.account, { delay: 200 });
    await page.type('#app > div.content > div:nth-child(2) > input[type=password]', config.password, { delay: 200 });

    // 登录
    await page.click('#app > div.btn');
    // 等待跳转到新页面
    await page.waitForNavigation({waitUntil:'networkidle0'});


    const submitBtn = await page.$('body > div.item-buydate.form-detail2.ncov-page > div:nth-child(1) > div > section > div.list-box > div > a');
    const submitBtnText = await submitBtn.getProperty('text').then(res => res.jsonValue());
    console.log(submitBtnText);
    if (submitBtnText === '您已提交过信息 (you have been submitted)' ) {
        console.log('已提交过信息');
        // return;
    }
    // browser.close();
    // return;
    
    // 选择地理位置
    await page.click('body > div.item-buydate.form-detail2.ncov-page > div:nth-child(1) > div > section > div.form > ul > li:nth-child(4) > div > input[type=text]', { delay: 100 });
    
    // 等待一秒
    await page.waitFor(1000);

    // 提交
    await submitBtn.click();

    const sureBtn = '#wapcf > div > div.wapcf-btn-box > div.wapcf-btn.wapcf-btn-ok';
    await page.waitForSelector(sureBtn);
    console.log(await (await page.$(sureBtn)).getProperty('text').then(res => res.jsonValue()));

    // 确认
    await page.click('#wapcf > div > div.wapcf-btn-box > div.wapcf-btn.wapcf-btn-ok', { delay: 200 });

    const statusBtn = 'body > div.item-buydate.form-detail2.ncov-page > div.alert > div > p > span';
    page.waitForSelector(statusBtn);
    const successSubmit = (await (await page.$(statusBtn)).getProperty('text')) === '提交信息成功(Submitted)';
    page.close();
    browser.close();
    return successSubmit;
};

(async () => {

    Object.values(config).some(value => {
        if (!value) {
            console.error('账号/密码/浏览器可执行路径不能为空');
            process.exit(1);
        }
    });

    // 执行函数
    let status = false;
    status = await submit().catch(err => {
        console.error(err);
        status = false;
    });

    console.log(status ? '填写成功' : '填写失败');
})()