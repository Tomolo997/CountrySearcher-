class Countries {
  _data;

  generatemarkup(country, data) {
    console.log(data);
    const html = data
      .map((el) => {
        return `<div class="countries__card">
        <div class="countries__card--image"><img src="${el.flag}" class='countries__card--img'></img>
        </div>
        <div class="countries__card--desciption">
            <h1 class="name">${el.name}</h1>
            <ul class="description__list">
                <li class="description__item">Population:<span class="description__data"> ${el.population}</span></li>
                <li class="description__item">Region<span class="description__data">${el.region}</span></li>
                <li class="description__item">Capital<span class="description__data">${el.capital}</span></li>
            </ul>
        </div>
    </div>`;
      })
      .join();

    country.insertAdjacentHTML("afterbegin", html);
  }
}

export default new Countries();
