let countries = [];

async function loadCountries() {
  let container = document.getElementById("countryList");
  container.innerHTML = "Loading countries...";

  try {
    let response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
    let data = await response.json();

    countries = data;

    // bubble sort
    for (let i = 0; i < countries.length; i++) {
      for (let j = i + 1; j < countries.length; j++) {
        if (countries[i].name.common > countries[j].name.common) {
          let temp = countries[i];
          countries[i] = countries[j];
          countries[j] = temp;
        }
      }
    }

    displayCountries(countries);

  } catch (error) {
    container.innerHTML = "Could not load countries. Reload and try again";
  }
}

function displayCountries(list) {
  let container = document.getElementById("countryList");
  container.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    let country = list[i];

    container.innerHTML +=
      `<a href='details.html?country=${country.name.common}' style='text-decoration:none; color:white;'>
        <div class='country-card'>
          <img src='${country.flags.png}'>
          <p>${country.name.common}</p>
        </div>
      </a>`;
  }
}

function searchCountry() {
  let input = document.getElementById("searchInput").value.toLowerCase();

  let filtered = [];

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.common.toLowerCase().includes(input)) {
      filtered.push(countries[i]);
    }
  }

  displayCountries(filtered);
}