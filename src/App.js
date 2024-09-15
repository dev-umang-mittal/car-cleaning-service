import logo from './logo.svg';
import './App.css';
import DatePicker from './components/DatePicker/DatePicker';
import Calendar from './components/CalendarView/CalendarView';
import { useCallback, useEffect, useState } from 'react';
import { EventsContext } from './Context';
import Login from './views/Login';
import Subscription from './views/Subscription';
import { fetch } from './utilities/services';

function App() {
  
  const routes = {
    '/login': Login,
    '/subscribe': Subscription,
    '/calendar': Calendar
  };
  const [events, setEvents] = useState([]);
  const [route, setRoute] = useState('/login');

  useEffect(()=>{
    console.log(window.location)
    setRoute(window.location.pathname)
  }, [window.location])


  const fetchEvents = useCallback((from, to) => {
    //fetch events
    console.log("fetcing");
    const today = new Date();
      fetch('schedules', {
        from, to
      }).then(response => {
        setEvents(response.result);
      });
  });

  const Component = routes[route];

  return (
    <div className="App">
      <EventsContext.Provider value={{events, fetchEvents}}>
      <Component />
      {/* <Subscription /> */}
        {/* <Calendar /> */}
      </EventsContext.Provider>
    </div>
  );
}

export default App;
