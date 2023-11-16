// You get the data from here: https://www.losungen.de/digital/daten
// NOTE: You first have to convert the csv file to utf-8 encoding
//  e.g. with Notepad++: Open the file and go to Encoding -> Convert to UTF-8

const Papa = require("papaparse");

// Function that loads the csv file in the same folder depending on current year
// the csv file is formatted with tab seperators
function loadCSVFile(csvUrl) {
  const currentYear = new Date().getFullYear();
  const url = `${csvUrl}/Losungen${currentYear}.csv`;

  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      return new Promise((resolve, reject) => {
        Papa.parse(data, {
          delimiter: "\t",
          encoding: "utf-8",
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      });
    });
}

function getTodayString() {
  const today = new Date();
  return `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
}

// function that gets the parsed losung rows and returns todays losung
// a row is formatted as follows: [dd.mm.yyyy, wochentag, istSonntag, Losungsvers, Losungstext, Lehrtextvers, Lehrtext]
function getTodaysLosung(rows) {
  const todayString = getTodayString();

  const todaysLosung = rows.find((row) => row[0] === todayString);

  return todaysLosung;
}

// function that returns a html string with the losung
function getLosungHTML(losung) {
  const [date, weekday, isSunday, losungsvers, losungstext] = losung;
  const losungHTML = `
        <div class="losung">
            <h5 class="losungshead">Tageslosung vom ${date}</h5>
            <p class="losungstext">${losungstext}</p>
            <p class="losungsvers">${losungsvers}</p>
        </div>
    `;
  return losungHTML;
}

// call all the functions to get the losung and display it
async function showLosung(csvUrl) {
  const rows = await loadCSVFile(csvUrl);
  const todaysLosung = getTodaysLosung(rows);
  const losungHTML = getLosungHTML(todaysLosung);
  document.getElementById("losung").innerHTML = losungHTML;
}

// to expose it globally so we can access it from the html file
if (typeof window !== "undefined") {
  window.showLosung = showLosung;
}

module.exports = {
  getTodayString,
  loadCSVFile,
  getTodaysLosung,
  getLosungHTML,
  showLosung,
};
