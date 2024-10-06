import { chromium } from "playwright";

let image_counter = 1;

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    //
    const url1 = "https://google.com";
    const url2 = "https://upbit.com/home";
    const url3 = "https://upbit.com/service_center/notice";

    await page.goto(url1);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `./images/image${image_counter}.png` });
    image_counter += 1;
    await page.waitForTimeout(3530);

    await page.goto(url2);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `./images/image${image_counter}.png` });
    image_counter += 1;
    await page.waitForTimeout(2440);

    await page.goto(url3);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `./images/image${image_counter}.png` });
    image_counter += 1;

    setTimeout(async () => {
        await context.close();
        await browser.close();
    }, 1000);

    page.on("request", async (request) => {
        if (request.resourceType() === "xhr" || request.resourceType() === "fetch") {
            // if (!request.url().includes("api")) {
            //     return;
            // }

            // if (
            //     !request.url().includes("https://api-manager.upbit.com/api/v1/announcements?os=web")
            // ) {
            //     return;
            // }

            const r = await request.response();
            if (!r) {
                console.log(`${request.url()} 's response failed`);
                return;
            }

            if (r && r.ok()) {
                console.log(`${request.url()} 's response ok ${r.status()}`);

                // parsing
                // try {
                //     const jsonData = await r.json();
                //     console.log("parsed jsonData", jsonData);
                // } catch (e) {
                //     console.log("unable to parse, printing text ...");
                //     console.log(await r.text());
                // }
            }
        }
    });
    // const url = "https://upbit.com/home";
    // const url = "https://upbit.com/service_center/notice";
    // https://api-manager.upbit.com/api/v1/announcements?os=web&page=1&per_page=20&category=all

    // console.log(`page goto ${url}`);
    // await page.goto(url, { waitUntil: "domcontentloaded" });

    // console.log(`waiting for articles to popup !`);
    // const selector123 = page.locator("tr.css-dfh7cx.css-knz4ib").nth(0);
    // await selector123.waitFor();

    // console.log("taking screenshot of the page ...");
    // await page.screenshot({ path: "screenshot.png", fullPage: true });

    // console.log("screenshot taken !");

    // console.log("sending http request ");

    // const api_url =
    //     "https://api-manager.upbit.com/api/v1/announcements?os=web&page=1&per_page=20&category=all";

    // const api_req_context = page.request;
    // const api_response = await api_req_context.get(api_url);

    // const r_body = await api_response.json();
    // console.log(r_body);

    // setTimeout(async () => {
    //     await context.close();
    //     await browser.close();
    // }, 5000);
})();
