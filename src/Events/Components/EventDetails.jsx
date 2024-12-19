import React, { useEffect, useState } from 'react';
import eventServiceObj from "../Services/EventsService";

const EventDetails = ({eventId}) => {
    let title = "Details Of - ";

    const [eventData, setEventData] = useState(null);

    useEffect(()=>{
          (async ()=>{
            setEventData(await eventServiceObj.getEventDetails(eventId));
            })();
    },[eventId])

    if(eventData) return (
        <div>
        <h1>{title + eventData?.eventName}</h1>
        </div>
    )
    else return <div>Loading....</div>
}
export default EventDetails
