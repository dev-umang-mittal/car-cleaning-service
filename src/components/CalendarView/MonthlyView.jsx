import { useContext, useEffect } from "react";
import { EventsContext } from "../../Context";
import { createArrayOfDatesAndMergeDataMonthly, getMonthStartAndEndDates, getWeekStartAndEndDates } from "../../utilities/dateUtils";
import Events from "./EventView";
import EventModal from "./EventModal";

function Monthly({date = new Date()}){
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
  const {events=[], fetchEvents} = useContext(EventsContext);

  // Create an array to store the days of the month
  const daysArray = [];

  const days = createArrayOfDatesAndMergeDataMonthly(events, date)
  console.log("🚀 ~ Monthly ~ days:", days)


    useEffect(() => {
      const {monthStart, monthEnd} = getMonthStartAndEndDates();
      const from = `${monthStart.getFullYear()}-${monthStart.getMonth()+1}-${monthStart.getDate()}`;
      const to = `${monthEnd.getFullYear()}-${monthEnd.getMonth()+1}-${monthEnd.getDate()+1}`;
      fetchEvents(from, to);
    }, []);

  return (
    <div className="monthly-view">
      {/* Render the names of the days of the week */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
        <div key={index} className="day-name">
          {day}
        </div>
      ))}

      {/* Render empty cells for the first week before the month starts */}
      {Array(startDay)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="empty-day" />
        ))}

      {/* Render the days of the month */}
      {days.map(({date, data={}}, index) => (
        <div key={index} className="day">
          <div>{date}</div>
          {/* Show the number of exterior and interior cleanings for the day */}
          <div>
            {
              Object.keys(data).map((key) => <>
              <EventModal event={key} data={data[key]} />
              </>)
            }
          </div>
        </div>
      ))}
  </div>
  );
}

export default Monthly;