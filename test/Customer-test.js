import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

import sampleUsers from '../data/sampleUsers';
import sampleBookings from '../data/sampleBookings';
import sampleRooms from '../data/sampleRooms';
import sampleRoomServices from '../data/sampleRoomServices';

import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
import DOMupdates from '../src/DOMupdates';

chai.spy.on(DOMupdates, [], () => true)

describe('Customer', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(sampleUsers, sampleRooms, sampleBookings, sampleRoomServices);
    hotel.addNewCustomer('Jane Smith');
  });

  it('should be a function which instantiates an instance of Customer', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should update the current customer, whenever a new customer is created', () => {
    hotel.addNewCustomer('Jane Smith');
    expect(hotel.currentCustomer.name).to.equal('Jane Smith');
  });

  it('should be able to make room bookings for the new/current customer', () => {
    expect(hotel.bookings.length).to.equal(100);
    hotel.addNewBooking("2019/10/22", 1);
    expect(hotel.bookings.length).to.equal(101);
    expect(hotel.bookings[100].userID).to.equal(16);
  });

  it('should be able to make room service orders for the new/current customer', () => {
    expect(hotel.roomServices.length).to.equal(50);
    hotel.addNewRoomService("2019/10/22", 'meatball sub', 12.50);
    expect(hotel.roomServices.length).to.equal(51);
    expect(hotel.roomServices[50].userID).to.equal(16);
  })

  it('should find all of the current customer\'s bookings', () => {
    expect(hotel.currentCustomer.customerBookings).to.deep.equal([]);
    hotel.addNewBooking("2019/10/22", 1);
    hotel.addNewBooking("2019/10/23", 1);
    hotel.addNewBooking("2019/10/24", 1);
    hotel.currentCustomer.findCurrentCustomerBookings(hotel.currentCustomer);
    expect(hotel.currentCustomer.customerBookings.length).to.deep.equal(3);
    expect(hotel.currentCustomer.customerBookings[1].roomNumber).to.equal(1);
  });

  it('should find all of the current customer\'s room services', () => {
    expect(hotel.currentCustomer.customerRoomServices).to.deep.equal([]);
    hotel.addNewRoomService("2019/10/22", 'meatball sub', 12.50);
    hotel.addNewRoomService("2019/10/23", 'turkey sandwich', 12.50);
    hotel.addNewRoomService("2019/10/24", 'Handcrafted Cotton Sandwich', 12.50);
    hotel.currentCustomer.findCurrentCustomerRoomServices(hotel.currentCustomer);
    expect(hotel.currentCustomer.customerRoomServices.length).to.deep.equal(3);
    expect(hotel.currentCustomer.customerRoomServices[1].food).to.equal('turkey sandwich');
  });
});