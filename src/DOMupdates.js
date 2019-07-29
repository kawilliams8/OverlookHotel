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
    let listName = $(`<h5>${customer.name}:</h5>`);
    let listDetails = $(`<h6> &#8226; User ID: ${id}, Room:${room}</h6>`)
    $('.today-customers').append(listName, listDetails)
  },

  showTodayNoCustomers() {
    let noItems = $(`<li>No customers found.</li>`);
    $('.today-customers').append(noItems);
  },

  showCustomerNotFound(name) {
    $('.customer-search-message').text(`"${name}" was not found in the database.`);
  },

  showCustomerAddedMessage(name) {
    $('.customer-search-message').text(`"${name}" has been added to the database.`);
  },

  clearCustomerNotFoundMessage() {
    $('.customer-search-message').text('');
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
    let listRooms = $(`<h5>Room Number: ${number}, Type: ${type.toUpperCase()}</h5>`);
    let listRoomDetails = $(`<h6> &#8226; Cost: $${cost.toFixed(2)}, Bed: ${bedsize.toUpperCase()}, Quantity: ${bednum}, Bidet: ${bidet}</h6>`);
    $('.today-bookings').append(listRooms, listRoomDetails);
  },

  showNoTodayRooms() {
    let noItems = $(`<li>No rooms booked.</li>`);
    $('.today-bookings').append(noItems);
  },

  showAvailableRoomsGivenDay(number, type, cost, bedSize, bedNum, bidet) {
    let listRooms = $(`<button class='book-room-button' id='${number}'>Book</button> <h5>Room: ${number}, Type: ${type.toUpperCase()}, Cost: $${cost.toFixed(2)}</h5>`);
    let listRoomDetails = $(`<h6> &#8226; Bed: ${bedSize.toUpperCase()}, Quantity: ${bedNum}, Bidet: ${bidet}</h6>`);
    $('.given-day-rooms').append(listRooms, listRoomDetails);
  },

  showNoAvailabilityGivenDay(date) {
    let noRooms = $(`<li>No rooms available for ${date}.</li>`);
    $('.rooms-div').append(noRooms);
  },

  showCurrCustBookingHistoryTitle(name) {
    let listTitle = $(`<h4 class="header-name">${name}: </h4>`);
    $('aside.booking.right').append(listTitle);
  },

  showCurrCustBookingHistoryList(date, room) {
    let listItems = $(`<h6 class='right'> &#8226; ${date}, Room number: ${room} </h6>`);
    $('aside.booking.right').append(listItems);
  },

  showCurrCustBookingHistoryNone() {
    let noItems = $(`<li class="no-booking-history-message">No bookings found.</li>`);
    $('aside.booking.right').append(noItems);
  },

  //Room Service methods

  showTodayOrders(customer, food, cost) {
    let listName = $(`<h5>${customer.name}:</h5>`);
    let listOrder = $(`<h6> &#8226; ${food}, $${cost}</h6>`);
    $('.today-orders').append(listName, listOrder)
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
  },

  showCurrCustRoomServiceHistoryTitle(name) {
    let listTitle = $(`<h4 class="header-name">${name}: </h4>`);
    $('aside.room-service.right').append(listTitle);
  },

  showCurrCustRoomServiceHistoryList(date, food, cost) {
    let listItems = $(`<h6 class='right'> &#8226; ${date}, ${food}, $${cost.toFixed(2)} </h6>`);
    $('aside.room-service.right').append(listItems);
  },

  showCurrCustRoomServiceHistoryNone() {
    let noItems = $(`<li class="no-room-services-history-message">No bookings found.</li>`);
    $('aside.room-service.right').append(noItems);
  },

  showMenu(food, cost) {
    let listFoods = $(`<button class='place-order-button' data-food='${food}' data-cost='${cost}'>Order</button> <h5>${food}, $${cost}</h5><br>`);
    $('.place-order-list').append(listFoods);
  },

};

export default DOMupdates;