import { chromium } from "playwright";
import fp from "node:fs/promises";

const upbit_home = "https://upbit.com/home";

// ?os=web&page=1&per_page=20&category=all
// const api_endpoint = "https://api-manager.upbit.com/api/v1/announcements?";

const api_endpoint =
    "https://api-manager.upbit.com/api/v1/announcements?os=web&page=1&per_page=20&category=all";

(async () => {
    const browser = await chromium.launch({
        headless: true,
        devtools: false,
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    /* listener */
    const WHITELISTED_REQUEST_TYPES = ["xhr", "fetch"];
    page.on("request", async (r) => {
        const rType = r.resourceType();
        const url = r.url();

        if (!WHITELISTED_REQUEST_TYPES.includes(rType)) {
            return;
        }

        if (!url.includes("api")) {
            return;
        }

        if (url === api_endpoint) {
            const allHeaders = await r.allHeaders();
            const headers = r.headers();
            const headersArray = await r.headersArray();

            console.log(allHeaders);
            console.log(headers);
            headersArray.forEach((h) => {
                console.log(h);
            });
            // await fp.writeFile("./headers.txt", JSON.stringify(headers), { encoding: "utf8" });
        }

        // if (url.includes(api_endpoint)) {
        //     const allHeaders = await r.allHeaders();

        //     const res = await r.response();

        //     if (res) {
        //         const resAllHeaders = await res.allHeaders();
        //         const resStatus = res.status();
        //         const resStatusText = res.statusText();
        //         const resJsonData = await res.json();

        //         console.log("----- request -----");
        //         console.log(`request url: ${url}`);
        //         console.log(allHeaders);
        //         console.log("----- response -----");
        //         console.log(resAllHeaders);
        //         console.log(resStatus);
        //         console.log(resStatusText);

        //         if ("data" in resJsonData) {
        //             if ("notices" in resJsonData["data"]) {
        //                 for (let i = 0; i < resJsonData["data"]["notices"].length; i++) {
        //                     if (i >= 2) {
        //                         break;
        //                     }
        //                     console.log(resJsonData["data"]["notices"][i]);
        //                 }
        //             }
        //         }
        //     } else {
        //         console.log("response unsuccessful");
        //     }
        // }
    });

    /* from upbit home -> go to upbit notice page */

    await page.goto(upbit_home, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1324);
    await page.locator(".css-ddhpqj > use").click();
    await page.locator("#modal svg").nth(2).click();
    await page.waitForTimeout(3565);
    await page.getByRole("link", { name: "공지사항" }).click();

    setTimeout(async () => {
        await context.close();
        await browser.close();
    }, 13000);
})();
