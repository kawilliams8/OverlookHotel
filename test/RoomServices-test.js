import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';
import RoomServices from '../src/RoomServices';

describe('Room Services', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel();
  });

  it('should be a function which instantiates an instance of Room Services', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
});