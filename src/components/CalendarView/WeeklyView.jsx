import { useContext, useEffect } from "react";
import { EventsContext } from "../../Context";
import { createArrayOfDatesAndMergeDataMonthly, createArrayOfDatesAndMergeDataWeekly, getWeekStartAndEndDates } from "../../utilities/dateUtils";
import EventModal from "./EventModal";

function Weekly({date=new Date()}){
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay())); // Set to the previous Sunday
  const weekDays = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000)); // 86400000 ms in a day
  const {events=[], fetchEvents} = useContext(EventsContext);

  const days = createArrayOfDatesAndMergeDataWeekly(events, date)
  console.log("🚀 ~ Monthly ~ days:", days)


    useEffect(() => {
      const {weekStart, weekEnd} = getWeekStartAndEndDates();
      const from = `${weekStart.getFullYear()}-${weekStart.getMonth()+1}-${weekStart.getDate()}`;
      const to = `${weekEnd.getFullYear()}-${weekEnd.getMonth()+1}-${weekEnd.getDate()+1}`;
      fetchEvents(from, to);
    }, []);

    return (
        <div className="weekly-view">
      <div className="week-grid">
        {days.map(({formattedDate, data={}}, index) => (
          <div key={index} className="day">
            {new Date(formattedDate).toDateString()}
            {/* You can add scheduled services for each day */}
            {
              Object.keys(data).map((key) => <><EventModal event={key} data={data[key]} /><br /></>)
            }
          </div>
        ))}
      </div>
    </div>
    )
}

export default Weekly;