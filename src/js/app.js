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
};

showAll.addEventListener("click", function () {
  if (countries.innerHTML !== "") {
    controlCountries();
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
};
regions.addEventListener("click", function () {
  if (countries.innerHTML !== "") {
    countries.textContent = "";
    controlRegions();
  }
});
