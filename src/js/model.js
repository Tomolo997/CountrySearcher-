export const getAllTheCountries = async function () {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const data = await res.json();
  return data;
};
