import DOMupdates from './DOMupdates';

class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServices = roomServices;
    // console.log('in Hotel users', users)
    // console.log('in Hotel rooms', rooms)
    // console.log('in Hotel bookings', bookings)
    // console.log('in Hotel roomServices', roomServices)
  }
}

export default Hotel;