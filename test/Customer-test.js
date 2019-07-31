import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

import mockUsers from '../data/sampleUsers';
import mockBookings from '../data/sampleBookings';
import mockRooms from '../data/sampleRooms';
import mockRoomServices from '../data/sampleRoomServices';

import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
import DOMupdates from '../src/DOMupdates';

chai.spy.on(DOMupdates, [], () => true);

describe('Customer', () => {

  let customer, hotel;
  beforeEach(() => {
    hotel = new Hotel(mockUsers, mockRooms, mockBookings, mockRoomServices);
    hotel.getTodayDate();
    customer = hotel.addNewCustomer('Jane Smith');
  });

  it('should be a function which instantiates an instance of Customer', () => {
    expect(Hotel).to.be.a('function');
    expect(Customer).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it('should update the current customer, whenever a new customer is created', () => {
    hotel.addNewCustomer('Jane Smith');
    expect(customer.name).to.equal('Jane Smith');
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
    expect(customer.customerBookings).to.deep.equal([]);
    hotel.addNewBooking("2019/10/22", 1);
    hotel.addNewBooking("2019/10/23", 1);
    hotel.addNewBooking("2019/10/24", 1);
    expect(customer.customerBookings.length).to.deep.equal(3);
    expect(customer.customerBookings[1].roomNumber).to.equal(1);
  });

  it('should determine if the current customer has a booking today', () => {
    expect(customer.customerBookings).to.deep.equal([]);
    hotel.addNewBooking("2019/10/22", 1);
    hotel.addNewBooking("2019/10/23", 1);
    hotel.addNewBooking("2019/10/24", 1);
    expect(customer.customerBookings.length).to.deep.equal(3);
    let bookedToday = customer.findCurrCustBookingsToday(hotel.searchDate);
    expect(bookedToday).to.equal(false);
  });

  it('should find all of the current customer\'s room services', () => {
    expect(customer.customerRoomServices).to.deep.equal([]);
    hotel.addNewRoomService("2019/10/22", 'meatball sub', 12.50);
    hotel.addNewRoomService("2019/10/23", 'turkey sandwich', 12.50);
    hotel.addNewRoomService("2019/10/24", 'Handcrafted Cotton Sandwich', 12.50);
    expect(customer.customerRoomServices.length).to.deep.equal(3);
    expect(customer.customerRoomServices[1].food).to.equal('turkey sandwich');
  });

  it('should calculate the current customer\'s total room service bill for a given date', () => {
    hotel.addNewRoomService("2019/10/22", 'meatball sub', 12);
    hotel.addNewRoomService("2019/10/22", 'turkey sandwich', 13);
    hotel.addNewRoomService("2019/10/23", 'Handcrafted Cotton Sandwich', 14);
    let bill = customer.findRevCurrCustRoomServicesGivenDay('2019/10/22');
    expect(bill).to.equal(25);
  });

  it('should calculate the current customer\'s total room service bill for all days', () => {
    hotel.addNewRoomService("2019/10/22", 'meatball sub', 12);
    hotel.addNewRoomService("2019/10/22", 'turkey sandwich', 13);
    hotel.addNewRoomService("2019/10/23", 'Handcrafted Cotton Sandwich', 14);
    let bill = customer.findRevCurrCustRoomServiceForever();
    expect(bill).to.equal(39);
  });

  it('should add up the current customer\'s bookings bill for all days', () => {
    hotel.addNewBooking("2019/10/22", 1);
    hotel.addNewBooking("2019/10/23", 1);
    hotel.addNewBooking("2019/10/24", 1);
    let bill = customer.addCurrCustBookingsBill();
    expect(bill).to.equal(795.09);
  });

  it('should add up the current customer\'s total bookings/room service bill', () => {
    hotel.addNewRoomService("2019/10/22", 'meatball sub', 12);
    hotel.addNewRoomService("2019/10/22", 'turkey sandwich', 13);
    hotel.addNewRoomService("2019/10/23", 'Handcrafted Cotton Sandwich', 14);
    hotel.addNewBooking("2019/10/22", 1);
    hotel.addNewBooking("2019/10/23", 1);
    hotel.addNewBooking("2019/10/24", 1);
    let bill = customer.addCurrCustTotalBill();
    expect(bill).to.equal(834.09);
  });

});