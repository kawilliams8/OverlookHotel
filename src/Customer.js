import DOMupdates from './DOMupdates';

class Customer {
  constructor(id, name, allBookings, allRoomServices) {
    this.id = id;
    this.name = name;
    this.allBookings = allBookings || [];
    this.allRoomServices = allRoomServices || [];
    this.customerBookings = [];
    this.customerRoomServices = [];
  }
  
  findCurrentCustomerBookings() {
    this.customerBookings = this.allBookings.filter(booking => booking.userID === this.id);
    // console.log('in customer findBookings', this.customerBookings)
  }
  
  findCurrentCustomerRoomServices() {
    this.customerRoomServices = this.allRoomServices.filter(order => order.userID === this.id);
    // console.log('in customer findRoomServices', this.customerRoomServices)
  }
}

export default Customer;