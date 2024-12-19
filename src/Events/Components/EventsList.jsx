// import { Component } from "react";
// import styles from './EventsList.module.css';

// class EventsList extends Component{
//     constructor(props){
//         super(props);
//     }
//     #_pageTitle = 'Welcome To Event List! Pune!';
//     #_pageSubTitle = 'Published by Synechron HR Team! India!';
//     // #_styles ={
//     //     textAlign:'center',
//     //     color:'green',
//     //     border:'1px solid black', padding:'5px'
//     // }
//     render(){
//         return(
//             <>
//             <link rel="stylesheet" href="EventsList.css" />
//                 <h1>{this.#_pageTitle}</h1>
//                 <hr/>
//                 <h6>{this.#_pageSubTitle}</h6>
//             </>
//         )
//     }
// }

// export default EventsList

import { Component } from "react";
import EventDetails from "./EventDetails";
import eventServiceObj from "../Services/EventsService";

const InitialState = {
    events:[],
    selectedEventId : null
}

class EventsList extends Component{
    constructor(props){
        super(props);
        this.state = InitialState;
        //this.state.events = 
    }
    #_pageTitle = 'Welcome To Event List! Pune!';
    #_pageSubTitle = 'Published by Synechron HR Team! India!';

    componentDidMount(){
        this.setState({
            events: eventServiceObj.getAllEvents()
        },()=>{
            console.log(this.state)
        })
    }

    onEventSelection(eventId){
        this.setState({
            selectedEventId : eventId
        })
    }
   
    render(){
        return(
            <>
                <h1>{this.#_pageTitle}</h1>
                <hr/>
                <h6>{this.#_pageSubTitle}</h6>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Event Code</th>
                            <th>Event Name</th>
                            <th>Start Date</th>
                            <th>Fees</th>
                            <th>Show Details</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.events.map((item)=>(
                         <tr key={item.eventId}>
                        <td><span>{item.eventCode}</span></td>
                        <td><span>{item.eventName}</span></td>
                        <td><span>{item.startDate.toString()}</span></td>
                        <td><span>{item.fees}</span></td>
                        <td><button onClick={()=>this.onEventSelection(item.eventId)} className="btn btn-info">Show Details</button>
                        </td>
                    </tr>
                       ))}
                    </tbody>
                </table>
                {this.state.selectedEventId ? <EventDetails eventId={this.state.selectedEventId} /> : ''}
            </>
        )
    }
}

export default EventsList