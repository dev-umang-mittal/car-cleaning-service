import { useContext, useState } from "react";
import Daily from "./DailyView";
import Weekly from "./WeeklyView";
import Monthly from "./MonthlyView";
import { CalendarViews, Views } from "./constants";
import { EventsContext } from "../../Context";

function Calendar(){

    const [view, setView] = useState(Views.DAILY);    

    function changeView(view) {
        setView(view);
    }

    return (
        <div className="calendar-container">
        <header className="calendar-header">
            {
                CalendarViews.map(item => <button className={`calendar-button ${view===item.view?'active':''}`} onClick={()=> changeView(item.view)}>{item.button}</button>)
            }
            </header>
        <div  className="calendar-body">
        { view == Views.DAILY && <Daily />}
        { view == Views.WEEKLY && <Weekly />}
        { view == Views.MONTHLY && <Monthly />}
        </div>
        </div>
    )
}

export default Calendar;