const generateSchedule = (subscription) => {
    const { startDate, subscriptionPlan, carType, timeSlot } = subscription;
    let schedule = [];
    let exteriorCount = 0;
    let interiorCount = 0;
  
    const start = new Date(startDate);
    let dayOffset = 0;
  
    // Daily Plan: 22 Exterior, 2 Interior, Off Day after 6 exterior services
    if (subscriptionPlan === 'Daily') {
      for (let i = 0; i < 28; i++) {
        let serviceType = null;
        if (exteriorCount === 22) break;  // No more exterior services after 22
  
        if (i === 0) {
          serviceType = 'INTERIOR';
          interiorCount++;
        } else if (interiorCount === 1 && exteriorCount >= 12) {
          serviceType = 'INTERIOR';
          interiorCount++;
        } else if (i % 7 === 6) {
          serviceType = 'OFF';
        } else {
          serviceType = 'EXTERIOR';
          exteriorCount++;
        }
  
        schedule.push({
          subscriptionId: subscription._id,
          serviceDate: new Date(start.getFullYear(), start.getMonth(), start.getDate() + dayOffset),
          serviceType,
          status: 'pending',
          carType,
          timeSlot,
        });
  
        dayOffset++;
      }
    }
  
    // Alternate Plan: 10 Exterior, 2 Interior, Off Day after each service + 2 off days after every 3 services
    if (subscriptionPlan === 'Alternate') {
      for (let i = 0; i < 28; i++) {
        let serviceType = null;
        if (exteriorCount === 10) break;  // No more exterior services after 10
  
        if (i === 0) {
          serviceType = 'INTERIOR';
          interiorCount++;
        } else if (interiorCount === 1 && (exteriorCount + interiorCount) >= 6) {
          serviceType = 'INTERIOR';
          interiorCount++;
        } else if (i % 2 === 1 || (i % 6 === 5)) {
          serviceType = 'OFF';
        } else {
          serviceType = 'EXTERIOR';
          exteriorCount++;
        }
  
        schedule.push({
          subscriptionId: subscription._id,
          serviceDate: new Date(start.getFullYear(), start.getMonth(), start.getDate() + dayOffset),
          serviceType,
          status: 'pending',
          carType,
          timeSlot,
        });
  
        dayOffset++;
      }
    }
  
    return schedule;
  };

  module.exports = {generateSchedule};