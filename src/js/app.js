const { async } = require("q");

import "regenerator-runtime/runtime";
import Countries from "./Views/ShowCountries.js";
import * as model from "./model.js";
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
    const nextPage = await model.getCountriesPages(currentPage);
    console.log(currentPage);
    console.log(results);
    if (currentPage >= results.length / 8) {
      console.log("lastpage");
      currentPage = 1;
    }
    countries.textContent = "";
    Countries.generatemarkup(countries, nextPage);
  });
  buttonPrevious.addEventListener("click", async function () {
    currentPage--;
    const prevPage = await model.getCountriesPages(currentPage);
    countries.textContent = "";
    if (currentPage <= 1) {
      console.log("lastpage");
      currentPage = 2;
    }
    console.log(currentPage);
    Countries.generatemarkup(countries, prevPage);
  });
  Countries.generatemarkup(countries, pages);
};

const controlPages = function () {};

window.addEventListener("load", controlCountries);
