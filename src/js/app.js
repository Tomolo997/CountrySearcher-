const { async } = require("q");

import "regenerator-runtime/runtime";
import Countries from "./Views/ShowCountries.js";
import * as model from "./model.js";
const showAll = document.querySelector(".countries__all");
const countries = document.querySelector(".countries");
const regions = document.querySelector(".button__region");
const selectDiv = document.querySelector("#select__continent");
const controlCountries = async function () {
  const countries = document.querySelector(".countries");
  const container = document.querySelector(".container");
  const data = await model.getAllTheCountries();
  const results = model.state.countries.result;
  const pages = await model.getCountriesPages(model.state.countries.page);

  Countries.generatePageButton(countries, results);
  const buttonNext = document.querySelector(".button__next");
  const buttonPrevious = document.querySelector(".button__previous");
  let currentPage = 1;
  buttonNext.addEventListener("click", async function () {
    currentPage++;

    console.log(currentPage);
    console.log(results);
    if (currentPage >= results.length / 8) {
      console.log("lastpage");
      currentPage = 1;
    }
    countries.textContent = "";
    const nextPage = await model.getCountriesPages(currentPage);
    Countries.generatemarkup(countries, nextPage);
  });
  buttonPrevious.addEventListener("click", async function () {
    currentPage--;
    countries.textContent = "";
    if (currentPage <= 0) {
      console.log("lastpage");
      currentPage = 1;
    }
    console.log(currentPage);
    const prevPage = await model.getCountriesPages(currentPage);

    Countries.generatemarkup(countries, prevPage);
  });
  Countries.generatemarkup(countries, pages);
  data = "";
};

showAll.addEventListener("click", function () {
  if (countries.innerHTML !== "") {
    controlCountries();
    countries.textContent = "";
    const buttonNext = document.querySelector(".button__next");
    const buttonPrevious = document.querySelector(".button__previous");
    if (buttonNext && buttonPrevious) {
      buttonPrevious.style.display = "none";
      buttonNext.style.display = "none";
    }
  }
});

const controlRegions = async function () {
  const countries = document.querySelector(".countries");
  const container = document.querySelector(".container");
  const data = await model.getCountriesFromRegion(`${selectDiv.value}`);
  console.log(data);
  const results = model.state.regions.result;
  const pages = await model.getCountriesPagesRegions(model.state.regions.page);

  Countries.generatePageButton(countries, results);
  const buttonNext = document.querySelector(".button__next");
  const buttonPrevious = document.querySelector(".button__previous");
  let currentPage = 1;
  buttonNext.addEventListener("click", async function () {
    currentPage++;

    console.log(currentPage);
    console.log(results);
    if (currentPage >= results.length / 8) {
      console.log("lastpage");
      currentPage = 1;
    }
    countries.textContent = "";
    const nextPage = await model.getCountriesPagesRegions(currentPage);
    Countries.generatemarkup(countries, nextPage);
  });
  buttonPrevious.addEventListener("click", async function () {
    currentPage--;
    countries.textContent = "";
    if (currentPage <= 0) {
      console.log("lastpage");
      currentPage = 1;
    }
    console.log(currentPage);
    const prevPage = await model.getCountriesPagesRegions(currentPage);

    Countries.generatemarkup(countries, prevPage);
  });
  Countries.generatemarkup(countries, pages);
  data = "";
};
regions.addEventListener("click", function () {
  if (countries.innerHTML !== "") {
    countries.textContent = "";
    controlRegions();
    const buttonNext = document.querySelector(".button__next");
    const buttonPrevious = document.querySelector(".button__previous");
    if (buttonNext && buttonPrevious) {
      buttonPrevious.style.display = "none";
      buttonNext.style.display = "none";
    }
  }
});
const input = document.querySelector(".input");
const name = document.querySelector(".btn__search");
const controlRegionsByName = async function () {
  try {
    const countries = document.querySelector(".countries");
    const container = document.querySelector(".container");
    const data = await model.getCountriesFromName(`${input.value}`);
    console.log(data);
    const results = model.state.name.result;
    const pages = await model.getCountriesPagesName(model.state.name.page);

    Countries.generatePageButton(countries, results);
    const buttonNext = document.querySelector(".button__next");
    const buttonPrevious = document.querySelector(".button__previous");
    let currentPage = 1;
    buttonNext.addEventListener("click", async function () {
      currentPage++;

      console.log(currentPage);
      console.log(results);
      if (currentPage >= results.length / 8) {
        console.log("lastpage");
        currentPage = 1;
      }
      countries.textContent = "";
      const nextPage = await model.getCountriesPagesName(currentPage);
      Countries.generatemarkup(countries, nextPage);
    });
    buttonPrevious.addEventListener("click", async function () {
      currentPage--;
      countries.textContent = "";
      if (currentPage <= 0) {
        console.log("lastpage");
        currentPage = 1;
      }
      console.log(currentPage);
      const prevPage = await model.getCountriesPagesName(currentPage);

      Countries.generatemarkup(countries, prevPage);
    });
    Countries.generatemarkup(countries, pages);
    data = "";
  } catch (error) {
    Countries.renderError(countries);
    model.state.name.result = [];
  }
};
name.addEventListener("click", function () {
  if (countries.innerHTML !== "") {
    countries.textContent = "";
    controlRegionsByName();

    const buttonNext = document.querySelector(".button__next");
    const buttonPrevious = document.querySelector(".button__previous");
    if (buttonNext && buttonPrevious) {
      buttonPrevious.style.display = "none";
      buttonNext.style.display = "none";
    }
  }
});
