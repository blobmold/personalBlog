class GenerateTable {
  constructor(table, data, header) {
    this.table = table;
    this.data = data;
    this.header = header;
  }

  async generateTableHead(table, currencies) {
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

  async generateTable(table, data) {
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

  async generate() {
    // Unfortunately generateTable has to be run first to display thead and tbody property.
    // Promise.all() could be used to run both functions at the same time to increase the performance
    await this.generateTable(this.table, this.data);
    await this.generateTableHead(this.table, this.header);
  }
}

async function searchCode(table, search) {
  search.addEventListener("input", (e) => {
    for (let i = 1; i < table.rows.length; i++) {
      let currentRow = table.rows[i];
      let codeEl = table.rows[i].cells[0];
      let codeTxt = codeEl.textContent;
      let input = e.target.value.toUpperCase();
      // Check if the input is present in the first column (code)
      codeTxt.indexOf(input) > -1 ? (currentRow.hidden = false) : (currentRow.hidden = true);
    }
  });
}

async function stripColumns(table, columns) {
  let indexes = [];
  let tableHeaders = Array.from(table.tHead.firstChild.children);

  for (let header of tableHeaders) {
    for (let column of columns) {
      if (header.textContent == column) {
        let index = tableHeaders.indexOf(header);
        indexes.push(index);
      }
    }
  }

  let rows = table.rows;
  for (let row of rows) {
    for (let index of indexes) {
      let remove = row.children[index];
      remove.hidden = true;
    }
  }
}

async function setAnchor(table) {
  let tbody = table.tBodies[0];
  for(let row of tbody.children) {
    let a = document.createElement('a');
    a.href = location.pathname + "/" + row.firstChild.textContent;
    a.textContent = row.firstChild.textContent
    row.firstChild.textContent = ''
    row.firstChild.append(a)
  }
}

async function getNbgAPI() {
  let nbgResponse = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
  let nbgJson = await nbgResponse.json();
  let dateOjb = nbgJson[0].date;
  let date = new Date(dateOjb).toLocaleDateString();
  let currencies = nbgJson[0].currencies;
  let currencyHeader = Object.keys(currencies[0]);

  // Create date element and assign text content
  let dateEl = document.createElement("div");
  dateEl.className = "forex-date";
  dateEl.textContent = "Date: " + date;

  //Create a table element
  let tableEl = document.getElementById("forex-table");
  tableEl.before(dateEl);

  // Pupulate table element with data
  let generateTable = new GenerateTable(tableEl, currencies, currencyHeader);
  await generateTable.generate();

  let searchEl = document.getElementById("search");
  let uselessColumns = ["rateFormated", "diffFormated", "date", "validFromDate"];

  // Remove useless columns, apply code searching functionality and anchors
  await Promise.all([stripColumns(tableEl, uselessColumns), searchCode(tableEl, searchEl), setAnchor(tableEl)]);
}

getNbgAPI();