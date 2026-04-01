console.log(document.location.href)
let url = document.location.href;
let countryName = "";

let parts = url.split("?");

if (parts.length > 1) {
  let query = parts[1];
  let pair = query.split("=");
  countryName = pair[1];
}

loadDetails(countryName);

async function loadDetails(name) {
  let loading = document.getElementById("loading");

  try {
    let res = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,region,subregion,currencies,languages,cca2`
    );

    let data = await res.json();
    let country = data[0];

    let currency = "N/A";
    if (country.currencies) {
      for (let key in country.currencies) {
        currency = country.currencies[key].name;
        break;
      }
    }

    let languages = "N/A";
    if (country.languages) {
      languages = "";
      for (let key in country.languages) {
        if (languages !== "") {
          languages += ", ";
        }
        languages += country.languages[key];
      }
    }

    let capital = "N/A";
    if (country.capital && country.capital.length > 0) {
      capital = country.capital[0];
    }

    document.getElementById("countryInfo").innerHTML = `
      <h1>${country.name.common}</h1>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Region:</b> ${country.region}</p>
      <p><b>Subregion:</b> ${country.subregion || "N/A"}</p>
      <p><b>Currency:</b> ${currency}</p>
      <p><b>Languages:</b> ${languages}</p>
    `;

    document.getElementById("flagImg").src = country.flags.png;

    let code = country.cca2;

    let gdpRes = await fetch(
      `https://api.worldbank.org/v2/country/${code}/indicator/NY.GDP.MKTP.CD?format=json&per_page=5`
    );

    let gdpData = await gdpRes.json();
    let list = gdpData[1];

    let html = `<h3>Economy (GDP)</h3>`;

    if (list && list.length > 0) {
      let latest = undefined;

      for (let i = 0; i < list.length; i++) {
        if (list[i].value !== undefined && list[i].value !== null) {
          latest = list[i];
          break;
        }
      }

      if (latest) {
        html += `
          <p><b>Year:</b> ${latest.date}</p>
          <p><b>GDP:</b> $${latest.value}</p>
        `;
      } else {
        html += `<p>No recent GDP data</p>`;
      }
    } else {
      html += `<p>No GDP data available</p>`;
    }

    document.getElementById("economyData").innerHTML = html;

    let bookRes = await fetch(
      `https://openlibrary.org/search.json?q=${name}`
    );

    let bookData = await bookRes.json();

    let bookTitle = "No book found";
    if (bookData.docs && bookData.docs.length > 0) {
      if (bookData.docs[0].title) {
        bookTitle = bookData.docs[0].title;
      }
    }

    document.getElementById("bookData").innerHTML = `
      <h3>Culture</h3>
      <p>${bookTitle}</p>
    `;

    document.getElementById("qrCode").src =
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Living in ${name}`;

  } catch (error) {
    alert("Something went wrong");
  }

  loading.style.display = "none";
}