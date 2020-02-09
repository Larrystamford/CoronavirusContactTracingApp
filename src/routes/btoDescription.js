var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');
  res.json([
    { id: 1, btoName: "Sembawang", shortDesc: "Non-Mature Estate" },
    { id: 2, btoName: "Toa Payoh", shortDesc: "Mature Estate" },
    { id: 3, btoName: "Choa Chu Kang", shortDesc: "Non-Mature Estate" },
    { id: 4, btoName: "Tengah", shortDesc: "Non-Mature Estate" },
    { id: 5, btoName: "Pasir Ris", shortDesc: "Mature Estate" },
    { id: 6, btoName: "Tampines", shortDesc: "Mature Estate" }
  ]);
  // res.render("users", { title: "Express" });
});

module.exports = router;
