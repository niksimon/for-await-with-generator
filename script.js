const https = require("https");
const axios = require('axios');

function get(id) {
    return new Promise((resolve, reject) => {
        https.get(`https://jsonplaceholder.typicode.com/users/${id}`, res => {
            let data = "";
            res.on("data", d => {
                data += d;
            });
            res.on("end", () => {
                resolve(JSON.parse(data));
            });
            res.on("error", () => {
                reject("Error");
            })
        });
    });
}

function get2(id) {
    return new Promise((resolve, reject) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error);
        })
        .then(function () { });
    });
}

// get n users
async function* generator(n) {
    let i = 0;
    while(i < n) {
        yield await get2(++i);
    }
}

(async () => {
    for await(let obj of generator(5)) {
        console.log(obj.name);
    }
})();