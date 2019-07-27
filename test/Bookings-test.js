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

chai.spy.on(DOMupdates, [], () => true)

describe('Bookings', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(mockUsers, mockRooms, mockBookings, mockRoomServices);
  });

  it('should be a function which instantiates an instance of Bookings', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
});