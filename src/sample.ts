import { chromium } from "playwright";

const scrape_url = "https://www.scrapethissite.com/pages/";

(async () => {
    const browser = await chromium.launch({
        headless: true,
        devtools: false,
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    /* listener */
    page.on("request", async (r) => {
        const rType = r.resourceType();
        const url = r.url();

        console.log(url);
    });

    await page.goto(scrape_url);

    setTimeout(async () => {
        await context.close();
        await browser.close();
    }, 6000);
})();
