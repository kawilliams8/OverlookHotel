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
    this.searchCustomer = '';
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

  calculateRevenue(date) {
    let roomNums = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let bookingsRev = roomNums.reduce((acc, roomNum) => {
      acc += this.rooms.find(room => room.number === roomNum).costPerNight;
      return acc;
    }, 0);
    let ordersForDate = this.roomServices.filter(order => order.date === date);
    let roomServiceRev = ordersForDate.reduce((acc, roomService) => {
      acc += roomService.totalCost;
      return acc;
    }, 0);
    let total = +(bookingsRev + roomServiceRev).toFixed(2);
    DOMupdates.showRevenue(bookingsRev, roomServiceRev, total);
    return +(bookingsRev + roomServiceRev).toFixed(2)
  }

  //Customer methods

  searchForCustomer(name) {
    let foundCustomer = this.customers.find(customer => customer.name === name);
    if (foundCustomer !== undefined) {
      this.currentCustomer = foundCustomer;
      this.currentCustomer.findCurrCustBookings(this.currentCustomer);
      this.currentCustomer.findCurrCustRoomServices(this.currentCustomer);
      this.populateBookingHistory();
      this.populateRoomServiceHistory();
    } else {
      DOMupdates.showCustomerNotFound(name);
      this.populateBookingHistory();
      this.populateRoomServiceHistory();
    }
    return foundCustomer !== undefined ? true : false;
  }

  addNewCustomer(name) {
    let id = this.customers.length + 1;
    let newCustomer = new Customer(id, name, this.bookings, this.roomServices);
    this.currentCustomer = newCustomer;
    this.customers.push(newCustomer);
    DOMupdates.showCurrCustName(this.currentCustomer);
  }

  findAllTodayCustomers(date) {
    let todayBookings = this.bookings.filter(booking => booking.date === date);
    if (todayBookings.length > 0) {
      todayBookings.forEach(booking => {
        let customer = this.customers.find(customer => customer.id === booking.userID)
        let id = customer.id;
        let room = booking.roomNumber;
        DOMupdates.showTodayCustomers(customer, id, room);
      })
    } else {
      DOMupdates.showTodayNoCustomers();
    }
  }

  //Bookings methods

  addNewBooking(date, roomNumber) {
    let newBooking = new Bookings(this.currentCustomer.id, date, roomNumber);
    this.bookings.push(newBooking);
  }

  countAvailableRooms(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let availableRooms = this.rooms.filter((room) => {
      if ((bookedRooms.indexOf(room.number) < 0)) {
        return room;
      }
    }).sort((a, b) => a.number - b.number);
    DOMupdates.showTodayAvail(availableRooms.length);
    return availableRooms;
  }

  listAvailableRoomsGivenDay(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    let availableRooms = this.rooms.filter((room) => {
      if ((bookedRooms.indexOf(room.number) < 0)) {
        return room;
      }
    }).sort((a, b) => a.number - b.number);
    if (availableRooms.length > 0) {
      availableRooms.forEach(room => {
        let number = room.number;
        let type = room.roomType;
        let bidet = room.bidet;
        let bedSize = room.bedSize;
        let bedNum = room.numBeds;
        let cost = room.costPerNight;
        DOMupdates.showAvailableRoomsGivenDay(number, type, cost, bedSize, bedNum, bidet)
      })
    } else {
      DOMupdates.showNoAvailabilityGivenDay(date)
    }
    return availableRooms;
  }

  filterTodayAvailableRooms(availableRooms, roomType) {
    return availableRooms.filter(room => room.roomType === roomType);
  }

  calculateOccupancy(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date);
    DOMupdates.showOccupancy((bookedRooms.length / this.rooms.length) * 100);
    return bookedRooms.length / this.rooms.length;
  }

  findTodayBookings() {
    let todayBookings = this.bookings.filter(booking => booking.date === this.searchDate);
    if (todayBookings.length > 0) {
      todayBookings.forEach(booking => {
        let room = this.rooms.find(room => room.number === booking.roomNumber);
        let number = room.number;
        let type = room.roomType;
        let cost = room.costPerNight;
        let bedSize = room.bedSize;
        let bedNum = room.numBeds;
        let bidet = room.bidet;
        DOMupdates.showAllTodayRooms(number, type, cost, bedSize, bedNum, bidet);
      })
    } else {
      DOMupdates.showNoTodayRooms();
    }
    return todayBookings;
  }

  findPopularBookingDate() {
    let bookedDates = this.bookings.reduce((acc, booking) => {
      !acc[booking.date] ? acc[booking.date] = 1 : acc[booking.date]++;
      return acc;
    }, {});
    let highDates = Object.keys(bookedDates).filter(date => bookedDates[date] === Math.max(...Object.values(bookedDates)));
    let highCount = Object.values(bookedDates).sort((a, b) => b - a).shift();
    DOMupdates.showHighOccupancy(highDates, highCount);
    return Object.keys(bookedDates).find(date => bookedDates[date] === Math.max(...Object.values(bookedDates)));
  }

  findUnpopularBookingDate() {
    let bookedDates = this.bookings.reduce((acc, booking) => {
      !acc[booking.date] ? acc[booking.date] = 1 : acc[booking.date]++;
      return acc;
    }, {});
    let lowDate = Object.keys(bookedDates).filter(date => bookedDates[date] === Math.min(...Object.values(bookedDates)));
    let lowCount = Object.values(bookedDates).sort((a, b) => b - a).pop();
    DOMupdates.showLowOccupancy(lowDate, lowCount);
    return Object.keys(bookedDates).filter(date => bookedDates[date] === Math.min(...Object.values(bookedDates)));
  }

  populateBookingHistory() {
    if (this.currentCustomer.customerBookings.length > 0) {
      DOMupdates.showCurrCustBookingHistoryTitle(this.currentCustomer.name);
      this.currentCustomer.customerBookings.forEach(booking => {
        let date = booking.date;
        let roomNumber = booking.roomNumber;
        DOMupdates.showCurrCustBookingHistoryList(date, roomNumber);
      })
    } else {
      console.log('in book history else');
      DOMupdates.showCurrCustBookingHistoryNone();
    }
  }

  //Room Service methods

  addNewRoomService(date, food, cost) {
    let service1 = new RoomServices(this.currentCustomer.id, date, food, cost);
    this.roomServices.push(service1);
  }

  findTodayRoomServices() {
    let todayRoomServices = this.roomServices.filter(order => order.date === this.searchDate);
    if (todayRoomServices.length > 0) {
      todayRoomServices.forEach(order => {
        let customer = this.customers.find(customer => customer.id === order.userID);
        let food = order.food;
        let cost = order.totalCost;
        DOMupdates.showTodayOrders(customer, food, cost);
      });
    } else {
      DOMupdates.showTodayNoOrders();
    }
    return todayRoomServices;
  }

  findRoomServicesGivenDate(date) {
    let roomServices = this.roomServices.filter(order => order.date === date);
    if (roomServices.length > 0) {
      DOMupdates.showAllGivenDayOrdersTitle(date);
      roomServices.forEach(order => {
        let customer = this.customers.find(customer => customer.id === order.userID)
        let food = order.food;
        let cost = order.totalCost;
        DOMupdates.showAllGivenDayOrders(customer, food, cost, date);
      })
    } else {
      DOMupdates.showNoGivenDayOrders(date);
    }
    return roomServices;
  }

  makeMenu() {
    return this.roomServices.reduce((acc, order) => {
      !acc.includes({ food: order.food, price: order.totalCost }) ?
        acc.push({food: order.food, price: order.totalCost}) : false;
      return acc;
    }, []).sort((a, b) => a.price - b.price);
  }

  populateRoomServiceHistory() {
    if (this.currentCustomer.customerRoomServices.length > 0) {
      DOMupdates.showCurrCustRoomServiceHistoryTitle(this.currentCustomer.name);
      this.currentCustomer.customerRoomServices.forEach(order => {
        let date = order.date;
        let food = order.food;
        let cost = order.totalCost;
        DOMupdates.showCurrCustRoomServiceHistoryList(date, food, cost);
      })
    } else {
      console.log('in RS history else');
      DOMupdates.showCurrCustRoomServiceHistoryNone();
    }
  }
}

export default Hotel;