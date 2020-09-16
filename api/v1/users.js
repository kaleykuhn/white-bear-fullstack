// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const insertUser = require("../../queries/insertUser");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");

// @route       GET api/v1/users
// @desc        Get a valid user via email and password
// @access      Public

router.get("/", (req, res) => {
   db.query(selectUser("kaley@gmail.com", "replace_me"))
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

// @route       POST api/v1/users
// @desc        POST create a new user
// @access      Public
router.post("/", async (req, res) => {
   const user = {
      id: req.body.id,
      email: req.body.email,
      password: await toHash(req.body.password),
      created_at: req.body.createdAt,
   };

   db.query(insertUser, user)
      .then((dbRes) => {
         console.log(dbRes);
         // return the user data so we can put in the redux store
      })
      .catch((err) => {
         console.log(err);
         // return a 400 error to user
      });
});

module.exports = router;
