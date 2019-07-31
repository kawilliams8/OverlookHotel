import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

import mockUsers from '../data/sampleUsers';
import mockBookings from '../data/sampleBookings';
import mockRooms from '../data/sampleRooms';
import mockRoomServices from '../data/sampleRoomServices';

import Hotel from '../src/Hotel';
import DOMupdates from '../src/DOMupdates';

chai.spy.on(DOMupdates, 
  ['showToday', 'showCurrCustName', 'showOccupancy', 'showTodayAvail', 
    'showRevenue', 'showAllTodayRooms', 'showNoTodayRooms', 'showHighOccupancy', 
    'showLowOccupancy', 'showTodayNoOrders', 'showAllGivenDayOrdersTitle', 
    'showAllGivenDayOrders', 'showCustomerNotFound', 'showTodayOrders',
    'showCurrCustBookingHistoryTitle', 'showCurrCustBookingHistoryList', 
    'showCurrCustRoomServiceHistoryTitle', 'showCurrCustRoomServiceHistoryList', 
    'showCurrCustBookingHistoryNone', 'showNoTodayRoom', 'showMenu', 
    'showCustomerBill1', 'showCustomerBill2', 'showCustomerBill3', 
    'showCustomerBill4'], () => true)

describe('Hotel', () => {

  let customer, hotel;
  beforeEach(() => {
    hotel = new Hotel(mockUsers, mockRooms, mockBookings, mockRoomServices);
    hotel.getTodayDate();
    customer = hotel.addNewCustomer('Jane Smith');
  });

  it('should be a function which instantiates an instance of Hotel', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
  
  it('should know the current date as a MM/DD/YYYY format', () => {
    hotel.getTodayDate();
    expect(hotel.today).to.be.a('string');
  });

  it('should search for an existing customer in the database', () => {
    let found = hotel.searchForCustomer('Chadrick Lowe');
    expect(found).to.equal(true);
    expect(hotel.currentCustomer.name).to.equal('Chadrick Lowe');
    expect(hotel.currentCustomer.id).to.equal(2);
    expect(hotel.currentCustomer.customerBookings.length).to.equal(1);
    expect(hotel.currentCustomer.customerRoomServices.length).to.equal(5);
  })
  
  it('should add a new customer, with an id and name, to the existing customers', () => {
    expect(hotel.customers.length).to.equal(16);
    hotel.addNewCustomer('Jane Smith');
    expect(hotel.customers.length).to.equal(17);
    expect(hotel.customers[15].id).to.equal(16);
    expect(hotel.customers[15].name).to.equal('Jane Smith');
  });

  it('should add a new booking, for the current customer, to the existing bookings', () => {
    hotel.currentCustomer = { id: 7, name: "Josianne Huels" }
    expect(hotel.bookings.length).to.equal(100);
    hotel.addNewBooking("2019/09/24", 30);
    expect(hotel.bookings.length).to.equal(101);
    expect(hotel.bookings[100].userID).to.equal(7);
    expect(hotel.bookings[100].roomNumber).to.equal(30);
  });

  it('should add a new room service order, for the current customer, to the existing orders', () => {
    hotel.currentCustomer = { id: 12, name: "Leland Roberts" }
    expect(hotel.roomServices.length).to.equal(50);
    hotel.addNewRoomService("2019/09/24", 'peanut butter and jelly sandwich', 150.00);
    expect(hotel.roomServices.length).to.equal(51);
    expect(hotel.roomServices[50].userID).to.equal(12);
    expect(hotel.roomServices[50].food).to.equal('peanut butter and jelly sandwich');
    expect(hotel.roomServices[50].totalCost).to.equal(150.00);
  });

  it('should calculate a given date\'s occupancy percentage', () => {
    let occupancy = hotel.calculateOccupancy('2019/10/17');
    expect(occupancy).to.equal(.14);
  });

  it('should calculate a day\'s total revenue from bookings and room service orders', () => {
    let revenue = hotel.calculateRevenue('2019/10/17');
    expect(revenue).to.equal(1777.88);
  });

  it('should create a list of the available rooms for a given date', () => {
    let availableRooms = hotel.countAvailableRooms('2019/10/17');
    expect(availableRooms.length).to.equal(43);
  });

  it('should be able to filter today\'s available rooms by type', () => {
    let availableRooms = hotel.countAvailableRooms('2019/07/26');
    expect(availableRooms.length).to.equal(46);
    let filteredRooms = hotel.filterTodayAvailableRooms(availableRooms, 'junior suite');
    expect(filteredRooms.length).to.equal(12);
  })

  it('should create a list of all today\'s room service orders', () => {
    let todayRoomServices = hotel.findTodayRoomServices();
    expect(todayRoomServices.length).to.be.a('number');
  });

  it('should create a list of all room service orders for a given date', () => {
    let roomServices = hotel.findRoomServicesGivenDate("2019/09/25");
    expect(roomServices.length).to.equal(1);
    expect(roomServices[0].totalCost).to.equal(11.15);
  });

  it('should create a list of all today\'s room bookings', () => {
    let todayBookings = hotel.findTodayBookings();
    expect(todayBookings.length).to.be.a('number');
  });

  it('should find the most popular booking date', () => {
    let popularDate = hotel.findPopularBookingDate();
    expect(popularDate).to.equal('2019/10/17');
  });

  it('should find the least popular booking date / most availability', () => {
    let unpopularDate = hotel.findUnpopularBookingDate();
    expect(unpopularDate).to.be.an('array');
  });

  it('should make a menu to make room service orders', () => {
    let menu = hotel.makeMenu();
    expect(menu.length).to.equal(50);
  })
})