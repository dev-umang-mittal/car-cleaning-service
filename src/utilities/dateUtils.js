export function getWeekStartAndEndDates() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    console.log("🚀 ~ getWeekStartAndEndDates ~ dayOfWeek:", dayOfWeek)

    // Calculate the start of the week (Monday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek + 1);

    // Calculate the end of the week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 5);

    return { weekStart, weekEnd };
}

export function getMonthStartAndEndDates() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
  
    // Set the date to the first day of the month
    const monthStart = new Date(year, month, 1);
  
    // Get the last day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthEnd = new Date(year, month, daysInMonth);
  
    return { monthStart, monthEnd };
  }

  export function createArrayOfDatesAndMergeDataMonthly(data, date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1); // Day of the week for the 1st of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
  
    const arrayOfDates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = new Date(startDate.getFullYear(), startDate.getMonth(), i).toISOString().split('T')[0];
      const eventsMap = {};
  
      data.forEach(item => {
        const itemDate = new Date(item.serviceDate).toISOString().split('T')[0];
        if (itemDate === formattedDate) {
          eventsMap[item.serviceType] = eventsMap[item.serviceType] || [];
          eventsMap[item.serviceType].push(item);
        }
      });
  
      arrayOfDates.push({
        date: i,
        formattedDate,
        data: eventsMap
      });
    }
  
    return arrayOfDates;
  }

export function createArrayOfDatesAndMergeDataWeekly(data, date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  
    // Calculate the start of the week (Monday)
    const weekStart = new Date(year, month, date.getDate() - dayOfWeek + 1);
    const daysInWeek = 7;
  
    const arrayOfDates = [];
    for (let i = 0; i < daysInWeek; i++) {
      const formattedDate = new Date(weekStart.getTime() + i * 86400000).toISOString().split('T')[0];
      const eventsMap = {};
  
      data.forEach(item => {
        const itemDate = new Date(item.serviceDate).toISOString().split('T')[0];
        if (itemDate === formattedDate) {
          eventsMap[item.serviceType] = eventsMap[item.serviceType] || [];
          eventsMap[item.serviceType].push(item);
        }
      });
  
      arrayOfDates.push({
        date: i + 1,
        formattedDate,
        data: eventsMap
      });
    }
  
    return arrayOfDates;
  }