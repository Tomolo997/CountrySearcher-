const { async } = require("q");

import "regenerator-runtime/runtime";
import Countries from "./Views/ShowCountries.js";
import * as model from "./model.js";
const controlCountries = async function () {
  const countries = document.querySelector(".countries");
  const data = await model.getAllTheCountries();
  Countries.generatemarkup(countries, data);
};

window.addEventListener("load", controlCountries);
