const express = require('express');
const subscriptions = require('../models/subscriptions');
const { generateSchedule } = require('../utils/scheduleUtils');
const schedule = require('../models/schedule');
const crypto = require('crypto');

const schedulingRouter = express.Router();

schedulingRouter.get('/', async(req, res)=> {
    console.log("🚀 ~ schedulingRouter.get ~ req:", req.query);
    const { from="" , to=""} = req.query || {};
    const period = "day";


    const groupingMap = {
        week: '$week',
        month: '$month',
        day: '$dayOfYear',
        default: '$dayOfWeek',
    };

    // const result = await schedule.aggregate([
    //     { $group: {
    //         _id: { [groupingMap[period]]: '$date' },
    //         _children: { $push:  '$$ROOT' }

    //     } }
    // ]);

    const result = await schedule.find({ 
        serviceDate: { $gte: new Date(from), $lt: new Date(to) },
     })
    console.log(result);
    res.json({result});
});

schedulingRouter.post('/', async(req, res)=> {
    const { startDate, carType, subscriptionType, timeSlot } = req.body || {};
    console.log("🚀 ~ schedulingRouter.post ~ req.body:", req.body)
    const uniqueUserId = crypto.randomUUID();
    await subscriptions.create({
        userId: uniqueUserId,
        subscriptionPlan: subscriptionType,
        startDate: new Date(startDate),
        carType,
        timeSlot,
        totalExteriors: subscriptionType === 'Daily' ? 22 : 10,
        totalInteriors: 2,  // Both plans have 2 interior cleanings
        status: 'active',
      });

    const scheduleEntries = generateSchedule({startDate, subscriptionPlan:subscriptionType, carType, timeSlot});
    console.log("🚀 ~ schedulingRouter.post ~ scheduleEntries:", scheduleEntries)

    await schedule.insertMany(scheduleEntries);

    return res.status(201).json({ message: 'Subscription and schedule created successfully for userId - ' + uniqueUserId });
});


module.exports =  schedulingRouter;