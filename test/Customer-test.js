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
  });

  it('should be a function which instantiates an instance of Customer', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
});