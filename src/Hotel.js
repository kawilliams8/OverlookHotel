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

  addNewCustomer(name) {
    let id = this.customers.length + 1;
    let newCustomer = new Customer(id, name);
    this.customers.push(newCustomer);
  }

  addNewBooking(userID, date, roomNumber) {
    let newBooking = new Bookings(userID, date, roomNumber);
    this.bookings.push(newBooking);
  }

  addNewRoomService(id, date, food, cost) {
    let service1 = new RoomServices(id, date, food, cost);
    this.roomServices.push(service1);
  }

  calculateOccupancy(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date);
    return bookedRooms.length / this.rooms.length;
  }

  calculateRevenue(date) {
    let roomNumsForDate = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let bookingsRevenue = roomNumsForDate.reduce((acc, roomNum) => {
      acc += this.rooms.find(room => room.number === roomNum).costPerNight;
      return acc;
    }, 0);
    let ordersForDate = this.roomServices.filter(order => order.date === date);
    let roomServiceRevenue = ordersForDate.reduce((acc, roomService) => {
      acc += roomService.totalCost;
      return acc;
    }, 0);
    return bookingsRevenue + roomServiceRevenue;
  }
}

export default Hotel;