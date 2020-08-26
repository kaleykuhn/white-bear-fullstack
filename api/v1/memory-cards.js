// The memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route       GET api/v1/memory-cards
// @desc        Get all memory cards for a user by search term and order
// @access      Public

router.get("/", (req, res) => {
   console.log(req.query);
   const { userId, searchTerm, order } = req.query;
   let constructedSearchTerm;
   if (searchTerm === "" || searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`;
   }
   // destructure object above
   //    const userId = req.query.userId;
   //    const searchTerm = req.query.searchTerm;

   /*https://www.npmjs.com/package/sqlstring#escaping-query-values for security purposes */
   db.query(selectAllCards, [
      userId,
      constructedSearchTerm,
      constructedSearchTerm,
      order,
   ])
      .then((dbRes) => {
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
