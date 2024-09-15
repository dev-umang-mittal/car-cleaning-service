function Events({event=[]}){
console.log("🚀 ~ Events ~ event:", event)

    const classMap = {
        "OFF": "off",
        "INTERIOR": "interior",
        "EXTERIOR": "exterior",
    };


    return (<div className={`event-container ${classMap[event.serviceType]}-container`}>
        {event.serviceType} - {event.status}
    </div>);
}

export default Events;