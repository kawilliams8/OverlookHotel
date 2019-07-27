import DOMupdates from './DOMupdates';
import Hotel from './Hotel';

class Customer {
  constructor(id, name, allBookings, allRoomServices) {
    this.id = id;
    this.name = name;
    this.allBookings = allBookings || [];
    this.allRoomServices = allRoomServices || [];
    this.customerBookings = [];
    this.customerRoomServices = [];
  }
  
  findCurrentCustomerBookings(currentCustomer) {
    this.customerBookings = this.allBookings.filter(booking => booking.userID === currentCustomer.id);
  }
  
  findCurrentCustomerRoomServices(currentCustomer) {
    this.customerRoomServices = this.allRoomServices.filter(order => order.userID === currentCustomer.id);
  }

  findCurrentCustomerRevenue() {
    //breakdown of dates and dollar amounts for room service
    //{dates: [], dollars: []}
  }
}

export default Customer;