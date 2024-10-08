import request from "request";
import Agent from "agentkeepalive";

const httpAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const httpsAgent = new Agent.HttpsAgent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const client = request.defaults({
    agent: httpsAgent,
    json: true,
    time: true,
});

if (process.argv.length < 2) {
    throw Error("pls provide url as args");
}

const url = process.argv[2];

// https://fapi.binance.com/fapi/v1/ping
// https://httpbin.org/ip

function sendRequest() {
    client(
        {
            method: "GET",
            url: url,
        },
        (err, res, body) => {
            if (err) {
                console.log("err occurred");
                return;
            }
            // console.log(res["timings"]); // see ['timings']['end']
            // console.log("body response");

            const total_time = res["timings"]["end"];
            const body_response = JSON.stringify(body);

            console.log(`time taken for ${url}: ${total_time}`);
            console.log(`response: ${body_response}`);
        }
    );
}

sendRequest();
setInterval(sendRequest, 2000);
