class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.searchButton = document.getElementById("search-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.filterForm = document.getElementById("filter-form")
    this.filter = {
      year: 2018
    }
  }


  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    this.filterForm.onsubmit = this.handleFormSubmit
    // this.searchButton.onclick = this.run;
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target
    this.filter = {
      rentalDate: form.date.value,
      capacity: form.capacity.value
    }
    await this.run()
  }

  run = async () => {
    this.clear()

    await this.load(this.filterer);

    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.className = "car-card";
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load(filterer) {
    const cars = await Binar.listCars(filterer);
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };

  filterer = (car) => {
    if (this.filter.rentalDate && convertToUserDateFormat(car.availableAt) <= this.filter.rentalDate) {
      return false;
    }
    if (this.filter.capacity && car.capacity !== parseInt(this.filter.capacity)) {
      return false;
    }
    return true;
  }
}

function convertToUserDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}/${year}`;
}