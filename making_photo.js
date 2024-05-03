//adding Puppeteer library
import dev_puppeteer from "puppeteer";
import chrome from 'chrome-aws-lambda';
import puppeteer_core from 'puppeteer-core';

async function providePhoto(word = 'autocracy', site = 'https://bing.com/search?q=define+') {

  const selectorDefinationDiv = '#b_dict_container', selectorExpandDiv = '.b_dictExpButton', selectorImg = '.b_arrowBottom';
  let options = {
    headless: true,
    defaultViewport: { width: 1980, height: 1080, deviceScaleFactor: 2 }
  };
  let puppeteer = dev_puppeteer;


  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // running on the Vercel platform.
    puppeteer = puppeteer_core;
    options = {
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
    console.log("bot");
  }



  const browser = await puppeteer.launch(options);
  const p = await browser.newPage();
  await p.goto(site + word);


  await p.waitForSelector(selectorDefinationDiv, { visible: true });



  const ele = await p.$(selectorDefinationDiv);
  const photo = await ele.screenshot();


  await p.close();
  await browser.close();

  return "data:image/jpeg;base64," + photo.toString('base64');

}
// providePhoto('','demo');
export { providePhoto };
