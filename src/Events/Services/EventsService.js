import axios from '../../Shared/axios-interceptor/interceptor';

class EventsService{
    // #_events =  [
    //     {
    //         eventId: 1001,
    //         eventCode: 'SEMJQ3',
    //         eventName: 'Seminar on jQuery 3.x',
    //         description: 'Seminar will discuss all the new features of jQuery 3.x',
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         fees: 800,
    //         seatsFilled: 70,
    //         logo: 'assets/images/jq3.png'
    //     },
    //     {
    //         eventId: 1002,
    //         eventCode: 'SEMNG1',
    //         eventName: 'Seminar on Angular JS 1.5.x',
    //         description: 'Seminar will discuss all the new features of Angular JS 1.5.x',
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         fees: 600,
    //         seatsFilled: 50,
    //         logo: 'assets/images/ng1.png'
    //     },
    //     {
    //         eventId: 1003,
    //         eventCode: 'SEMNG2',
    //         eventName: 'Seminar on Angular 2.x',
    //         description: 'Seminar will discuss all the new features of Angular 2.x',
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         fees: 1000,
    //         seatsFilled: 80,
    //         logo: 'assets/images/ng2.png'
    //     },
    //     {
    //         eventId: 1004,
    //         eventCode: 'SEMNG4',
    //         eventName: 'Seminar on Angular 4.x',
    //         description: 'Seminar will discuss all the new features of Angular 4.x',
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         fees: 1000,
    //         seatsFilled: 76,
    //         logo: 'assets/images/ng2.png'
    //     },
    //     {
    //         eventId: 1005,
    //         eventCode: 'SEMBS3',
    //         eventName: 'Seminar on Bootstrap 3.x',
    //         description: 'Seminar will discuss all the new features of Bootstrap 3.x',
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         fees: 500,
    //         seatsFilled: 34,
    //         logo: 'assets/images/bs3.png'
    //     }
    // ];

    #_baseUrl = 'http://localhost:9090/api';
    async getAllEvents(){
       return await (await axios.get(`${this.#_baseUrl}/events`)).data;
    }

    // getAllEvents(){
    //     return this.#_events;
    // }

    // getEventDetails(eventId){
    //     return this.#_events.find((item) => item.eventId === eventId)
    // }

    async getEventDetails(eventId){
        return await (await axios.get(`${this.#_baseUrl}/events/${eventId}`)).data;
    }
}

export default new EventsService()