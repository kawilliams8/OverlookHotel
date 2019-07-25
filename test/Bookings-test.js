import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);

import sampleUsers from '../data/sampleUsers';
import sampleBookings from '../data/sampleBookings';
import sampleRooms from '../data/sampleRooms';
import sampleRoomServices from '../data/sampleRoomServices';

import Hotel from '../src/Hotel';
import Bookings from '../src/Bookings';
import DOMupdates from '../src/DOMupdates';

chai.spy.on(DOMupdates, [], () => true)

describe('Bookings', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(sampleUsers, sampleRooms, sampleBookings, sampleRoomServices);
  });

  it('should be a function which instantiates an instance of Bookings', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
});