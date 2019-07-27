// import DOMupdates from './DOMupdates';

class Customer {
  constructor(id, name, allBookings, allRoomServices) {
    this.id = id;
    this.name = name;
    this.allBookings = allBookings || [];
    this.allRoomServices = allRoomServices || [];
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
    let roomServices = this.customerRoomServices.filter(order => order.date === date);
    return roomServices.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0);
  }

  findRevCurrCustRoomServiceForever() {
    return this.customerRoomServices.reduce((acc, order) => {
      acc += order.totalCost;
      return acc;
    }, 0);
  }

}

export default Customer;