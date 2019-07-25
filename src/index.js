import $ from 'jquery';
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/spinner.gif';

import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
import Bookings from '../src/Bookings';

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
  hotel = new Hotel(users, rooms, bookings, roomServices);
}, 400);

setTimeout(() => {
  hotel.addToCustomers(150, 'Katie1');
  hotel.addToCustomers(151, 'Katie2');
  hotel.addToCustomers(152, 'Katie3');
  hotel.addToCustomers(153, 'Katie4');
  hotel.addToCustomers(154, 'Katie5');
  hotel.addToBookings(150, "2019/08/28", 13);
  hotel.addToBookings(151, "2019/08/28", 14);
  hotel.addToBookings(152, "2019/08/28", 15);
  hotel.addToBookings(153, "2019/08/28", 16);
  hotel.addToRoomServices(150, "2019/08/28", 'toast', 12.50);
  hotel.addToRoomServices(151, "2019/08/28", 'toast', 12.50);
  hotel.addToRoomServices(152, "2019/08/28", 'toast', 12.50);
  hotel.addToRoomServices(153, "2019/08/28", 'toast', 12.50);
  console.log(hotel.customers.find(customer => customer.id === 3))
  console.log(hotel.customers.find(customer => customer.id === 153))
  console.log(hotel.roomServices.filter(service => service.totalCost > 12))
}, 1000);

$(document).ready(() => {
  $('main').hide();
})

$('.splash-button').on('click', () => {
  $('main').delay(250).fadeIn(250);
  $('.splash-div').fadeOut(250);
})

$(() =>  {
  if ($(".tabs_container .tabs").length > 0) {
    var active_tab = $(".tab_content .tabs li:first-child").data("tab");
    $("#" + active_tab).show();
    $(".tab_content .tabs li:first-child").addClass("active");

    $(".tab_content .tabs li").click(function (e) {
      var active_tab = $(this).data("tab");
      $(".tab_content .text").hide();
      $("#" + active_tab).show();
      $(".tab_content .tabs li").removeClass("active");
      $(this).addClass("active");
    });
  }
});
