import Forex from "../models/Forex.js";
import schedule from "node-schedule";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateCurrencyDatabase() {
  schedule.scheduleJob("0 */9 * * *", async function () {
    let nbgResponse = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
    let data = await nbgResponse.json();
    let date = data[0].date;

    let obj = await Forex.findOne({ date });
    // If object does not exist then create a document
    if (!obj) {
      await Forex.create(data[0]);
    }

    const logDir = path.join(__dirname, "logs");

    try {
      await fs.promises.mkdir(logDir);
    } catch (e) {
      console.log(`called ${e.syscall}; path ${e.path} already exists`);
    }

    const reportPath = path.join(logDir, "currencyReport.txt");

    await fs.promises.appendFile(reportPath, `${new Date(Date.now()).toUTCString()}: Success. Data is now for ${new Date(date).toUTCString()} \n`);
  });
}

export default updateCurrencyDatabase;
