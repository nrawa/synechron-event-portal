import { useEffect, useReducer } from "react";
import eventsServiceObj from "../Services/EventsService";
import EventDetails from "./EventDetails";
import './EventsList.css';
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {dateGlobalization, currencyGlobalization} from '../../Shared/Utilities/internationalization';

const InitialState = {
    events: [],
    eventId: 0,
    filteredEvents: [],
}

function reducer(state,action){
    switch (action.type) {
        case 'FETCH_ALL_EVENTS':
            state = {...state , events : action.payload, filteredEvents: action.payload}
            break;
        
        case 'FETCH_EVENT_DETAILS':
            state = {...state, eventId : action.payload}
            break;

        case 'SEARCH_BY_EVENT_NAME':
          state = {...state , filteredEvents : action.payload}
          break;

        case 'SORT_ASC':
          state = {...state , filteredEvents : action.payload}
          break;

        case 'SORT_DESC':
          state = {...state , filteredEvents : action.payload}
          break;

        default:
            break;
    }
    return state
}

const EventsListFunc = () => {
    let title = "Welcome To Synechron Events List!";
    let subTitle = "Published by Synechron Hr! Pune!";

    const [state, dispatch] = useReducer(reducer, InitialState);

      useEffect(() => {
        //ComponentDidMount, ComponentDidUpdate
        //IIFE for API call
        (async ()=>{
            dispatch({
                type:'FETCH_ALL_EVENTS', 
                payload: await eventsServiceObj.getAllEvents()})
        })();

        return () => {
          //componentWillUnmount
        };
      }, []);
    
      const onEventSelection = (id) => {
        dispatch({type:'FETCH_EVENT_DETAILS', payload: id});
      };

      const handleSearch = (searchStr) => {
        const filteredData = state.events.filter(item => item.eventName.toLowerCase().includes(searchStr.toLowerCase()));
        dispatch({
          type:'SEARCH_BY_EVENT_NAME', 
          payload:filteredData
        })
      }

      function handleNumAscSort(){
        state.filteredEvents.sort((s1, s2) => {
          return s1.fees - s2.fees;
        });
        dispatch({
          type: 'SORT_ASC', 
          payload: state.filteredEvents
        })
      }

      function handleNumDescSort(){
        state.filteredEvents.sort((s1, s2) => {
          return s2.fees - s1.fees;
        });
        dispatch({
          type: 'SORT_DESC', 
          payload: state.filteredEvents
        })
      }

      function handleStringSort(keyName,sortType){
        state.filteredEvents.sort(function(a, b) {
          const ValA = a[`${keyName}`].toUpperCase(); 
          const ValB = b[`${keyName}`].toUpperCase(); 
          //asc
          if(sortType === "SORT_ASC"){
            if (ValA < ValB) {
              return -1;
            }
            if (ValA > ValB) {
              return 1;
            }
          } 
          //desc
          if(sortType === "SORT_DESC"){
            if (ValA > ValB) {
              return -1;
            }
            if (ValA < ValB) {
              return 1;
            }
          }
        
          // names must be equal
          return 0;
        });
        dispatch({
          type: sortType, 
          payload: state.filteredEvents
        })
      }
    
      if (state.events) {
        return (
          <>
            <h1>{title}</h1>
            <hr />
            <h6>{subTitle}</h6>
            <hr />
            <br/>
            <input type="text" 
              placeholder="Search By Event Name" 
              className="searchBox" 
              onChange={(e)=>handleSearch(e.target.value)}/>
            <br/>

            {state.events.length > 0 ?
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th><>
                  Event Code
                  <button onClick={()=>handleStringSort('eventCode','SORT_ASC')}><FaSortUp/></button>
                  <button onClick={()=>handleStringSort('eventCode','SORT_DESC')}><FaSortDown/></button>
                  </></th>
                  <th><>Event Name
                  <button onClick={()=>handleStringSort('eventName','SORT_ASC')}><FaSortUp/></button>
                  <button onClick={()=>handleStringSort('eventName','SORT_DESC')}><FaSortDown/></button>
                  </></th>
                  <th>Start Date</th>
                  <th>Fees
                  <button onClick={()=>handleNumAscSort()}><FaSortUp/></button>
                  <button onClick={()=>handleNumDescSort()}><FaSortDown/></button>
                  </th>
                  <th>Show Details</th>
                </tr>
              </thead>
              <tbody>
                {state.filteredEvents.map((event) => (
                  <tr key={event.eventId}>
                    <td>
                      <span>{event.eventCode}</span>
                    </td>
                    <td>
                      <span>{event.eventName}</span>
                    </td>
                    <td>
                      <span>{dateGlobalization(event.startDate.toString(),'en-IN')}</span>
                    </td>
                    <td>
                      <span>{currencyGlobalization(event.fees,'en-US','USD')}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => onEventSelection(event.eventId)}
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <div>
              <br/>
              <p>No data found. Please modify your search!</p></div>}
            <br />

            {state.eventId > 0 ? (
              <EventDetails eventId={state.eventId} />
            ) : (
              ""
            )}
          </>
        );
      } else {
        return <h3>Loading...</h3>;
      }
    };

export default EventsListFunc;
    

// export const EventsListFunc = () => {
//   let title = "Welcome To Synechron Events List!";
//   let subTitle = "Published by Synechron Hr! Pune!";
//   const [events, setEvents] = useState([]);
//   const [eventId, setEventId] = useState(0);
//   useEffect(() => {
//     //ComponentDidMount, ComponentDidUpdate
//     setEvents(eventsServiceObj.getAllEvents());

//     return () => {
//       //componentWillUnmount
//     };
//   }, []);

//   const onEventSelection = (id) => {
//     setEventId(id);
//   };

//   if (events.length > 0) {
//     return (
//       <>
//         <h1>{title}</h1>
//         <hr />
//         <h6>{subTitle}</h6>
//         <table className="table table-hover table-striped">
//           <thead>
//             <tr>
//               <th>Event Code</th>
//               <th>Event Name</th>
//               <th>Start Date</th>
//               <th>Fees</th>
//               <th>Show Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((event) => (
//               <tr key={event.eventId}>
//                 <td>
//                   <span>{event.eventCode}</span>
//                 </td>
//                 <td>
//                   <span>{event.eventName}</span>
//                 </td>
//                 <td>
//                   <span>{event.startDate.toString()}</span>
//                 </td>
//                 <td>
//                   <span>{event.fees}</span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-info"
//                     onClick={() => onEventSelection(event.eventId)}
//                   >
//                     Show Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <br />
//         {eventId > 0 ? (
//           <EventDetails eventId={eventId} />
//         ) : (
//           ""
//         )}
//       </>
//     );
//   } else {
//     return <h3>Loading...</h3>;
//   }
// };
