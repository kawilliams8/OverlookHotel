import DOMupdates from './DOMupdates';
import Customer from './Customer';
import Bookings from './Bookings';
import RoomServices from './RoomServices';

class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.customers = users.map(user => new Customer(user.id, user.name)) || [];
    this.rooms = rooms; 
    this.bookings = bookings.map(booking => new Bookings(booking.userID, booking.date, booking.roomNumber)) || [];
    this.roomServices = roomServices.map(roomService => new RoomServices(roomService.userID, roomService.date, roomService.food, roomService.totalCost)) || [];
    this.today;
  }

  addNewCustomer(name) {
    let id = this.customers.length + 1;
    let newCustomer = new Customer(id, name);
    return this.customers.push(newCustomer);
  }

  addNewBooking(userID, date, roomNumber) {
    let newBooking = new Bookings(userID, date, roomNumber);
    return this.bookings.push(newBooking);
  }

  addNewRoomService(id, date, food, cost) {
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