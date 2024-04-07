//adding Puppeteer library
import puppeteer from "puppeteer";

async function providePhoto(word='shubham', site='https://bing.com/search?q=define+') {

    const selectorDefinationDiv = '#b_dict_container', selectorExpandDiv = '.b_dictExpButton', selectorImg = '.b_arrowBottom';

    const browser = await puppeteer.launch({headless:true,
        defaultViewport: { width: 1980, height: 1080, deviceScaleFactor: 2 }
      });
    const p = await browser.newPage();
    await p.goto(site+word);

    
    await p.waitForSelector(selectorDefinationDiv, {visible:true});
    
    

    const ele = await p.$(selectorDefinationDiv);
    const photo = await ele.screenshot();
    
    
    await p.close();
    await browser.close();
    
    return "data:image/jpeg;base64," + photo.toString('base64');
    
}
// providePhoto('','demo');
export { providePhoto };
