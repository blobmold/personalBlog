import Forex from "../models/Forex.js";

export default async (req, res) => {
  let data = await Forex.find({});
  let map = new Map();
  for(let obj of data) {
    // Key is a formatted date yyyy-mm-dd
    let key = obj.date.getFullYear() + "-" + obj.date.getMonth() + "-" + obj.date.getDate();
    let value;
    let pageName = req.params.currency;
    for(let currency of obj.currencies) {
      if(currency.code == pageName) value = currency.rate
    }

    map.set(key, value)
  }
  let dates = Array.from(map.keys());
  let rates = Array.from(map.values());
  res.render("forexCode", {
    currency: req.params.currency,
    dates: dates,
    rates: rates,
  });
};
