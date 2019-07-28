import $ from 'jquery';

const DOMupdates = {

  showToday(date) {
    $('.header-today').text(date);
  },

  displayCurrCustName(name) {
    $('.header-name').text(name);
  }

};

export default DOMupdates;