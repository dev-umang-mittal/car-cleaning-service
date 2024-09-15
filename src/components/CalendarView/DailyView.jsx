import { useContext, useEffect } from "react";
import { EventsContext } from "../../Context";
import { fetch } from "../../utilities/services";
import Events from "./EventView";

function Daily({date=new Date()}){
    const {events=[], fetchEvents} = useContext(EventsContext)
    console.log("🚀 ~ Daily ~ data:", events)

    useEffect(() => {
      const today = new Date();
      const from = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
      const to = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`;
      fetchEvents(from, to);
    }, []);

    return (
        <div className="daily-view">
      <h2>{date.toDateString()}</h2>
      {/* List scheduled services for this day */}
      {events.map(event => <Events event={event} />)}
    </div>
    )
}

export default Daily;