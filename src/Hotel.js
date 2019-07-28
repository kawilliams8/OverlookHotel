import DOMupdates from './DOMupdates';
import Customer from './Customer';
import Bookings from './Bookings';
import RoomServices from './RoomServices';

class Hotel {
  constructor(users, rooms, bookings, roomServices) {
    this.rooms = rooms; 
    this.bookings = bookings.map(booking => new Bookings(booking.userID, booking.date, booking.roomNumber)) || [];
    this.roomServices = roomServices.map(roomService => new RoomServices(roomService.userID, roomService.date, roomService.food, roomService.totalCost)) || [];
    this.customers = users.map(user => new Customer(user.id, user.name, this.bookings, this.roomServices)) || [];
    this.searchDate = '';
    this.today = '';
    this.currentCustomer = {};
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
    this.searchDate = yyyy + '/' + mm + '/' + dd; 
    this.today = mm + '/' + dd + '/' + yyyy;
    DOMupdates.showToday(this.today);
  }

  searchForCustomer(name) {
    let foundCustomer = this.customers.find(customer => customer.name === name);
    this.currentCustomer = foundCustomer;
    this.currentCustomer.findCurrCustBookings(this.currentCustomer);
    this.currentCustomer.findCurrCustRoomServices(this.currentCustomer);
    return foundCustomer !== undefined ? true : false;
  }

  addNewCustomer(name) {
    let id = this.customers.length + 1;
    let newCustomer = new Customer(id, name, this.bookings, this.roomServices);
    this.currentCustomer = newCustomer;
    this.customers.push(newCustomer);
    DOMupdates.displayCurrCustName(this.currentCustomer);
  }

  addNewBooking(date, roomNumber) {
    let newBooking = new Bookings(this.currentCustomer.id, date, roomNumber);
    this.bookings.push(newBooking);
  }

  addNewRoomService(date, food, cost) {
    let service1 = new RoomServices(this.currentCustomer.id, date, food, cost);
    this.roomServices.push(service1);
  }

  calculateOccupancy(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date);
    DOMupdates.displayOccupancy(bookedRooms.length / this.rooms.length);
    return bookedRooms.length / this.rooms.length;
  }

  calculateRevenue(date) {
    let roomNums = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let bookingsRevenue = roomNums.reduce((acc, roomNum) => {
      acc += this.rooms.find(room => room.number === roomNum).costPerNight;
      return acc;
    }, 0);
    let ordersForDate = this.roomServices.filter(order => order.date === date);
    let roomServiceRevenue = ordersForDate.reduce((acc, roomService) => {
      acc += roomService.totalCost;
      return acc;
    }, 0);

    return +(bookingsRevenue + roomServiceRevenue).toFixed(2)
  }

  listAvailableRooms(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    return this.rooms.filter((room) => {
      if ((bookedRooms.indexOf(room.number) < 0)) {
        return room;
      }
    }).sort((a, b) => a.number - b.number)
  }

  filterTodayAvailableRooms(availableRooms, roomType) {
    return availableRooms.filter(room => room.roomType === roomType);
  }

  findTodayRoomServices() {
    let todayRoomServices = this.roomServices.filter(order => order.date === this.searchDate);
    return todayRoomServices;
  }

  findRoomServicesGivenDate(date) {
    let roomServices = this.roomServices.filter(order => order.date === date);
    return roomServices;
  }

  findTodayBookings() {
    let todayBookings = this.bookings.filter(booking => booking.date === this.searchDate);
    return todayBookings;
  }

  findPopularBookingDate() {
    let bookedDates = this.bookings.reduce((acc, booking) => {
      !acc[booking.date] ? acc[booking.date] = 1 : acc[booking.date]++;
      return acc;
    }, {});
    return Object.keys(bookedDates).find(date => bookedDates[date] === Math.max(...Object.values(bookedDates)));
  }

  findUnpopularBookingDate() {
    let bookedDates = this.bookings.reduce((acc, booking) => {
      !acc[booking.date] ? acc[booking.date] = 1 : acc[booking.date]++;
      return acc;
    }, {});
    let lowCount = Object.values(bookedDates).sort((a, b) => b - a).pop();
    return Object.keys(bookedDates).filter(date => bookedDates[date] === Math.min(...Object.values(bookedDates)));
  }

  makeMenu() {
    return this.roomServices.reduce((acc, order) => {
      !acc.includes({ food: order.food, price: order.totalCost }) ?
      acc.push({food: order.food, price: order.totalCost}) : false;
      return acc;
    }, []).sort((a, b) => a.price - b.price);
  }
}

export default Hotel;