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

  addNewCustomer(name) {
    let id = this.customers.length + 1;
    let newCustomer = new Customer(id, name, this.bookings, this.roomServices);
    this.currentCustomer = newCustomer;
    this.customers.push(newCustomer);
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

    return +(bookingsRevenue + roomServiceRevenue).toFixed(2)
  }

  listAvailableRooms(date) {
    let bookedRoomNumbers = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    return this.rooms.filter((room) => {
      if ((bookedRoomNumbers.indexOf(room.number) < 0)) {
        return room;
      }
    }).sort((a,b) => a.number - b.number)
  }

  findTodayRoomServices() {
    let todayRoomServices = this.roomServices.filter(order => order.date === this.searchDate);
    // if (todayOrders.length > 0) { 
    //   todayOrders.forEach(order => {
    //     let customer = this.userData.find(customer => customer.id === order.userID);
    //     let food = order.food;
    //     let cost = order.totalCost;
    //   })
    // } else {
    //   // DOMupdates.displayTodayNoOrders();
    // }
    return todayRoomServices;
  }

  findTodayBookings() {
    let todayBookings = this.bookings.filter(booking => booking.date === this.searchDate);
    return todayBookings;
  }

  findPopularBookingDate() {
    let bookedDates = this.bookings.reduce((acc, booking) => {
      if (acc.includes({date: [booking.date]})) {
        acc.push({date: booking.date, count: 1});
      } else {
        console.log('in else');
      }
      return acc;
    }, []).sort((a,b) => b.count - a.count);
    console.log('bookedDates :', bookedDates);

}
}

export default Hotel;