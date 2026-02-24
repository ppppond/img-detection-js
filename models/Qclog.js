const mongoose = require('mongoose');

// แม่แบบ พิมพ์เขียว ทำให้เหมือนกับ app.js
const qcLogBlueprint = mongoose.Schema(
    {
        timestamp: {type: Date, default: Date.now},
        detectClass: String,
        count: Number
    }
);

// ส่งออกแม่พิมพ์
module.exports = mongoose.model('Qclog', qcLogBlueprint);