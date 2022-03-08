import Forex from "../models/Forex.js";
import schedule from "node-schedule";
import fetch from "node-fetch";

function updateCurrencyDatabase() {
  schedule.scheduleJob("0 12 * * *", async function () {
    let nbgResponse = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
    let data = await nbgResponse.json();
    let date = data[0].date;

    Forex.findOne({ date }, (err, obj) => {
      if (!obj) Forex.create(data[0]);
    });
  });
}

export default updateCurrencyDatabase;
