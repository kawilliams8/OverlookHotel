import $ from 'jquery';
import './css/base.scss';

// import all images
import './images/spinner.gif';
import './images/Overlook_background.png';
import './images/typewriter.png';
import './images/redrum.png';

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
}, 600);

$(document).ready(() => {
  $('main, footer').hide();
})

$('.splash-button').on('click', () => {
  $('main, footer').delay(500).fadeIn(500);
  $('.splash-div').fadeOut(300);
  hotel.calculateOccupancy(hotel.searchDate);
  hotel.countAvailableRooms(hotel.searchDate);
  hotel.calculateRevenue(hotel.searchDate)
  hotel.findAllTodayCustomers(hotel.searchDate);
  hotel.findTodayRoomServices(hotel.searchDate);
  hotel.findTodayBookings(hotel.searchDate);
  hotel.findPopularBookingDate();
  hotel.findUnpopularBookingDate();
  
  const revenueChart = new Chart($('#revenue-chart'), {
    type: 'bar',
    data: {
      labels: ['Room Service', 'Bookings'],
      datasets: [{
        label: 'Today\'s Revenue',
        data: [hotel.calculateRoomServicesRevenue(hotel.searchDate).toFixed(2), hotel.calculateBookingsRevenue(hotel.searchDate).toFixed(2)],
        backgroundColor: [
          'rgba(223, 95, 24, .9)',
          'rgba(223, 95, 24, .9)',

        ]
      }]
    },
    options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Roboto'",
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const occupancyChart = new Chart($('#occupancy-chart'), {
    type: 'pie',
    data: {
      labels: ['Available Rooms', 'Booked Rooms'],
      datasets: [{
        label: 'Today\'s Occupancy',
        data: [hotel.countAvailableRooms(hotel.searchDate).length, hotel.countBookedRooms(hotel.searchDate).length],
        backgroundColor: [
          'rgba(152, 31, 36, .9)',
          'rgba(223, 95, 24, .9)',

        ]
      }]
    },
    options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Roboto'",
      responsive: false,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
});

$('ul.tabs li').click(function () {
  var tab_id = $(this).attr('data-tab');
  $('ul.tabs li').removeClass('current');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $("#" + tab_id).addClass('current');
});

//Customer event listeners

$('.customer-search-button').on('click', function (e) {
  e.preventDefault();
  hotel.searchCustomer = $('.customer-search-input').val();
  $('.customer-search-input').val('');
  hotel.searchForCustomer(hotel.searchCustomer);
  DOMupdates.showCurrCustName(hotel.currentCustomer.name);
  hotel.currentCustomer.findRevCurrCustRoomServicesGivenDay(hotel.searchDate);
  hotel.currentCustomer.findRevCurrCustRoomServiceForever();
  hotel.currentCustomer.addCurrCustBookingsBill();
  hotel.currentCustomer.addCurrCustTotalBill()
});

$('.customer-add-button').on('click', function(e) {
  e.preventDefault();
  hotel.searchCustomer = $('.customer-search-input').val();
  $('.customer-search-input').val('');
  hotel.addNewCustomer(hotel.searchCustomer);
  DOMupdates.showCurrCustName(hotel.currentCustomer.name);
  DOMupdates.showCustomerAddedMessage(hotel.currentCustomer.name);
  DOMupdates.showCurrCustBookingHistoryNone();
  DOMupdates.showCurrCustRoomServiceHistoryNone();
});

$('.customer-reset-button').on('click', function() {
  $('.customer-search-input').val('');
  $('.customer-search-message').text('')
  hotel.currentCustomer = {};
  $('.header-name, h6.right').text('');
  $('.bill').text('--')
});

$('.customer-search-input').on('keydown', function() {
  DOMupdates.clearCustomerNotFoundMessage();
});

//Room Services event listeners

$('.order-search-button').on('click', function (e) {
  e.preventDefault();
  hotel.searchDate = $('.order-search-input').val();
  hotel.findRoomServicesGivenDate(hotel.searchDate);
  $('.order-search-input').val('');
});

$('.order-clear-button').on('click', function (e) {
  e.preventDefault();
  $('.given-day-orders').html('');
});

$('.place-order-search-button').on('click', function (e) {
  e.preventDefault();
  hotel.searchDate = $('.place-order-search-input').val();
  hotel.makeMenu();
  $('.place-order-search-input').val('');
});

$('.place-order-clear-button').on('click', function (e) {
  e.preventDefault();
  $('.place-order-list').html('');
});

$('.place-order-list').on('click', '.place-order-button', function (e) {
  e.preventDefault();
  $('aside.room-service.right h6').html('');
  $('.no-room-services-history-message').fadeOut(1000).remove();
  hotel.addNewRoomService(hotel.searchDate, this.dataset.food, this.dataset.cost); 
});

//Bookings event listeners

$('.room-type-search').on('change', function () {
  let type = $('.room-type-search option:selected').val();
  hotel.searchRoomType = type.toUpperCase();
});

$('.room-search-button').on('click', function (e) {
  e.preventDefault();
  hotel.searchDate = $('.room-search-input').val();
  hotel.listAvailableRoomsGivenDay(hotel.searchDate);
  $('.room-search-input').val('');
});

$('.room-clear-button').on('click', function (e) {
  e.preventDefault();
  $('.given-day-rooms').html('');
});

$('.given-day-rooms').on('click', '.book-room-button', function(e) {
  e.preventDefault();
  $('aside.booking.right h6').html('');
  $('.no-booking-history-message').fadeOut(1000).remove();
  hotel.addNewBooking(hotel.searchDate, parseInt(this.id));
  $(this).fadeOut(1000);
  $(this).nextAll().slice(0, 2).fadeOut(1000);
});

