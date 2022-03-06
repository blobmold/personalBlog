async function getNbgAPI() {
  let nbgResponse = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
  let nbgJson = await nbgResponse.json();
  let date = nbgJson[0].date;
  let currencies = nbgJson[0].currencies;
  let currencyHeader = Object.keys(currencies[0]);
  console.log(currencyHeader)

  let dateEl = document.createElement("div");
  let tableEl = document.getElementById("forex-table");
  dateEl.className = "forex-date";
  tableEl.before(dateEl);

  dateEl.textContent = "Date: " + new Date(date);
  await generateTable(tableEl, currencies);
  await generateTableHead(tableEl, currencyHeader);
}

async function generateTableHead(table, currencies) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let currency of currencies) {
    let th = document.createElement("th");
    th.style.textTransform = "capitalize";
    let text = (document.textContent = currency);
    th.append(text);
    row.append(th);
  }
}

async function generateTable(table, data) {
  for (let el of data) {
    let row = table.insertRow();
    for (let key in el) {
      let cell = row.insertCell();
      let text;
      key == "date" || key == "validFromDate" ? (text = document.textContent = new Date(el[key])) : (text = document.textContent = el[key]);
      cell.append(text);
    }
  }
}

getNbgAPI().then(() => {
  let tableEl = document.getElementById("forex-table");
  let searchEl = document.getElementById("search");
  searchEl.addEventListener("input", (e) => {
    for (let i = 1; i < tableEl.rows.length; i++) {
      let currentRow = tableEl.rows[i];
      let codeEl = tableEl.rows[i].cells[0];
      let codeTxt = codeEl.textContent;
      let input = e.target.value.toUpperCase();
      // Check if the input is present in the first column
      codeTxt.indexOf(input) > -1 ? (currentRow.hidden = false) : (currentRow.hidden = true);
    }
  });
});
