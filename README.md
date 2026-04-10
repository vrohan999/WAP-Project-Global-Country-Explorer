# Life Simulator – Global Country Explorer

An interactive web app for exploring countries and visualizing basic economic and cultural context. Browse all countries, search and filter by region, and open a detail view with GDP trends, a cultural reference, and a QR code.

## Features

- Browse all countries in a responsive grid
- Search countries by name
- Filter countries by region (Asia, Europe, Africa, Americas, Oceania)
- “Surprise Me” button to jump to a random country
- Country details page showing:
  - Flag
  - Capital
  - Population
  - Region and subregion
  - Main currency
  - Spoken languages
- Economy card:
  - Recent GDP data fetched from the World Bank API
  - Line chart rendered via QuickChart
- Culture card:
  - A related book title fetched from OpenLibrary
- QR card:
  - QR code generated for “Living in {country}”

## Tech Stack

- HTML
- CSS
- JavaScript (vanilla)
- Public REST APIs

## APIs Used

- REST Countries API  
  https://restcountries.com/

- World Bank API (GDP data)  
  https://api.worldbank.org/

- QuickChart (chart image generation)  
  https://quickchart.io/

- OpenLibrary (book search)  
  https://openlibrary.org/developers/api

- QR Code Generator API  
  https://api.qrserver.com/

## Project Structure

```text
Countries Explorer/
├── index.html       # Main country list + search/filter UI
├── details.html     # Country details dashboard
├── script.js        # List page logic (load, search, filter, random)
├── details.js       # Details page logic (APIs, chart, QR, culture)
├── style.css        # Styles for index.html
├── details.css      # Styles for details.html
└── README.md
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/vrohan999/WAP-Project-Global-Country-Explorer.git
   cd "Countries Explorer"
   ```

2. Option A – Open directly  
   Open `index.html` in your browser.

3. Option B – Run a simple local server (recommended):

   ```bash
   cd "/Users/rohanprathapreddy/Desktop/Projects/Countries Explorer"
   python3 -m http.server 8000
   ```

   Then visit http://localhost:8000/index.html in your browser.

## Notes

- All data is loaded client-side from public APIs; network errors or API limits may affect what is displayed.
- GDP data is not available for all countries; in that case the economy card will show that no data is available.