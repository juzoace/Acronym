const router = require('express').Router();
const {
    findMultiple,
    addSingle,
    modifySingle,
    deleteSingle
    
  } = require("./acronymController");


  // GET --> /acronym?from=50&limit=10&search=:search
  router.get("/acronym?", (req, res, next) => next(), findMultiple);

  // POST --> /acronym
  router.post("/acronym", (req, res, next) => next(), addSingle)

  // PUT --> /acronym/:acronym
  router.put("/acronym/:acronym", (req, res, next) => next(), modifySingle);

  // DELETE --> /acronym/:acronym
  router.delete("/acronym/:acronym", (req, res, next) => next(), deleteSingle);

  // ALL other routes return 404 by default
  router.get("*", (req, res) => {
    res.sendStatus(404);
  });

module.exports = router;