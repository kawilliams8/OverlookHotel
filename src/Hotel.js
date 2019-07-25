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
    let today = new Date();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.today = mm + '/' + dd + '/' + yyyy;
    DOMupdates.showToday(this.today);
  }
}

export default Hotel;