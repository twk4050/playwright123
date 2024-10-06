import request from "request";

const return_ip_url = "https://httpbin.org/ip";
request.get(return_ip_url, (err, res, body) => {
    if (err) {
        console.log("error occurred", err);
        return;
    }

    console.log(`GET ${return_ip_url}`);
    console.log(res.body);
});

const return_req_headers_url = "https://httpbin.org/headers";
request.get(return_req_headers_url, { headers: { h1: "h1_value" } }, (err, res, body) => {
    if (err) {
        console.log("error occurred", err);
        return;
    }
    console.log(`GET ${return_req_headers_url}`);
    console.log(res.body);
});
