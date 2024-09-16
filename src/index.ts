import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    //
    // const url = "https://google.com";
    // const url = "https://upbit.com/home";

    const url = "https://upbit.com/service_center/notice";
    console.log(`page goto ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded" });

    console.log(`waiting for articles to popup !`);
    const selector123 = page.locator("section.ty02");
    await selector123.waitFor();

    console.log("taking screenshot of the page ...");
    await page.screenshot({ path: "screenshot.png", fullPage: true });

    console.log("screenshot taken !");

    console.log("sending http request ");

    const api_url =
        "https://api-manager.upbit.com/api/v1/announcements?os=web&page=1&per_page=20&category=all";

    const api_req_context = page.request;
    const api_response = await api_req_context.get(api_url);

    const r_body = await api_response.json();
    console.log(r_body);

    setTimeout(async () => {
        await context.close();
        await browser.close();
    }, 5000);
})();
