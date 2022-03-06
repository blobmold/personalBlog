export default async (req, res) => {
  res.render("forexCode", {
    currency: req.params.currency,
  });
};
