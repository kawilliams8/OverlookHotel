import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import Bookings from '../src/Bookings';

describe('Bookings', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel();
  });

  it('should be a function which instantiates an instance of Bookings', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
});