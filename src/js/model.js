export const state = {
  countries: {
    result: [],
    page: 1,
    resultsPerPage: 8,
  },
  regions: {
    result: [],
    page: 1,
    resultsPerPage: 8,
  },
};

export const getAllTheCountries = async function () {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const data = await res.json();
  state.countries.result = data;
  return data;
};

export const getCountriesPages = async function (page) {
  state.countries.page = page;
  const start = (page - 1) * state.countries.resultsPerPage;
  const end = page * state.countries.resultsPerPage;
  return state.countries.result.slice(start, end);
};
export const getCountriesPagesRegions = async function (page) {
  state.countries.page = page;
  const start = (page - 1) * state.countries.resultsPerPage;
  const end = page * state.countries.resultsPerPage;
  return state.regions.result.slice(start, end);
};
export const getCountriesFromRegion = async function (region) {
  const res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
  const data = await res.json();
  state.regions.result = data;

  return data;
};
