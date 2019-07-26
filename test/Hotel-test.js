import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

import sampleUsers from '../data/sampleUsers';
import sampleBookings from '../data/sampleBookings';
import sampleRooms from '../data/sampleRooms';
import sampleRoomServices from '../data/sampleRoomServices';

import Hotel from '../src/Hotel';
import DOMupdates from '../src/DOMupdates';

chai.spy.on(DOMupdates, ['showToday'], () => true)

describe('Hotel', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(sampleUsers, sampleRooms, sampleBookings, sampleRoomServices);
  });

  it('should be a function which instantiates an instance of Hotel', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
  
  it('should know the current date as a MM/DD/YYYY format', () => {
    hotel.getTodayDate();
    expect(hotel.today).to.be.a('string');
  });
  
  it('should add a new customer, with an id and name, to the existing customers', () => {
    expect(hotel.customers.length).to.equal(15);
    hotel.addNewCustomer('New Customer');
    expect(hotel.customers.length).to.equal(16);
    expect(hotel.customers[15].id).to.equal(16);
    expect(hotel.customers[15].name).to.equal('New Customer');
  });

  it('should add a new booking, with an id, date, and room number, to the existing bookings', () => {
    expect(hotel.bookings.length).to.equal(50);
    hotel.addNewBooking(2, "2019/09/24", 30);
    expect(hotel.bookings.length).to.equal(51);
    expect(hotel.bookings[50].userID).to.equal(2);
    expect(hotel.bookings[50].roomNumber).to.equal(30);
  });

  it('should add a new room service order, with an id, date, food, and cost, to the existing room service orders', () => {
    expect(hotel.roomServices.length).to.equal(50);
    hotel.addNewRoomService(10, "2019/09/24", 'toast', 150.00);
    expect(hotel.roomServices.length).to.equal(51);
    expect(hotel.roomServices[50].food).to.equal('toast');
    expect(hotel.roomServices[50].totalCost).to.equal(150.00);
  });

  it('should calculate a given date\'s occupancy percentage', () => {
    let occupancy = hotel.calculateOccupancy('2019/10/17');
    expect(occupancy).to.equal(.16);
  });

  it('should calculate a day\'s total revenue from bookings and room service orders', () => {
    let revenue = hotel.calculateRevenue('2019/10/17');
    // 916.81 from rooms
    //12.32 from room services
    //929.13 total on 2019/10/17
    expect(revenue).to.equal(929.13);
  })
});