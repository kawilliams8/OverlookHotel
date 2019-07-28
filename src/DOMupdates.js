import $ from 'jquery';

const DOMupdates = {

  showToday(date) {
    $('.header-today').text(date);
  },

  showRevenue(bookings, roomServices, total) {
    $('.today-bookings-sales').text(bookings);
    $('.today-room-services').text(roomServices);
    $('.today-total-sales').text(total);
  },

  //Customer methods

  showCurrCustName(name) {
    $('.header-name').text(name);
  }, 

  displayTodayCustomers(customer, id, room) {
    let listItem = $(`<li>${customer.name}, User ID: ${id}, Room:${room}</li>`)
    $('.today-customers').append(listItem)
  },

  displayTodayNoCustomers() {
    let noItems = $(`<li>No customers found.</li>`);
    $('.today-customers').append(noItems);
  },

  //Booking methods

  showTodayAvail(number) {
    $('.today-availability').text(number);
  },

  showOccupancy(percent) {
    $('.today-occupancy').text(percent);
  },

  showHighOccupancy(date, count) {
    $('.room-high-occupancy').text(date);
    $('.room-high-count').text(count);
  },

  showLowOccupancy(date, count) {
    $('.room-low-occupancy').text(date);
    $('.room-low-count').text(count);
  },

  displayAllTodayRooms(number, type, cost, bedsize, bednum, bidet) {
    let listRooms = $(`<p>Room Number: ${number}, Type: ${type.toUpperCase()}</p>`);
    let listRoomDetails = $(`<h6>Cost: $${cost.toFixed(2)}, Bed: ${bedsize.toUpperCase()}, Quantity: ${bednum}, Bidet: ${bidet}</h6>`);
    $('.today-bookings').append(listRooms, listRoomDetails);
  },

  displayNoTodayRooms() {
    let noItems = $(`<li>No rooms booked.</li>`);
    $('.today-bookings').append(noItems);
  },

  //Room Service methods

  displayTodayOrders(customer, food, cost) {
    let listItems = $(`<li>${customer.name}, ${food}, $${cost}</li>`);
    $('.today-orders').append(listItems)
  },

  displayTodayNoOrders() {
    let noItems = $(`<li>No orders found.</li>`);
    $('.today-orders').append(noItems);
  }


};

export default DOMupdates;