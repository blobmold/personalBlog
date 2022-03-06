fetch('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json')
.then(response => response.json())
.then(obj => obj[0].date);

let data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['ea3724'],
      borderColor: ['ea3724'],
      borderWidth: 1,
    },
  ],
}

let options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const ctx = document.getElementById("currHistCanv").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options
});