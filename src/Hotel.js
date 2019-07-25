import DOMupdates from './DOMupdates';

class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServices = roomServices;
    this.today;
  }

  getTodayDate() {
    this.today = Date.now();
    DOMupdates.showToday(this.today)
  }
}

export default Hotel;