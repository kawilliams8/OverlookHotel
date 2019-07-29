import DOMupdates from './DOMupdates';
import Hotel from './Hotel';

class Customer {
  constructor(id, name, allBookings, allRoomServices, allRooms) {
    this.id = id;
    this.name = name;
    this.allBookings = allBookings || [];
    this.allRoomServices = allRoomServices || [];
    this.allRooms = allRooms || [];
    this.customerBookings = [];
    this.customerRoomServices = [];
  }
  
  findCurrCustBookings(currentCustomer) {
    this.customerBookings = this.allBookings.filter(booking => booking.userID === currentCustomer.id);
  }

  findCurrCustBookingsToday(today) {
    return this.customerBookings.some(booking => booking.date === today) ? true : false;
  }
  
  findCurrCustRoomServices(currentCustomer) {
    this.customerRoomServices = this.allRoomServices.filter(order => order.userID === currentCustomer.id);
  }

  findRevCurrCustRoomServicesGivenDay(date) {
    this.findCurrCustRoomServices(this);
    let roomServices = this.customerRoomServices.filter(order => order.date === date);
    let roomServicesBill = 0;
    if (roomServices.length > 0) {
      roomServicesBill = roomServices.reduce((acc, order) => {
        acc += order.totalCost;
        return acc;
      }, 0);
    }
    DOMupdates.showCustomerBill1(roomServicesBill);
    return roomServicesBill;
  }

  findRevCurrCustRoomServiceForever() {
    this.findCurrCustRoomServices(this);
    let roomServiceBill = 0;
    if (this.customerRoomServices.length > 0) {
      roomServiceBill = this.customerRoomServices.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0);
  }
  DOMupdates.showCustomerBill2(roomServiceBill)
  return roomServiceBill;
  }

  addCurrCustBookingsBill() {
    this.findCurrCustBookings(this);
    let bookingsBill = 0;
    if (this.customerBookings.length > 0) {
      bookingsBill = this.customerBookings.reduce((acc, booking) => {
        console.log(booking.roomNumber, this.allRooms);
      acc += this.allRooms.find(room => room.number === booking.roomNumber).costPerNight;
      return acc;
    }, 0);
    DOMupdates.showCustomerBill3(bookingsBill);
    }
    return bookingsBill;
  }

  addCurrCustTotalBill() {
    this.findCurrCustBookings(this);
    this.findCurrCustRoomServices(this);
    let roomServiceBill = this.customerRoomServices.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0);
    let bookingsBill = 1;
    DOMupdates.showCustomerBill4(bookingsBill + roomServicesBill);
    return (bookingsBill + roomServiceBill);
  }

}

export default Customer;