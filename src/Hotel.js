import DOMupdates from './DOMupdates';
import Customer from './Customer';
import Bookings from './Bookings';
import RoomServices from './RoomServices';

class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.customers = users.users.map(user => new Customer(user.id, user.name)) || [];
    this.rooms = rooms.rooms; 
    this.bookings = bookings.bookings.map(booking => new Bookings(booking.userID, booking.date, booking.roomNumber)) || [];
    this.roomServices = roomServices.roomServices.map(roomService => new RoomServices(roomService.userID, roomService.date, roomService.food, roomService.totalCost)) || [];
    this.today = 'hi';
  }

  addToCustomers(id, name) {
    let customer1 = new Customer(id, name);
    this.customers.push(customer1)
  }

  addToBookings(id, date, roomNumber) {
    let booking1 = new Bookings(id, date, roomNumber);
    this.bookings.push(booking1);
  }

  addToRoomServices(id, date, food, cost) {
    let service1 = new RoomServices(id, date, food, cost);
    this.roomServices.push(service1);
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