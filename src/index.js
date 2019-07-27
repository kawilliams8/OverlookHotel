import $ from 'jquery';
import './css/base.scss';

// import all images
import './images/spinner.gif';
import './images/Overlook_background.png';

import Hotel from '../src/Hotel';

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
  $('main, footer').delay(600).fadeIn(300);
  $('.splash-div').fadeOut(300);
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
