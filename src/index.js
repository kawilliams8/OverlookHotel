import $ from 'jquery';
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

import Hotel from '../src/Hotel';

let hotel, bookings, rooms, roomServices, users;
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
.then(response => response.json())
.then(dataset => bookings = dataset.bookings)
.catch(error => console.log(error))

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
.then(response => response.json())
.then(dataset => roomServices = dataset.roomServices)
.catch(error => console.log(error))

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
.then(response => response.json())
.then(dataset => users = dataset.users)
.catch(error => console.log(error));

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
.then(response => response.json())
.then(dataset => rooms = dataset.rooms)
.catch(error => console.log(error))

setTimeout(() => {
  hotel = new Hotel(users, rooms, bookings, roomServices);
  console.log('in fetch', hotel)
}, 2000);


$(document).ready(() => {
  //page load functions here
});

// $('.start').on('click', () => {
//   hotel = new Hotel(users, rooms, bookings, roomServices);
//   console.log(hotel)
//   $('.splash').hide();
// })
