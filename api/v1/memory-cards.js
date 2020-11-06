// The memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");
const insertMemoryCard = require("../../queries/insertMemoryCard");
const validateJwt = require("../../utils/validateJwt");

// @route       GET api/v1/memory-cards
// @desc        Get all memory cards for a user by search term and order
// @access      Private

router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const { searchTerm, order } = req.query;
   const userId = req.user.id;
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
      { toSqlString: () => order },
   ])
      .then((memoryCards) => {
         const camelCaseMemoryCards = memoryCards.map((memoryCard) => {
            return {
               id: memoryCard.id,
               imagery: memoryCard.imagery,
               answer: memoryCard.answer,
               userId: memoryCard.user_id,
               createdAt: memoryCard.created_at,
               nextAttemptAt: memoryCard.next_attempt_at,
               lastAttemptAt: memoryCard.last_attempt_at,
               totalSuccessfullAttempts: memoryCard.total_successful_attempts,
               level: memoryCard.level,
            };
         });
         res.json(camelCaseMemoryCards);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});
// @route       POST api/v1/memory-cards
// @desc        Post a memory card to the memory cards resource
// @access      Private
router.post("/", validateJwt, (req, res) => {
   const user = req.user;
   // console.log(user);
   const {
      id,
      imagery,
      answer,
      createdAt,
      nextAttemptAt,
      lastAttemptAt,
      totalSuccessfulAttempts,
      level,
   } = req.body;
   const memoryCard = {
      //id: req.body.id,
      id,
      imagery,
      answer,
      user_id: user.id,
      created_at: createdAt,
      next_attempt_at: nextAttemptAt,
      last_attempt_at: lastAttemptAt,
      total_successful_attempts: totalSuccessfulAttempts,
      level,
   };
   console.log(memoryCard);
   db.query(insertMemoryCard, memoryCard)
      .then((dbRes) => {
         //success
         console.log("Created memory card in the db", dbRes);
         //return with a status response
         return res.status(200).json({ success: "card created" });
      })
      .catch((err) => {
         //error
         console.log(err);
         // return with an error status response
         console.log(err);
         dbError = `${err.code} ${err.sqlMessage}`;
         res.status(400).json({ dbError });
      });
});

module.exports = router;
