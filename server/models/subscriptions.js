const mongoose = require('mongoose')

const subscriptons = new mongoose.Schema({
  userId: {  },
  carType: {},
  planType: {},
  startDate: {},
  timeSlot: {},
  totalExteriors: {type:Number},
  totalInteriors: {type:Number},
  status: {type:String}
  },  { timestamps: true });

module.exports = mongoose.model("subscriptions", subscriptons);