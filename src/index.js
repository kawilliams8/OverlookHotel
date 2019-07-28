import $ from 'jquery';
import './css/base.scss';

// import all images
import './images/spinner.gif';
import './images/Overlook_background.png';
import './images/typewriter.png';

import Hotel from '../src/Hotel';
import DOMupdates from './DOMupdates';

let hotel, bookings, rooms, roomServices, users;

let usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
let roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
let bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
let roomServicesData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices'); 

Promise.all([usersData, roomsData, bookingsData, roomServicesData])
  .then(values => Promise.all(values.map(value => value.json())))
  .then(finalData => {
    users = finalData[0];
    rooms = finalData[1];
    bookings = finalData[2];
    roomServices = finalData[3];
  });

setTimeout(() => {
  hotel = new Hotel(users.users, rooms.rooms, bookings.bookings, roomServices.roomServices);
  hotel.getTodayDate();
}, 400);

$(document).ready(() => {
  $('main, footer').hide();
})

$('.splash-button').on('click', () => {
  $('main, footer').delay(600).fadeIn(600);
  $('.splash-div').fadeOut(600);
  hotel.calculateOccupancy(hotel.searchDate);
  hotel.listAvailableRooms(hotel.searchDate);
  hotel.calculateRevenue(hotel.searchDate)
  hotel.findAllTodayCustomers(hotel.searchDate);
  hotel.findTodayRoomServices(hotel.searchDate);
  hotel.findTodayBookings(hotel.searchDate);
  hotel.findPopularBookingDate();
  hotel.findUnpopularBookingDate();
});

$('ul.tabs li').click(function () {
  var tab_id = $(this).attr('data-tab');
  $('ul.tabs li').removeClass('current');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $("#" + tab_id).addClass('current');
});

$('.customer-search-button').on('click', function (e) {
  e.preventDefault();
  hotel.searchCustomer = $('.customer-search-input').val();
  hotel.searchForCustomer(hotel.searchCustomer);
  $('.customer-search-input').val('');
  DOMupdates.showCurrCustName(hotel.currentCustomer.name)
});