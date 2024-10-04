import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    //
    const url = "https://upbit.com/service_center/notice";
    await page.goto(url);

    page.on("request", async (request) => {
        if (request.resourceType() === "xhr" || request.resourceType() === "fetch") {
            if (!request.url().includes("api")) {
                return;
            }

            if (
                !request.url().includes("https://api-manager.upbit.com/api/v1/announcements?os=web")
            ) {
                return;
            }
            console.log("captured request", request.url());
            const r = await request.response();
            if (r.ok()) {
                console.log("http status 200");

                // parsing
                try {
                    const jsonData = await r.json();
                    console.log("parsed jsonData", jsonData);
                } catch (e) {
                    console.log("unable to parse, printing text ...");
                    console.log(await r.text());
                }
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
