const dateElem = document.querySelector('input[name="datepicker"]')
const datepicker = new Datepicker(dateElem, {
  autohide: true,
  orientation: 'bottom auto',
  minDate: 'today'
})

console.log(dateElem);
