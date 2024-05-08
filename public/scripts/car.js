function numberWithThousands(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="car-img">
        <img src="${this.image}" alt="${this.manufacture}" width="64px">
      </div>
      <div class="car-text">
        <div>
          <p><b>${this.type} ${this.model}</b></p>
          <p><b>RP ${numberWithThousands(this.rentPerDay)} / Hari</b></p>
          <p class="car-desc">${this.description}</p>
          <p>${this.capacity} Orang</p>
          <p>${this.transmission}</p>
          <p>Tahun ${this.year}</p>
        </div>
        <div class="d-flex flex-column justify-content-end">
          <button type="button" class="btn btn--primary search-select fw-light" id="search-btn">Pilih Mobil</button>
        </div>
      </div>
    `;
  }
}
