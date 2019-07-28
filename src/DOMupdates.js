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

  showTodayCustomers(customer, id, room) {
    let listItem = $(`<li>${customer.name}, User ID: ${id}, Room:${room}</li>`)
    $('.today-customers').append(listItem)
  },

  showTodayNoCustomers() {
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

  showAllTodayRooms(number, type, cost, bedsize, bednum, bidet) {
    let listRooms = $(`<p>Room Number: ${number}, Type: ${type.toUpperCase()}</p>`);
    let listRoomDetails = $(`<h6>Cost: $${cost.toFixed(2)}, Bed: ${bedsize.toUpperCase()}, Quantity: ${bednum}, Bidet: ${bidet}</h6>`);
    $('.today-bookings').append(listRooms, listRoomDetails);
  },

  showNoTodayRooms() {
    let noItems = $(`<li>No rooms booked.</li>`);
    $('.today-bookings').append(noItems);
  },

  showAvailableRoomsGivenDay(number, type, cost, bedSize, bedNum, bidet) {
    let listRooms = $(`<h6>Room: ${number}, Type: ${type.toUpperCase()}, Cost: $${cost.toFixed(2)}</h6>`);
    let listRoomDetails = $(`<h6>Bed: ${bedSize.toUpperCase()}, Quantity: ${bedNum}, Bidet: ${bidet}</h6>`);
    $('.given-day-rooms').append(listRooms, listRoomDetails);
  },

  showNoAvailabilityGivenDay(date) {
    let noRooms = $(`<li>No rooms available for ${date}.</li>`);
    $('.rooms-div').append(noRooms);
  },

  //Room Service methods

  showTodayOrders(customer, food, cost) {
    let listItems = $(`<li>${customer.name}, ${food}, $${cost}</li>`);
    $('.today-orders').append(listItems)
  },

  showTodayNoOrders() {
    let noItems = $(`<li>No orders found.</li>`);
    $('.today-orders').append(noItems);
  },

  showAllGivenDayOrdersTitle(date) {
    let listTitle = $(`<h4>Orders for ${date}:</h4>`);
    $('.given-day-orders').append(listTitle)
  },

  showAllGivenDayOrders(customer, food, cost) {
    let listItems = $(`<li>${customer.name}, ${food}, $${cost.toFixed(2)}</li>`);
    $('.given-day-orders').append(listItems)
  },

  showNoGivenDayOrders(date) {
    let noItems = $(`<li>No orders found for ${date}.</li>`);
    $('.given-day-orders').append(noItems);
  }


};

export default DOMupdates;