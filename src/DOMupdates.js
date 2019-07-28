import $ from 'jquery';

const DOMupdates = {

  showToday(date) {
    $('.header-today').text(date);
  },

  displayCurrCustName(name) {
    $('.header-name').text(name);
  }, 

  displayTodayAvailability() {
    $('.today-availability').text();
  },

  displayOccupancy(percent) {
    $('.today-occupancy').text(percent);
  }

};

export default DOMupdates;