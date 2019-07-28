import $ from 'jquery';

const DOMupdates = {

  showToday(date) {
    $('.header-today').text(date);
  },

  displayCurrCustName(name) {
    $('.header-name').text(name);
  }, 

  displayTodayAvailability(number) {
    $('.today-availability').text(number);
  },

  displayOccupancy(percent) {
    $('.today-occupancy').text(percent);
  },

  displayRevenue(bookings, roomServices, total) {
    $('.today-bookings-sales').text(bookings);
    $('.today-room-services').text(roomServices);
    $('.today-total-sales').text(total);
  }

};

export default DOMupdates;