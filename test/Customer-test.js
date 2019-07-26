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

  it('should be able to make room bookings for a new, current customer', () => {
    expect(hotel.bookings.length).to.equal(100);
    hotel.addNewBooking("2019/10/22", 1);
    expect(hotel.bookings.length).to.equal(101);
  });

  it('should be able to make room service orders for the new customer', () => {
    expect(hotel.roomServices.length).to.equal(50);
    hotel.addNewRoomService()
    expect(hotel.roomServices.length).to.equal(51);
  })

  it.skip('should find the current customer\'s bookings', () => {
    console.log(hotel.currentCustomer.customerBookings)
    // console.log('currentcust bookings', hotel.currentCustomer.findCurrentCustomerBookings());
  });

  it.skip('should find the current customer\'s room services', () => {
    // console.log('current cust RS', hotel.currentCustomer.findCurrentCustomerRoomServices());
  });
});