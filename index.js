 'use strict';

const express = require("express");
const async = require('async');
const cron = require('node-cron');
const request = require('request');
const cors = require("cors");
const axios = require('axios')
const fs = require('fs')
const helmet = require("helmet");
const server = require("./server.js");
const { loadhomepage } = require('./home.js');
const app = express();
const rateLimit = require("express-rate-limit");
const cookieparser = require('cookie-parser');
const getIP = require('ipware')().get_ip;
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50, // limit each IP to max requests per windowMs
    message: {
        error: "Bạn đã đặt giới hạn lượt yêu cầu 50/1p"
    }
});

app.use(limiter);
app.use(helmet());
app.use(cookieparser());
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    var color = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[32m'];
    var more = color[Math.floor(Math.random() * color.length)];
    console.log(more + '[ IP ] -> ' + ipInfo.clientIp);
    next();
});

async function uptime() {
    const path = require('path');
    let srcPath = path.join(__dirname, "public", 'corn', 'cronjob', 'index.json');
    var dataJson = JSON.parse(fs.readFileSync(srcPath, "utf-8"));
    if (dataJson[0] == undefined) return;
    cron.schedule('*/10 * * * * *', () => {
        async.mapLimit(dataJson, dataJson.length, (url, callback) => {
            request(url, (error, response, body) => {
                if (error) {
                    return callback(error);
                }
                callback(null, body);
            });
        }, (error, results) => {
            if (error) {
                //console.error(error);
            }
            // console.log(results);
        });
    });
}

app.use("/", server);

// Middleware xử lý lỗi
app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});
app.get('/', async function(req, res) {
    // Gửi nội dung của maintenance.html khi server đang trong quá trình bảo trì
    res.sendFile(__dirname + '/profile.html');
});
// Xử lý route '/'
app.get('/api', async function(req, res) {
    // Gửi nội dung của maintenance.html khi server đang trong quá trình bảo trì
    res.sendFile(__dirname + '/home.html');
});

// Khởi động server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('\x1b[36m[ START ] -> Server listening on portt\x1b[37m', app.get('port'), '\n');
});

// Route POST
app.post('/', function(request, response) {
    response.json({ data: "hi" });
});
