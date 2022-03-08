let statistics = document.getElementById('statistics');
let dates = JSON.parse(statistics.dataset.dates);
let rates = JSON.parse(statistics.dataset.rates);

let data = {
  labels: dates,
  datasets: [
    {
      label: "# Rate",
      data: rates,
      backgroundColor: ["ea3724"],
      borderColor: ["ea3724"],
      borderWidth: 1,
    },
  ],
};

let options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ctx = document.getElementById("currHistCanv").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});

fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json")
  .then((response) => response.json())
  .then((obj) => obj[0].date);
