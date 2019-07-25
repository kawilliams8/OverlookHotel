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
  
  it('should be able to add a new customer, with an id and name, to the existing customers array', () => {
    expect(hotel.customers.length).to.equal(15);
    hotel.addNewCustomer('New Customer');
    expect(hotel.customers.length).to.equal(16);
    expect(hotel.customers[15].id).to.equal(16);
    expect(hotel.customers[15].name).to.equal('New Customer');
  });
});