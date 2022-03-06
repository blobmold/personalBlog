import fetch from "node-fetch";
import Forex from "../models/Forex.js";

export default async (req, res) => {
  let nbgResponse = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
  let data = await nbgResponse.json();
  let date = data[0].date;

  Forex.findOne({ date }, (err, obj) => {
    if (!obj) Forex.create(data[0]);
  });
  res.render("forex");
};
