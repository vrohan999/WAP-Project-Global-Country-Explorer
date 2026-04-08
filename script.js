let countries = [];

async function loadCountries() {
  let container = document.getElementById("countryList");
  container.innerHTML = "Loading countries...";

  try {
    let response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population");
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
  let input = document.getElementById("search").value.toLowerCase();
  let filtered = [];
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.common.toLowerCase().includes(input)) {
      filtered.push(countries[i]);
    }
  }
  displayCountries(filtered);
}

function filterRegion() {
  let r = document.getElementById("filter").value;
  let arr = [];
  if (r == "all") {
    displayCountries(countries);
    return;
  }
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].region == r) {
      arr.push(countries[i]);
    }
  }
  displayCountries(arr);
}

function random() {
  let i = Math.floor(Math.random() * countries.length);
  let c = countries[i];
  let list = document.getElementById("countryList");
  list.innerHTML =
    `<a href="details.html?country=${c.name.common}" style="text-decoration:none; color:white;">
      <div class="country-card">
        <img src="${c.flags.png}">
        <p>${c.name.common}</p>
      </div>
    </a>`;
}

// function sortNames() {
//   let type = document.getElementById("sort").value;
//   if (type == "az") {
//     for (let i = 0; i < countries.length; i++) {
//       for (let j = i + 1; j < countries.length; j++) {
//         if (countries[i].name.common > countries[j].name.common) {
//           let t = countries[i];
//           countries[i] = countries[j];
//           countries[j] = t;
//         }
//       }
//     }
//   }
//   if (type == "za") {
//     for (let i = 0; i < countries.length; i++) {
//       for (let j = i + 1; j < countries.length; j++) {
//         if (countries[i].name.common < countries[j].name.common) {
//           let t = countries[i];
//           countries[i] = countries[j];
//           countries[j] = t;
//         }
//       }
//     }
//   }
//   displayCountries(countries);
// }