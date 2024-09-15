const mongoose = require('mongoose')

const schedules = new mongoose.Schema({
    subscriptionId: {},
    serviceDate: {},
    serviceType: {},
    status: {},
    carType: {},
    timeSlot: {},
}, { timestamps: true });

module.exports = mongoose.model("schedule", schedules);